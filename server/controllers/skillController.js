import { supabaseAdmin } from '../config/supabase.js';

// GET /api/skills
export async function getSkills(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json({ skills: data });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
}

// POST /api/skills
export async function addSkill(req, res) {
  try {
    const { name, level, score } = req.body;
    if (!name) return res.status(400).json({ error: 'Skill name is required' });

    const { data, error } = await supabaseAdmin
      .from('skills')
      .insert({ user_id: req.user.id, name, level: level || 'Beginner', score: score || 30 })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') return res.status(400).json({ error: 'Skill already exists' });
      throw error;
    }
    res.status(201).json({ skill: data });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
}

// PUT /api/skills/:id
export async function updateSkill(req, res) {
  try {
    const { level, score } = req.body;
    const updates = {};
    if (level !== undefined) updates.level = level;
    if (score !== undefined) updates.score = score;

    const { data, error } = await supabaseAdmin
      .from('skills')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Skill not found' });
    res.json({ skill: data });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
}

// DELETE /api/skills/:id
export async function deleteSkill(req, res) {
  try {
    const { error } = await supabaseAdmin
      .from('skills')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
}
