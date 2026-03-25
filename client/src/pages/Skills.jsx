import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';
import SkillRadarChart from '../components/skills/SkillRadarChart';
import SkillBarChart from '../components/skills/SkillBarChart';
import SkillCard from '../components/skills/SkillCard';

const initialSkills = [
  { id: '1', name: 'Python', level: 'Advanced', score: 85 },
  { id: '2', name: 'React', level: 'Intermediate', score: 65 },
  { id: '3', name: 'Machine Learning', level: 'Beginner', score: 35 },
  { id: '4', name: 'SQL', level: 'Advanced', score: 80 },
  { id: '5', name: 'System Design', level: 'Intermediate', score: 55 },
];

const levelScores = { Beginner: 30, Intermediate: 55, Advanced: 80, Expert: 95 };

export default function Skills() {
  const [skills, setSkills] = useState(initialSkills);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState('Beginner');

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleLevelChange = (id, level) => {
    setSkills(skills.map((s) =>
      s.id === id ? { ...s, level, score: levelScores[level] } : s
    ));
  };

  const handleAdd = () => {
    if (!newSkill.trim()) return;
    const skill = {
      id: `s${Date.now()}`,
      name: newSkill.trim(),
      level: newLevel,
      score: levelScores[newLevel],
    };
    setSkills([...skills, skill]);
    setNewSkill('');
    setNewLevel('Beginner');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      <main className="md:ml-14 lg:ml-60 pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-heading text-2xl font-semibold text-ink mb-6">My Skills</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Charts */}
            <div className="lg:col-span-3 space-y-6">
              <div className="card">
                <h2 className="font-heading text-lg font-semibold text-ink mb-4">Skill Radar</h2>
                <SkillRadarChart skills={skills} />
              </div>
              <div className="card">
                <h2 className="font-heading text-lg font-semibold text-ink mb-4">Skill Scores</h2>
                <SkillBarChart skills={skills} />
              </div>
            </div>

            {/* Right: Skill List */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-lg font-semibold text-ink">My Skills</h2>
                  <button onClick={() => setShowModal(true)} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
                    <Plus size={14} /> Add Skill
                  </button>
                </div>

                <div className="space-y-2">
                  {skills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      onDelete={handleDelete}
                      onLevelChange={handleLevelChange}
                    />
                  ))}
                </div>

                {skills.length === 0 && (
                  <p className="text-sm text-ink-muted text-center py-8">
                    No skills added yet. Click "Add Skill" to get started.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-card p-6 w-full max-w-sm shadow-card-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-semibold text-ink">Add New Skill</h3>
              <button onClick={() => setShowModal(false)} className="text-ink-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Skill Name</label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input"
                  placeholder="e.g., TypeScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Proficiency Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setNewLevel(level)}
                      className={`px-3 py-2 rounded-btn text-sm font-medium border transition-colors ${
                        newLevel === level
                          ? 'border-brand bg-brand-soft text-brand'
                          : 'border-border text-ink-muted hover:bg-surface-alt'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleAdd} className="btn-primary w-full" disabled={!newSkill.trim()}>
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
