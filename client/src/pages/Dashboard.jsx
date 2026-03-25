import { Link } from 'react-router-dom';
import { BookOpen, Award, Layers, Coins, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { useCredits } from '../hooks/useCredits';
import Sidebar from '../components/shared/Sidebar';

const mockSkills = [
  { name: 'Python', score: 85 },
  { name: 'React', score: 65 },
  { name: 'ML', score: 35 },
  { name: 'SQL', score: 80 },
  { name: 'Design', score: 55 },
];

const enrolledCourses = [
  { id: '2', title: 'React from Zero to Hero', progress: 65 },
  { id: '3', title: 'SQL Mastery: Queries to Optimization', progress: 30 },
  { id: '4', title: 'ML Fundamentals with Scikit-learn', progress: 10 },
];

export default function Dashboard() {
  const { profile } = useAuth();
  const { balance, transactions } = useCredits();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const stats = [
    { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: 'text-brand bg-brand-soft' },
    { label: 'Courses Created', value: '1', icon: Award, color: 'text-earn bg-earn-soft' },
    { label: 'Skills Added', value: '5', icon: Layers, color: 'text-warn bg-warn-soft' },
    { label: 'Credits Earned', value: '270', icon: Coins, color: 'text-brand bg-brand-soft' },
  ];

  const recentTx = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      <main className="md:ml-14 lg:ml-60 pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Greeting */}
          <h1 className="font-heading text-2xl font-semibold text-ink mb-6">
            {greeting}, {profile?.name || 'there'} 👋
          </h1>

          {/* Credit Balance Card */}
          <div className="bg-gradient-to-r from-brand to-blue-700 rounded-card p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 mb-1">Credit Balance</p>
                <p className="font-heading text-4xl font-bold">{balance}</p>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-3 py-1.5 text-sm">
                <TrendingUp size={14} />
                +12 this week
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
              <div className="space-y-3">
                {recentTx.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between">
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
            </div>

            {/* Skills Radar */}
            <div className="card">
              <h2 className="font-heading text-lg font-semibold text-ink mb-4">Skill Snapshot</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={mockSkills}>
                    <PolarGrid stroke="#e5e4e0" />
                    <PolarAngleAxis dataKey="name" tick={{ fontSize: 12, fill: '#3a3a3a' }} />
                    <Radar
                      dataKey="score"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {enrolledCourses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`} className="card group">
                  <h3 className="font-heading text-sm font-semibold text-ink mb-3 group-hover:text-brand transition-colors">
                    {course.title}
                  </h3>
                  <div className="w-full bg-surface-alt rounded-full h-2 mb-2">
                    <div
                      className="bg-brand rounded-full h-2 transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-ink-muted">{course.progress}% complete</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
