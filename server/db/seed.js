import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const users = [
  { name: 'Devansh Kumar', email: 'devansh@skillsync.dev' },
  { name: 'Atharva Patil', email: 'atharva@skillsync.dev' },
  { name: 'Satvik Sharma', email: 'satvik@skillsync.dev' },
  { name: 'Gaurika Joshi', email: 'gaurika@skillsync.dev' },
  { name: 'Sanskriti Verma', email: 'sanskriti@skillsync.dev' },
  { name: 'Vansh Agarwal', email: 'vansh@skillsync.dev' },
  { name: 'Riya Nair', email: 'riya@skillsync.dev' },
  { name: 'Arjun Mehta', email: 'arjun@skillsync.dev' },
];

const coursesData = [
  { title: 'Python for Data Science', short_description: 'Master Python fundamentals and data analysis with pandas, numpy, and matplotlib.', description: 'A comprehensive beginner-friendly course covering Python fundamentals and their application in data science. Learn pandas, numpy, matplotlib, and build real-world data analysis projects.', skill_tags: ['Python', 'Data Science'], level: 'Beginner', credit_cost: 40, ai_score: 88, status: 'approved', enrolled_count: 124, curriculum: [{ title: 'Python Basics & Setup', lessons: 4 }, { title: 'NumPy for Numerical Computing', lessons: 3 }, { title: 'Data Manipulation with Pandas', lessons: 5 }, { title: 'Data Visualization', lessons: 4 }], learnings: ['Master Python fundamentals for data analysis', 'Use pandas and numpy for data manipulation', 'Create visualizations with matplotlib', 'Build end-to-end data science projects'], creatorIndex: 0 },
  { title: 'React from Zero to Hero', short_description: 'Go from React beginner to confident developer — hooks, state, routing, and deployment.', description: 'Go from React beginner to confident developer. This course covers hooks, state management, routing, API integration, and deployment.', skill_tags: ['React', 'JavaScript'], level: 'Intermediate', credit_cost: 60, ai_score: 92, status: 'approved', enrolled_count: 87, curriculum: [{ title: 'React Fundamentals & JSX', lessons: 5 }, { title: 'Hooks Deep Dive', lessons: 6 }, { title: 'State Management', lessons: 4 }, { title: 'Routing & Navigation', lessons: 3 }], learnings: ['Understand React component architecture', 'Master hooks: useState, useEffect, useContext', 'Implement client-side routing', 'Deploy React apps'], creatorIndex: 1 },
  { title: 'SQL Mastery: Queries to Optimization', short_description: 'Master SQL from basic queries to advanced optimization techniques with real-world scenarios.', description: 'Master SQL from basic queries to advanced optimization techniques. Cover joins, subqueries, window functions, indexing strategies, and query performance tuning.', skill_tags: ['SQL', 'Databases'], level: 'Intermediate', credit_cost: 35, ai_score: 79, status: 'approved', enrolled_count: 56, curriculum: [{ title: 'SQL Fundamentals Review', lessons: 3 }, { title: 'Advanced Joins & Subqueries', lessons: 4 }, { title: 'Window Functions & Analytics', lessons: 4 }, { title: 'Indexing & Optimization', lessons: 3 }], learnings: ['Write complex SQL queries with confidence', 'Master joins, subqueries, and CTEs', 'Use window functions for analytics', 'Optimize queries with indexing'], creatorIndex: 2 },
  { title: 'ML Fundamentals with Scikit-learn', short_description: 'Learn machine learning from the ground up — supervised, unsupervised, and ML pipelines.', description: 'Learn machine learning from the ground up using Scikit-learn. Cover supervised and unsupervised learning, model evaluation, feature engineering, and build production-ready ML pipelines.', skill_tags: ['Machine Learning', 'Python'], level: 'Intermediate', credit_cost: 75, ai_score: 85, status: 'approved', enrolled_count: 203, curriculum: [{ title: 'Introduction to ML', lessons: 3 }, { title: 'Supervised Learning', lessons: 5 }, { title: 'Unsupervised Learning', lessons: 4 }, { title: 'Model Evaluation & Tuning', lessons: 4 }], learnings: ['Understand ML algorithms and when to use them', 'Build supervised learning models', 'Implement unsupervised learning', 'Create end-to-end ML pipelines'], creatorIndex: 3 },
  { title: 'System Design for Interviews', short_description: 'Ace system design interviews — design scalable systems like URL shorteners, chat apps, and CDNs.', description: 'Ace system design interviews with this comprehensive guide. Learn to design scalable systems like URL shorteners, chat applications, social media feeds, and content delivery networks.', skill_tags: ['System Design', 'Backend'], level: 'Advanced', credit_cost: 90, ai_score: 94, status: 'approved', enrolled_count: 312, curriculum: [{ title: 'System Design Fundamentals', lessons: 4 }, { title: 'Scalability Patterns', lessons: 5 }, { title: 'Database Design at Scale', lessons: 4 }, { title: 'Real-World System Designs', lessons: 6 }], learnings: ['Master system design interview framework', 'Design scalable distributed systems', 'Understand trade-offs in system architecture', 'Learn caching, load balancing, and sharding'], creatorIndex: 4 },
  { title: 'Git & GitHub Complete Guide', short_description: 'Everything about Git and GitHub — version control, branching, PRs, and CI/CD with Actions.', description: 'Everything you need to know about Git and GitHub. From basic version control to advanced branching strategies, pull requests, CI/CD integration, and collaborative workflows.', skill_tags: ['Git', 'DevOps'], level: 'Beginner', credit_cost: 20, ai_score: 72, status: 'approved', enrolled_count: 445, curriculum: [{ title: 'Git Basics', lessons: 4 }, { title: 'Branching & Merging', lessons: 3 }, { title: 'GitHub Collaboration', lessons: 4 }, { title: 'GitHub Actions & CI/CD', lessons: 2 }], learnings: ['Understand version control concepts', 'Master Git commands and workflows', 'Collaborate using pull requests', 'Set up CI/CD with GitHub Actions'], creatorIndex: 5 },
  { title: 'FastAPI Backend Development', short_description: 'Build modern, high-performance APIs with FastAPI — auth, databases, testing, and deployment.', description: 'Build modern, high-performance APIs with FastAPI. Cover routing, authentication, database integration, testing, and deployment.', skill_tags: ['Python', 'Backend'], level: 'Intermediate', credit_cost: 55, ai_score: 81, status: 'approved', enrolled_count: 67, curriculum: [{ title: 'FastAPI Fundamentals', lessons: 4 }, { title: 'Database Integration', lessons: 4 }, { title: 'Authentication & Security', lessons: 3 }, { title: 'Deployment', lessons: 2 }], learnings: ['Build RESTful APIs with FastAPI', 'Implement authentication and authorization', 'Integrate with SQL and NoSQL databases', 'Deploy APIs to cloud platforms'], creatorIndex: 6 },
  { title: 'Docker & Containers Fundamentals', short_description: 'Learn containerization from scratch — images, containers, Docker Compose, and orchestration.', description: 'Learn containerization with Docker from scratch. Cover images, containers, volumes, networking, Docker Compose, and container orchestration basics.', skill_tags: ['DevOps', 'Docker'], level: 'Beginner', credit_cost: 45, ai_score: 68, status: 'approved', enrolled_count: 39, curriculum: [{ title: 'Container Basics', lessons: 3 }, { title: 'Docker Images & Containers', lessons: 4 }, { title: 'Docker Compose', lessons: 3 }, { title: 'Production Deployment', lessons: 2 }], learnings: ['Understand containerization concepts', 'Build and manage Docker images', 'Use Docker Compose for multi-container apps', 'Deploy containerized applications'], creatorIndex: 7 },
  { title: 'Competitive Programming: DSA Patterns', short_description: 'Master common DSA patterns for competitive programming and coding interviews with 100+ problems.', description: 'Master common DSA patterns used in competitive programming and coding interviews. Cover arrays, trees, graphs, dynamic programming, and advanced algorithms.', skill_tags: ['DSA', 'C++'], level: 'Advanced', credit_cost: 80, ai_score: 91, status: 'approved', enrolled_count: 178, curriculum: [{ title: 'Array & String Patterns', lessons: 5 }, { title: 'Tree & Graph Algorithms', lessons: 5 }, { title: 'Dynamic Programming', lessons: 6 }, { title: 'Advanced Algorithms', lessons: 4 }], learnings: ['Identify and apply common DSA patterns', 'Solve problems using sliding window, two pointers', 'Master tree and graph algorithms', 'Implement dynamic programming solutions'], creatorIndex: 1 },
];

