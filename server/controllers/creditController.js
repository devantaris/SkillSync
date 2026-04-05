import { supabaseAdmin } from '../config/supabase.js';

// GET /api/credits/balance
export async function getBalance(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) throw error;

    // If no row found, create one with 0 balance
    if (!data) {
      const { data: newRow } = await supabaseAdmin
        .from('credits')
        .insert({ user_id: req.user.id, balance: 0 })
        .select()
        .single();
      return res.json({ balance: newRow?.balance || 0 });
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
