import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Layers, Coins, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { useCredits } from '../hooks/useCredits';
import { api } from '../lib/api';

export default function Dashboard() {
  const { profile } = useAuth();
  const { balance, transactions, fetchBalance, fetchTransactions } = useCredits();
  const [skills, setSkills] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [createdCount, setCreatedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();

    Promise.all([
      api.get('/skills').catch(() => ({ data: { skills: [] } })),
      api.get('/courses').catch(() => ({ data: { courses: [] } })),
    ]).then(([skillsRes, coursesRes]) => {
      setSkills(skillsRes.data?.skills || []);
      // Count courses created by the current user
      const courses = coursesRes.data?.courses || [];
      setCreatedCount(courses.filter(c => c.creator_id === profile?.id).length);
    }).finally(() => setLoading(false));
  }, []);

  const radarData = skills.length
    ? skills.slice(0, 6).map(s => ({ name: s.name, score: s.score || 50 }))
    : [];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const totalEarned = transactions.filter(t => t.type === 'earn').reduce((a, t) => a + t.amount, 0);

  const stats = [
    { label: 'Courses Enrolled', value: enrolledCourses.length || transactions.filter(t => t.type === 'spend' && t.description?.includes('Enrolled')).length, icon: BookOpen, color: 'text-brand bg-brand-soft' },
    { label: 'Courses Created', value: createdCount, icon: Award, color: 'text-earn bg-earn-soft' },
    { label: 'Skills Added', value: skills.length, icon: Layers, color: 'text-warn bg-warn-soft' },
    { label: 'Credits Earned', value: totalEarned, icon: Coins, color: 'text-brand bg-brand-soft' },
  ];

  const recentTx = transactions.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="font-heading text-xl font-semibold text-ink mb-5">
        {greeting}, {profile?.name || 'there'} 👋
      </h2>

      {/* Credit Balance Card */}
      <div className="bg-gradient-to-r from-brand to-blue-700 rounded-card p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-100 mb-1">Credit Balance</p>
            <p className="font-heading text-4xl font-bold">{balance}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-3 py-1.5 text-sm">
            <TrendingUp size={14} />
            {totalEarned > 0 ? `+${totalEarned} earned` : 'Start earning!'}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-ink">{stat.value}</p>
                <p className="text-xs text-ink-muted">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="font-heading text-lg font-semibold text-ink mb-4">Recent Activity</h2>
          {recentTx.length === 0 ? (
            <p className="text-sm text-ink-muted py-6 text-center">No transactions yet — enroll in a course or upload one!</p>
          ) : (
            <div className="space-y-3">
              {recentTx.map((tx, i) => (
                <div key={tx.id || i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      tx.type === 'earn' ? 'bg-earn-soft text-earn' : 'bg-danger-soft text-danger'
                    }`}>
                      {tx.type === 'earn' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                    <p className="text-sm text-ink truncate max-w-[200px]">{tx.description}</p>
                  </div>
                  <span className={`font-heading text-sm font-semibold ${
                    tx.type === 'earn' ? 'text-earn' : 'text-danger'
                  }`}>
                    {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Radar */}
        <div className="card">
          <h2 className="font-heading text-lg font-semibold text-ink mb-4">Skill Snapshot</h2>
          {radarData.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-ink-muted mb-2">No skills added yet</p>
              <Link to="/app/skills" className="text-brand text-sm font-medium hover:underline">+ Add your skills</Link>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e4e0" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 12, fill: '#3a3a3a' }} />
                  <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