const skillsMap = {
  0: [{ name: 'Python', level: 'Advanced', score: 85 }, { name: 'Data Science', level: 'Intermediate', score: 65 }, { name: 'SQL', level: 'Advanced', score: 80 }, { name: 'Machine Learning', level: 'Beginner', score: 35 }],
  1: [{ name: 'React', level: 'Advanced', score: 90 }, { name: 'JavaScript', level: 'Expert', score: 95 }, { name: 'TypeScript', level: 'Intermediate', score: 60 }, { name: 'C++', level: 'Advanced', score: 82 }],
  2: [{ name: 'SQL', level: 'Expert', score: 95 }, { name: 'PostgreSQL', level: 'Advanced', score: 85 }, { name: 'MongoDB', level: 'Intermediate', score: 55 }],
  3: [{ name: 'Python', level: 'Intermediate', score: 60 }, { name: 'Machine Learning', level: 'Advanced', score: 80 }, { name: 'TensorFlow', level: 'Intermediate', score: 55 }],
  4: [{ name: 'System Design', level: 'Expert', score: 92 }, { name: 'Backend', level: 'Advanced', score: 85 }, { name: 'AWS', level: 'Intermediate', score: 65 }],
  5: [{ name: 'Git', level: 'Expert', score: 95 }, { name: 'DevOps', level: 'Advanced', score: 78 }, { name: 'Docker', level: 'Intermediate', score: 60 }],
  6: [{ name: 'Python', level: 'Expert', score: 93 }, { name: 'FastAPI', level: 'Advanced', score: 85 }, { name: 'Docker', level: 'Intermediate', score: 55 }],
  7: [{ name: 'Docker', level: 'Expert', score: 90 }, { name: 'Kubernetes', level: 'Intermediate', score: 55 }, { name: 'Linux', level: 'Advanced', score: 80 }],
};

