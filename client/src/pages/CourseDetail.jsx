import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Clock, BarChart2, CalendarDays, CheckCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import AIScoreBadge from '../components/courses/AIScoreBadge';
import { useCredits } from '../hooks/useCredits';
import { useAuth } from '../hooks/useAuth';

const coursesData = {
  '1': {
    id: '1', title: 'Python for Data Science', creator: 'Aryan Mehta',
    skill_tags: ['Python', 'Data Science'], credit_cost: 40, ai_score: 88, enrolled: 124, level: 'Beginner',
    description: 'A comprehensive beginner-friendly course covering Python fundamentals and their application in data science. Learn pandas, numpy, matplotlib, and build real-world data analysis projects. Perfect for aspiring data scientists who want to build a solid foundation in Python programming and data manipulation.',
    learnings: ['Master Python fundamentals for data analysis', 'Use pandas and numpy for data manipulation', 'Create visualizations with matplotlib and seaborn', 'Build end-to-end data science projects', 'Clean and preprocess real-world datasets'],
    curriculum: [
      { title: 'Python Basics & Setup', lessons: 4 },
      { title: 'NumPy for Numerical Computing', lessons: 3 },
      { title: 'Data Manipulation with Pandas', lessons: 5 },
      { title: 'Data Visualization', lessons: 4 },
      { title: 'Capstone: Exploratory Data Analysis', lessons: 2 },
    ],
    duration: '8 hours', lastUpdated: 'Mar 2025',
  },
  '2': {
    id: '2', title: 'React from Zero to Hero', creator: 'Priya Sharma',
    skill_tags: ['React', 'JavaScript'], credit_cost: 60, ai_score: 92, enrolled: 87, level: 'Intermediate',
    description: 'Go from React beginner to confident developer. This course covers hooks, state management, routing, API integration, and deployment. Build multiple real-world applications including a task manager, weather app, and a full-stack blogging platform.',
    learnings: ['Understand React component architecture', 'Master hooks: useState, useEffect, useContext, useReducer', 'Implement client-side routing with React Router', 'Connect to REST APIs with Axios', 'Deploy React apps to production'],
    curriculum: [
      { title: 'React Fundamentals & JSX', lessons: 5 },
      { title: 'Hooks Deep Dive', lessons: 6 },
      { title: 'State Management Patterns', lessons: 4 },
      { title: 'Routing & Navigation', lessons: 3 },
      { title: 'Building & Deploying', lessons: 3 },
    ],
    duration: '12 hours', lastUpdated: 'Feb 2025',
  },
  '3': {
    id: '3', title: 'SQL Mastery: Queries to Optimization', creator: 'Rohan Das',
    skill_tags: ['SQL', 'Databases'], credit_cost: 35, ai_score: 79, enrolled: 56, level: 'Intermediate',
    description: 'Master SQL from basic queries to advanced optimization techniques. Cover joins, subqueries, window functions, indexing strategies, and query performance tuning with real database scenarios.',
    learnings: ['Write complex SQL queries with confidence', 'Master joins, subqueries, and CTEs', 'Use window functions for analytics', 'Optimize queries with indexing', 'Design efficient database schemas'],
    curriculum: [
      { title: 'SQL Fundamentals Review', lessons: 3 },
      { title: 'Advanced Joins & Subqueries', lessons: 4 },
      { title: 'Window Functions & Analytics', lessons: 4 },
      { title: 'Indexing & Optimization', lessons: 3 },
      { title: 'Real-World Practice', lessons: 3 },
    ],
    duration: '6 hours', lastUpdated: 'Jan 2025',
  },
  '4': {
    id: '4', title: 'ML Fundamentals with Scikit-learn', creator: 'Sneha Iyer',
    skill_tags: ['Machine Learning', 'Python'], credit_cost: 75, ai_score: 85, enrolled: 203, level: 'Intermediate',
    description: 'Learn machine learning from the ground up using Scikit-learn. Cover supervised and unsupervised learning, model evaluation, feature engineering, and build production-ready ML pipelines.',
    learnings: ['Understand ML algorithms and when to use them', 'Build supervised learning models', 'Implement unsupervised learning techniques', 'Evaluate and tune model performance', 'Create end-to-end ML pipelines'],
    curriculum: [
      { title: 'Introduction to ML', lessons: 3 },
      { title: 'Supervised Learning', lessons: 5 },
      { title: 'Unsupervised Learning', lessons: 4 },
      { title: 'Model Evaluation & Tuning', lessons: 4 },
      { title: 'ML Pipeline Project', lessons: 2 },
    ],
    duration: '10 hours', lastUpdated: 'Mar 2025',
  },
  '5': {
    id: '5', title: 'System Design for Interviews', creator: 'Karan Singh',
    skill_tags: ['System Design', 'Backend'], credit_cost: 90, ai_score: 94, enrolled: 312, level: 'Advanced',
    description: 'Ace system design interviews with this comprehensive guide. Learn to design scalable systems like URL shorteners, chat applications, social media feeds, and content delivery networks.',
    learnings: ['Master system design interview framework', 'Design scalable distributed systems', 'Understand trade-offs in system architecture', 'Learn caching, load balancing, and sharding', 'Practice with 10+ real system design problems'],
    curriculum: [
      { title: 'System Design Fundamentals', lessons: 4 },
      { title: 'Scalability Patterns', lessons: 5 },
      { title: 'Database Design at Scale', lessons: 4 },
      { title: 'Real-World System Designs', lessons: 6 },
      { title: 'Mock Interview Practice', lessons: 3 },
    ],
    duration: '15 hours', lastUpdated: 'Mar 2025',
  },
  '6': {
    id: '6', title: 'Git & GitHub Complete Guide', creator: 'Diya Nair',
    skill_tags: ['Git', 'DevOps'], credit_cost: 20, ai_score: 72, enrolled: 445, level: 'Beginner',
    description: 'Everything you need to know about Git and GitHub. From basic version control to advanced branching strategies, pull requests, CI/CD integration, and collaborative workflows.',
    learnings: ['Understand version control concepts', 'Master Git commands and workflows', 'Collaborate using pull requests', 'Implement branching strategies', 'Set up CI/CD with GitHub Actions'],
    curriculum: [
      { title: 'Git Basics', lessons: 4 },
      { title: 'Branching & Merging', lessons: 3 },
      { title: 'GitHub Collaboration', lessons: 4 },
      { title: 'Advanced Git', lessons: 3 },
      { title: 'GitHub Actions & CI/CD', lessons: 2 },
    ],
    duration: '5 hours', lastUpdated: 'Dec 2024',
  },
  '7': {
    id: '7', title: 'FastAPI Backend Development', creator: 'Vikram Rao',
    skill_tags: ['Python', 'Backend'], credit_cost: 55, ai_score: 81, enrolled: 67, level: 'Intermediate',
    description: 'Build modern, high-performance APIs with FastAPI. Cover routing, authentication, database integration, testing, and deployment. Create a production-ready REST API from scratch.',
    learnings: ['Build RESTful APIs with FastAPI', 'Implement authentication and authorization', 'Integrate with SQL and NoSQL databases', 'Write comprehensive API tests', 'Deploy APIs to cloud platforms'],
    curriculum: [
      { title: 'FastAPI Fundamentals', lessons: 4 },
      { title: 'Database Integration', lessons: 4 },
      { title: 'Authentication & Security', lessons: 3 },
      { title: 'Testing & Documentation', lessons: 3 },
      { title: 'Deployment', lessons: 2 },
    ],
    duration: '9 hours', lastUpdated: 'Feb 2025',
  },
  '8': {
    id: '8', title: 'Docker & Containers Fundamentals', creator: 'Ananya Bose',
    skill_tags: ['DevOps', 'Docker'], credit_cost: 45, ai_score: 68, enrolled: 39, level: 'Beginner',
    description: 'Learn containerization with Docker from scratch. Cover images, containers, volumes, networking, Docker Compose, and container orchestration basics.',
    learnings: ['Understand containerization concepts', 'Build and manage Docker images', 'Use Docker Compose for multi-container apps', 'Implement Docker networking and volumes', 'Deploy containerized applications'],
    curriculum: [
      { title: 'Container Basics', lessons: 3 },
      { title: 'Docker Images & Containers', lessons: 4 },
      { title: 'Docker Compose', lessons: 3 },
      { title: 'Networking & Volumes', lessons: 3 },
      { title: 'Production Deployment', lessons: 2 },
    ],
    duration: '7 hours', lastUpdated: 'Jan 2025',
  },
  '9': {
    id: '9', title: 'Competitive Programming: DSA Patterns', creator: 'Rahul Joshi',
    skill_tags: ['DSA', 'C++'], credit_cost: 80, ai_score: 91, enrolled: 178, level: 'Advanced',
    description: 'Master common DSA patterns used in competitive programming and coding interviews. Cover arrays, trees, graphs, dynamic programming, and advanced algorithms with 100+ practice problems.',
    learnings: ['Identify and apply common DSA patterns', 'Solve problems using sliding window, two pointers', 'Master tree and graph algorithms', 'Implement dynamic programming solutions', 'Optimize time and space complexity'],
    curriculum: [
      { title: 'Array & String Patterns', lessons: 5 },
      { title: 'Tree & Graph Algorithms', lessons: 5 },
      { title: 'Dynamic Programming', lessons: 6 },
      { title: 'Advanced Algorithms', lessons: 4 },
      { title: 'Contest Strategy', lessons: 2 },
    ],
    duration: '14 hours', lastUpdated: 'Mar 2025',
  },
};

