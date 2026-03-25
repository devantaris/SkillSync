import { Link } from 'react-router-dom';
import { Map, ArrowRight, BookOpen, Target, Sparkles, Code, Brain, Server } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';

const roadmaps = [
  {
    id: 1,
    title: 'Full-Stack Web Developer',
    description: 'Master frontend and backend development with React, Node.js, and databases.',
    icon: Code,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    courses: 8,
    duration: '3 months',
    color: 'text-brand bg-brand-soft',
  },
  {
    id: 2,
    title: 'Machine Learning Engineer',
    description: 'Build a strong foundation in ML from Python basics to deep learning.',
    icon: Brain,
    skills: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    courses: 6,
    duration: '4 months',
    color: 'text-earn bg-earn-soft',
  },
  {
    id: 3,
    title: 'DevOps & Cloud',
    description: 'Learn containerization, CI/CD, cloud platforms, and infrastructure as code.',
    icon: Server,
    skills: ['Linux', 'Docker', 'Git', 'AWS', 'Terraform', 'GitHub Actions'],
    courses: 7,
    duration: '3 months',
    color: 'text-warn bg-warn-soft',
  },
];

export default function Roadmaps() {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      <main className="md:ml-14 lg:ml-60 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-ink flex items-center gap-2">
                <Map size={24} /> Learning Roadmaps
              </h1>
              <p className="text-ink-muted text-sm mt-1">AI-curated learning paths to guide your journey</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmaps.map((roadmap) => (
              <div key={roadmap.id} className="card flex flex-col">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${roadmap.color}`}>
                  <roadmap.icon size={20} />
                </div>

                <h3 className="font-heading text-lg font-semibold text-ink mb-2">{roadmap.title}</h3>
                <p className="text-sm text-ink-muted mb-4 flex-1">{roadmap.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {roadmap.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="tag-blue">{skill}</span>
                  ))}
                  {roadmap.skills.length > 4 && (
                    <span className="tag-blue">+{roadmap.skills.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-ink-muted mb-4 border-t border-border pt-3">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> {roadmap.courses} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Target size={12} /> {roadmap.duration}
                  </span>
                </div>

                <button className="btn-secondary w-full text-sm flex items-center justify-center gap-2">
                  Start Roadmap <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 card bg-surface-alt text-center">
            <Sparkles size={28} className="text-brand mx-auto mb-3" />
            <h3 className="font-heading text-lg font-semibold text-ink mb-1">More Roadmaps Coming Soon</h3>
            <p className="text-sm text-ink-muted max-w-md mx-auto">
              We're building AI-powered personalized roadmaps based on your skill profile and goals.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
