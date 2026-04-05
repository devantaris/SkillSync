import { supabaseAdmin } from '../config/supabase.js';

// POST /api/agents/validate — Mock AI course validation
export async function validateCourse(req, res) {
  try {
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({ error: 'course_id is required' });
    }

    // Get course
    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .select('*')
      .eq('id', course_id)
      .eq('creator_id', req.user.id)
      .single();

    if (error || !course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Mock AI scoring — randomized but deterministic-ish
    const completeness = Math.floor(Math.random() * 25) + 70;  // 70-95
    const structure = Math.floor(Math.random() * 30) + 60;      // 60-90
    const originality = Math.floor(Math.random() * 20) + 75;    // 75-95
    const overallScore = Math.floor((completeness + structure + originality) / 3);

    const feedback = [];
    if (completeness >= 80) feedback.push({ type: 'strong', text: 'Clear learning objectives and structured curriculum' });
    else feedback.push({ type: 'improve', text: 'Consider adding more detailed learning objectives' });

    if (structure >= 75) feedback.push({ type: 'strong', text: 'Well-organized course sections' });
    else feedback.push({ type: 'improve', text: 'Add more practical examples in Section 2' });

    if (originality >= 85) feedback.push({ type: 'strong', text: 'Original content with unique perspective' });
    else feedback.push({ type: 'improve', text: 'Description could be more specific' });

    const status = overallScore >= 70 ? 'approved' : 'rejected';

    // Update course with AI results
    await supabaseAdmin.from('courses').update({
      ai_score: overallScore,
      ai_feedback: { completeness, structure, originality, feedback },
      status,
      updated_at: new Date().toISOString(),
    }).eq('id', course_id);

    // If approved, give creator 50 credits bonus
    if (status === 'approved') {
      const { data: credits } = await supabaseAdmin
        .from('credits')
        .select('balance')
        .eq('user_id', req.user.id)
        .single();

      if (credits) {
        await supabaseAdmin.from('credits').update({
          balance: credits.balance + 50,
          updated_at: new Date().toISOString(),
        }).eq('user_id', req.user.id);

        await supabaseAdmin.from('transactions').insert({
          user_id: req.user.id,
          type: 'earn',
          amount: 50,
          description: `Course approved: "${course.title}"`,
          course_id,
        });
      }
    }

    res.json({
      overallScore,
      completeness,
      structure,
      originality,
      feedback,
      status,
    });
  } catch (error) {
    console.error('Validate course error:', error);
    res.status(500).json({ error: 'Failed to validate course' });
  }
}
