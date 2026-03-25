import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function SkillRadarChart({ skills }) {
  const data = skills.map((s) => ({
    name: s.name,
    score: s.score,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#e5e4e0" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: '#3a3a3a', fontSize: 13, fontFamily: 'DM Sans' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#777' }}
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
          <Radar
            name="Skill Score"
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.6}
            animationDuration={800}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
