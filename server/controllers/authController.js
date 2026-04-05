import { supabaseAdmin } from '../config/supabase.js';

// GET /api/auth/profile
export async function getProfile(req, res) {
  try {
    let { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) throw error;

    // Auto-create profile for new users (e.g., Google OAuth)
    if (!data) {
      const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(req.user.id);
      const name = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

      const { data: newProfile, error: insertErr } = await supabaseAdmin
        .from('profiles')
        .insert({
          user_id: req.user.id,
          name,
          email: user?.email || '',
          avatar_url: user?.user_metadata?.avatar_url || null,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;
      data = newProfile;
    }

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