async function seed() {
  console.log('🌱 Seeding SkillSync database...\n');

  // 1. Create auth users
  const userIds = [];
  for (const user of users) {
    console.log(`  Creating user: ${user.name} (${user.email})`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: 'SkillSync123!',
      email_confirm: true,
      user_metadata: { name: user.name },
    });

    if (error) {
      if (error.message.includes('already been registered')) {
        // Get existing user
        const { data: { users: existing } } = await supabase.auth.admin.listUsers();
        const found = existing.find(u => u.email === user.email);
        if (found) { userIds.push(found.id); console.log(`    → Already exists (${found.id})`); continue; }
      }
      console.log(`    ✗ Error: ${error.message}`);
      userIds.push(null);
      continue;
    }
    userIds.push(data.user.id);
    console.log(`    ✓ Created (${data.user.id})`);
  }

  console.log(`\n  ${userIds.filter(Boolean).length}/${users.length} users ready\n`);

  // 2. Give some users extra credits
  const creditBonuses = [250, 180, 120, 90, 320, 200, 150, 100];
  for (let i = 0; i < userIds.length; i++) {
    if (!userIds[i]) continue;
    const bonus = creditBonuses[i];
    const { data: cred } = await supabase.from('credits').select('balance').eq('user_id', userIds[i]).single();
    if (cred) {
      await supabase.from('credits').update({ balance: cred.balance + bonus }).eq('user_id', userIds[i]);
      await supabase.from('transactions').insert({ user_id: userIds[i], type: 'earn', amount: bonus, description: `Earned from course enrollments` });
    }
  }
  console.log('  ✓ Credit bonuses applied\n');

  // 3. Insert courses
  console.log('  Creating courses...');
  const courseIds = [];
  for (const course of coursesData) {
    const creatorId = userIds[course.creatorIndex];
    if (!creatorId) { courseIds.push(null); continue; }

    const { data, error } = await supabase.from('courses').insert({
      creator_id: creatorId,
      title: course.title,
      short_description: course.short_description,
      description: course.description,
      skill_tags: course.skill_tags,
      level: course.level,
      credit_cost: course.credit_cost,
      ai_score: course.ai_score,
      ai_feedback: { completeness: 80, structure: 75, originality: 85, feedback: [{ type: 'strong', text: 'Well structured course' }] },
      status: course.status,
      enrolled_count: course.enrolled_count,
      curriculum: course.curriculum,
      learnings: course.learnings,
    }).select().single();

    if (error) {
      console.log(`    ✗ ${course.title}: ${error.message}`);
      courseIds.push(null);
    } else {
      console.log(`    ✓ ${course.title}`);
      courseIds.push(data.id);

      // Creator earning transaction
      await supabase.from('transactions').insert({ user_id: creatorId, type: 'earn', amount: 50, description: `Course approved: "${course.title}"`, course_id: data.id });
    }
  }

  console.log(`\n  ${courseIds.filter(Boolean).length}/${coursesData.length} courses created\n`);

  // 4. Insert skills for each user
  console.log('  Creating skills...');
  for (let i = 0; i < userIds.length; i++) {
    if (!userIds[i] || !skillsMap[i]) continue;
    for (const skill of skillsMap[i]) {
      const { error } = await supabase.from('skills').insert({ user_id: userIds[i], name: skill.name, level: skill.level, score: skill.score });
      if (error && !error.message.includes('duplicate')) console.log(`    ✗ Skill ${skill.name} for user ${i}: ${error.message}`);
    }
    console.log(`    ✓ ${users[i].name}: ${skillsMap[i].length} skills`);
  }

  // 5. Create some enrollments
  console.log('\n  Creating enrollments...');
  const enrollments = [
    [1, 0], [1, 2], [1, 4], // Atharva enrolled in courses by Devansh, Satvik, Sanskriti
    [2, 1], [2, 3],         // Satvik enrolled in Atharva, Gaurika
    [3, 0], [3, 5],         // Gaurika enrolled in Devansh, Vansh
    [4, 1], [4, 6],         // Sanskriti enrolled in Atharva, Riya
    [5, 0], [5, 7],         // Vansh enrolled in Devansh, Arjun
    [6, 1], [6, 4],         // Riya enrolled in Atharva, Sanskriti
    [7, 0], [7, 2],         // Arjun enrolled in Devansh, Satvik
    [0, 1], [0, 4], [0, 8], // Devansh enrolled in Atharva's React, Sanskriti's SysDesign, Atharva's DSA
  ];

  let enrollCount = 0;
  for (const [userIdx, courseIdx] of enrollments) {
    const userId = userIds[userIdx];
    const courseId = courseIds[courseIdx];
    if (!userId || !courseId) continue;

    const { error } = await supabase.from('enrollments').insert({ user_id: userId, course_id: courseId, progress: Math.floor(Math.random() * 80) + 10 });
    if (error && !error.message.includes('duplicate')) { continue; }

    // Spend transaction
    const course = coursesData[courseIdx];
    await supabase.from('transactions').insert({ user_id: userId, type: 'spend', amount: course.credit_cost, description: `Enrolled in "${course.title}"`, course_id: courseId });
    enrollCount++;
  }
  console.log(`    ✓ ${enrollCount} enrollments created\n`);

  console.log('✅ Seeding complete!\n');
  console.log('  Users password: SkillSync123!');
  console.log('  Login with any of these emails:');
  users.forEach(u => console.log(`    → ${u.email}`));
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
