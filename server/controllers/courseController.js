import { supabaseAdmin } from '../config/supabase.js';

// GET /api/courses — list all published courses
export async function listCourses(req, res) {
  try {
    const { search, tags, sort } = req.query;

    let query = supabaseAdmin
      .from('courses')
      .select('*, profiles!courses_creator_id_fkey(name, avatar_url)')
      .eq('status', 'approved');

    if (search) {
      query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%`);
    }

    if (tags) {
      const tagList = tags.split(',');
      query = query.overlaps('skill_tags', tagList);
    }

    switch (sort) {
      case 'popular':
        query = query.order('enrolled_count', { ascending: false });
        break;
      case 'price_asc':
        query = query.order('credit_cost', { ascending: true });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;

    // Map creator info
    const courses = data.map((c) => ({
      ...c,
      creator: c.profiles?.name || 'Unknown',
      creator_avatar: c.profiles?.avatar_url,
      profiles: undefined,
    }));

    res.json({ courses });
  } catch (error) {
    console.error('List courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
}

// GET /api/courses/:id — get course detail
export async function getCourse(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .select('*, profiles!courses_creator_id_fkey(name, avatar_url)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = {
      ...data,
      creator: data.profiles?.name || 'Unknown',
      creator_avatar: data.profiles?.avatar_url,
      profiles: undefined,
    };

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

// POST /api/courses — create a new course
export async function createCourse(req, res) {
  try {
    const { title, short_description, description, video_url, skill_tags, level, credit_cost, curriculum, learnings } = req.body;

    if (!title || !short_description) {
      return res.status(400).json({ error: 'Title and short description are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('courses')
      .insert({
        creator_id: req.user.id,
        title,
        short_description,
        description: description || '',
        video_url: video_url || null,
        skill_tags: skill_tags || [],
        level: level || 'Beginner',
        credit_cost: credit_cost || 50,
        curriculum: curriculum || [],
        learnings: learnings || [],
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ course: data });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
}

// PUT /api/courses/:id — update own course
export async function updateCourse(req, res) {
  try {
    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('courses')
      .select('creator_id')
      .eq('id', req.params.id)
      .single();

    if (!existing || existing.creator_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this course' });
    }

    const allowed = ['title', 'short_description', 'description', 'video_url', 'skill_tags', 'level', 'credit_cost', 'curriculum', 'learnings', 'status'];
    const updates = { updated_at: new Date().toISOString() };
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const { data, error } = await supabaseAdmin
      .from('courses')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ course: data });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
}

// DELETE /api/courses/:id — delete own course
export async function deleteCourse(req, res) {
  try {
    const { data: existing } = await supabaseAdmin
      .from('courses')
      .select('creator_id')
      .eq('id', req.params.id)
      .single();

    if (!existing || existing.creator_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this course' });
    }

    const { error } = await supabaseAdmin
      .from('courses')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
}

// POST /api/courses/:id/enroll — enroll in a course
export async function enrollCourse(req, res) {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Get course
    const { data: course, error: courseError } = await supabaseAdmin
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .eq('status', 'approved')
      .single();

    if (courseError || !course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Can't enroll in own course
    if (course.creator_id === userId) {
      return res.status(400).json({ error: 'Cannot enroll in your own course' });
    }

    // Check if already enrolled
    const { data: existingEnroll } = await supabaseAdmin
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (existingEnroll) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Check user balance
    const { data: userCredits } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (!userCredits || userCredits.balance < course.credit_cost) {
      return res.status(400).json({ error: 'Insufficient credits' });
    }

    const creatorEarning = Math.floor(course.credit_cost * 0.85);

    // Deduct credits from learner
    await supabaseAdmin.from('credits').update({
      balance: userCredits.balance - course.credit_cost,
      updated_at: new Date().toISOString(),
    }).eq('user_id', userId);

    // Add spend transaction for learner
    await supabaseAdmin.from('transactions').insert({
      user_id: userId,
      type: 'spend',
      amount: course.credit_cost,
      description: `Enrolled in "${course.title}"`,
      course_id: courseId,
    });

    // Credit creator
    const { data: creatorCredits } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', course.creator_id)
      .single();

    if (creatorCredits) {
      await supabaseAdmin.from('credits').update({
        balance: creatorCredits.balance + creatorEarning,
        updated_at: new Date().toISOString(),
      }).eq('user_id', course.creator_id);

      await supabaseAdmin.from('transactions').insert({
        user_id: course.creator_id,
        type: 'earn',
        amount: creatorEarning,
        description: `Enrollment earning: "${course.title}"`,
        course_id: courseId,
      });
    }

    // Create enrollment
    await supabaseAdmin.from('enrollments').insert({
      user_id: userId,
      course_id: courseId,
    });

    // Update enrolled count
    await supabaseAdmin.from('courses').update({
      enrolled_count: course.enrolled_count + 1,
    }).eq('id', courseId);

    // Get updated balance
    const { data: updatedCredits } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    res.json({
      message: 'Enrolled successfully',
      balance: updatedCredits?.balance || 0,
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ error: 'Failed to enroll' });
  }
}
