import { useState, useEffect } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import SkillRadarChart from '../components/skills/SkillRadarChart';
import SkillBarChart from '../components/skills/SkillBarChart';
import SkillCard from '../components/skills/SkillCard';
import { api } from '../lib/api';

const levelScores = { Beginner: 30, Intermediate: 55, Advanced: 80, Expert: 95 };

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState('Beginner');

  useEffect(() => {
    api.get('/skills')
      .then(res => setSkills(res.data?.skills || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
    } catch {}
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleLevelChange = async (id, level) => {
    const score = levelScores[level];
    setSkills(skills.map((s) => s.id === id ? { ...s, level, score } : s));
    try { await api.put(`/skills/${id}`, { level, score }); } catch {}
  };

  const handleAdd = async () => {
    if (!newSkill.trim()) return;
    const score = levelScores[newLevel];
    try {
      const res = await api.post('/skills', { name: newSkill.trim(), level: newLevel, score });
      setSkills([...skills, res.data.skill]);
    } catch {
      setSkills([...skills, { id: `s${Date.now()}`, name: newSkill.trim(), level: newLevel, score }]);
    }
    setNewSkill('');
    setNewLevel('Beginner');
    setShowModal(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="card">
              <h2 className="font-heading text-lg font-semibold text-ink mb-4">Skill Radar</h2>
              {skills.length > 0 ? <SkillRadarChart skills={skills} /> : (
                <div className="py-10 text-center text-sm text-ink-muted">Add skills to see your radar chart</div>
              )}
            </div>
            <div className="card">
              <h2 className="font-heading text-lg font-semibold text-ink mb-4">Skill Scores</h2>
              {skills.length > 0 ? <SkillBarChart skills={skills} /> : (
                <div className="py-10 text-center text-sm text-ink-muted">Add skills to see your score chart</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-semibold text-ink">My Skills</h2>
                <button onClick={() => setShowModal(true)} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
                  <Plus size={14} /> Add Skill
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center py-10">
                  <Loader2 className="w-6 h-6 text-brand animate-spin mb-2" />
                  <p className="text-sm text-ink-muted">Loading skills...</p>
                </div>
              ) : skills.length === 0 ? (
                <p className="text-sm text-ink-muted text-center py-8">No skills added yet. Click "Add Skill" to get started.</p>
              ) : (
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} onDelete={handleDelete} onLevelChange={handleLevelChange} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-card p-6 w-full max-w-sm shadow-card-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-semibold text-ink">Add New Skill</h3>
              <button onClick={() => setShowModal(false)} className="text-ink-muted hover:text-ink"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Skill Name</label>
                <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="input" placeholder="e.g., TypeScript" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Proficiency Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                    <button key={level} onClick={() => setNewLevel(level)}
                      className={`px-3 py-2 rounded-btn text-sm font-medium border transition-colors ${
                        newLevel === level ? 'border-brand bg-brand-soft text-brand' : 'border-border text-ink-muted hover:bg-surface-alt'
                      }`}
                    >{level}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleAdd} className="btn-primary w-full" disabled={!newSkill.trim()}>Add Skill</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