export default function CourseDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { balance, deductCredits } = useCredits();
  const [enrolled, setEnrolled] = useState(false);
  const [openSection, setOpenSection] = useState(0);

  const course = coursesData[id];

  if (!course) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold text-ink mb-2">Course not found</h1>
          <Link to="/courses" className="text-brand hover:underline">← Back to courses</Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (enrolled) return;
    const success = deductCredits(course.credit_cost, `Enrolled in "${course.title}"`, course.id);
    if (success) {
      setEnrolled(true);
    } else {
      alert('Not enough credits!');
    }
  };

  const creatorEarning = Math.floor(course.credit_cost * 0.85);
  const platformFee = course.credit_cost - creatorEarning;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-ink text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4">
            <ArrowLeft size={16} /> Back to courses
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                {course.creator[0]}
              </div>
              <span className="text-sm text-gray-300">{course.creator}</span>
            </div>
            <AIScoreBadge score={course.ai_score} />
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Users size={14} /> {course.enrolled} enrolled
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {course.skill_tags.map((tag) => (
              <span key={tag} className="tag-blue">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-xl font-semibold text-ink mb-3">About this course</h2>
              <p className="text-ink-soft leading-relaxed">{course.description}</p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-ink mb-4">What you'll learn</h2>
              <div className="space-y-2">
                {course.learnings.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-earn mt-0.5 shrink-0" />
                    <span className="text-sm text-ink-soft">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-ink mb-4">Curriculum</h2>
              <div className="space-y-2">
                {course.curriculum.map((section, i) => (
                  <div key={i} className="border border-border rounded-card overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === i ? -1 : i)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-alt transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-ink-muted">Section {i + 1}</span>
                        <span className="text-sm font-medium text-ink">{section.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-muted">{section.lessons} lessons</span>
                        {openSection === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    {openSection === i && (
                      <div className="px-4 py-3 bg-surface-alt border-t border-border">
                        {Array.from({ length: section.lessons }, (_, j) => (
                          <div key={j} className="flex items-center gap-2 py-1.5 text-sm text-ink-soft">
                            <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-xs text-ink-muted">
                              {j + 1}
                            </div>
                            Lesson {j + 1}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 shadow-card-lg">
              <p className="font-heading text-3xl font-bold text-ink mb-1">{course.credit_cost} credits</p>
              <p className="text-sm text-ink-muted mb-6">One-time enrollment</p>

              {enrolled ? (
                <div className="bg-earn-soft text-earn text-center py-3 rounded-btn font-medium text-sm mb-4">
                  ✓ Enrolled Successfully
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={!isAuthenticated}
                  className="btn-primary w-full mb-4"
                >
                  {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
                </button>
              )}

              <div className="text-xs text-ink-muted space-y-1 mb-4 border-t border-border pt-4">
                <p>Creator earns <span className="font-semibold text-earn">{creatorEarning}</span> credits</p>
                <p>Platform fee: <span className="font-semibold">{platformFee}</span> credits (15%)</p>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                {[
                  { icon: Clock, label: 'Duration', value: course.duration },
                  { icon: BarChart2, label: 'Level', value: course.level },
                  { icon: CalendarDays, label: 'Updated', value: course.lastUpdated },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink-muted">
                      <item.icon size={14} /> {item.label}
                    </span>
                    <span className="font-medium text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
