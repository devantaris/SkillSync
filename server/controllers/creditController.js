import { supabaseAdmin } from '../config/supabase.js';

const STARTER_CREDITS = 100;

// GET /api/credits/balance
export async function getBalance(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) throw error;

    // New user — create credits row with 100 starter credits
    if (!data) {
      const { data: newRow } = await supabaseAdmin
        .from('credits')
        .insert({ user_id: req.user.id, balance: STARTER_CREDITS })
        .select()
        .single();

      // Log the welcome bonus transaction
      await supabaseAdmin.from('transactions').insert({
        user_id: req.user.id,
        type: 'earn',
        amount: STARTER_CREDITS,
        description: 'Welcome bonus — 100 starter credits',
      });

      return res.json({ balance: newRow?.balance || STARTER_CREDITS });
    }

    res.json({ balance: data.balance });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
}

// GET /api/credits/transactions
export async function getTransactions(req, res) {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const { data, error, count } = await supabaseAdmin
      .from('transactions')
      .select('*', { count: 'exact' })
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;
    res.json({ transactions: data || [], total: count || 0 });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
}
