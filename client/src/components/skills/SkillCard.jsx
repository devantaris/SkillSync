import { Trash2 } from 'lucide-react';

const levelTagClasses = {
  Beginner: 'tag-amber',
  Intermediate: 'tag-blue',
  Advanced: 'tag-green',
  Expert: 'bg-purple-50 text-purple-600 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
};

export default function SkillCard({ skill, onDelete, onLevelChange }) {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-card bg-surface-card hover:bg-surface-alt transition-colors duration-150">
      <div className="flex items-center gap-3">
        <div>
          <p className="font-medium text-sm text-ink">{skill.name}</p>
          <p className="text-xs text-ink-muted mt-0.5">Score: {skill.score}/100</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={skill.level}
          onChange={(e) => onLevelChange(skill.id, e.target.value)}
          className="text-xs border border-border rounded-btn px-2 py-1 bg-white focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        <span className={levelTagClasses[skill.level] || 'tag-blue'}>{skill.level}</span>
        <button
          onClick={() => onDelete(skill.id)}
          className="p-1.5 text-ink-muted hover:text-danger hover:bg-danger-soft rounded-btn transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
