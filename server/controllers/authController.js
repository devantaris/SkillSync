import { supabaseAdmin } from '../config/supabase.js';

// GET /api/auth/profile
export async function getProfile(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    res.json({ profile: data });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

// PUT /api/auth/profile
export async function updateProfile(req, res) {
  try {
    const { name, avatar_url } = req.body;

    const updates = { updated_at: new Date().toISOString() };
    if (name !== undefined) updates.name = name;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ profile: data });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}
