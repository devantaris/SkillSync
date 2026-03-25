import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const levelColors = {
  Beginner: '#d97706',
  Intermediate: '#2563eb',
  Advanced: '#16a34a',
  Expert: '#7c3aed',
};

export default function SkillBarChart({ skills }) {
  const data = skills.map((s) => ({
    name: s.name,
    score: s.score,
    level: s.level,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e4e0" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#777' }} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 13, fill: '#3a3a3a', fontFamily: 'DM Sans' }}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e4e0',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'DM Sans',
            }}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={levelColors[entry.level] || '#2563eb'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
