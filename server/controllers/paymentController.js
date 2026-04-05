import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabaseAdmin } from '../config/supabase.js';

const creditTiers = {
  49: 100,
  99: 250,
  199: 600,
};

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// POST /api/payments/create-order
export async function createOrder(req, res) {
  try {
    const { amount_inr } = req.body;

    if (!creditTiers[amount_inr]) {
      return res.status(400).json({ error: 'Invalid amount. Choose ₹49, ₹99, or ₹199' });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amount_inr * 100, // paise
      currency: 'INR',
      receipt: `skillsync_${Date.now()}`,
      notes: {
        user_id: req.user.id,
        credits: creditTiers[amount_inr],
      },
    });

    // Save payment record
    await supabaseAdmin.from('payments').insert({
      user_id: req.user.id,
      razorpay_order_id: order.id,
      amount_inr,
      credits: creditTiers[amount_inr],
      status: 'pending',
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      credits: creditTiers[amount_inr],
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
}

// POST /api/payments/verify
export async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      await supabaseAdmin.from('payments').update({ status: 'failed' })
        .eq('razorpay_order_id', razorpay_order_id);
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Get payment record
    const { data: payment } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .single();

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status === 'completed') {
      return res.status(400).json({ error: 'Payment already processed' });
    }

    // Update payment status
    await supabaseAdmin.from('payments').update({
      razorpay_payment_id,
      status: 'completed',
    }).eq('razorpay_order_id', razorpay_order_id);

    // Credit user account
    const { data: credits } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', payment.user_id)
      .single();

    if (credits) {
      await supabaseAdmin.from('credits').update({
        balance: credits.balance + payment.credits,
        updated_at: new Date().toISOString(),
      }).eq('user_id', payment.user_id);

      await supabaseAdmin.from('transactions').insert({
        user_id: payment.user_id,
        type: 'earn',
        amount: payment.credits,
        description: `Purchased ${payment.credits} credits (₹${payment.amount_inr})`,
      });
    }

    // Get updated balance
    const { data: updated } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', payment.user_id)
      .single();

    res.json({
      message: 'Payment verified successfully',
      credits_added: payment.credits,
      balance: updated?.balance || 0,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}
