import { Link, useLocation } from 'react-router-dom';
import { Users } from 'lucide-react';
import AIScoreBadge from './AIScoreBadge';

const emojiMap = {
  Python: '🐍',
  React: '⚛️',
  JavaScript: '🟨',
  SQL: '🗃️',
  'Machine Learning': '🤖',
  'System Design': '🏗️',
  Git: '📦',
  DevOps: '🔧',
  Docker: '🐳',
  DSA: '🧩',
  'Data Science': '📊',
  Backend: '⚡',
  'C++': '💻',
  Databases: '🗄️',
};

export default function CourseCard({ course }) {
  const location = useLocation();
  const isInApp = location.pathname.startsWith('/app');
  const mainEmoji = emojiMap[(course.skill_tags || [])[0]] || '📚';
  const creator = course.creator || 'Unknown';

  return (
    <Link to={`${isInApp ? '/app' : ''}/courses/${course.id}`} className="card block group">
      <div className="aspect-video bg-surface-alt rounded-lg flex items-center justify-center mb-3">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{mainEmoji}</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-brand-soft flex items-center justify-center text-brand text-xs font-semibold">
          {creator[0]}
        </div>
        <span className="text-xs text-ink-muted">{creator}</span>
      </div>

      <h3 className="font-heading text-base font-semibold text-ink leading-snug line-clamp-2 mb-2">
        {course.title}
      </h3>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {(course.skill_tags || []).slice(0, 3).map((tag) => (
          <span key={tag} className="tag-blue">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AIScoreBadge score={course.ai_score} />
          <span className="flex items-center gap-1 text-xs text-ink-muted">
            <Users size={12} />
            {course.enrolled_count || course.enrolled || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-sm text-ink">{course.credit_cost} credits</span>
        </div>
      </div>
    </Link>
  );
}
