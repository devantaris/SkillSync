import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink text-white flex-col justify-between p-12">
        <div>
          <p className="font-heading text-xl font-bold">
            Skill<span className="text-blue-400">Sync</span>
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-heading text-4xl font-semibold italic leading-snug">
            "Your knowledge<br />is currency."
          </p>
          <div className="flex gap-8 mt-8">
            {[
              { num: '1,200+', label: 'Active Learners' },
              { num: '340+', label: 'Courses' },
              { num: '2,400+', label: 'Credits Traded' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-white">{s.num}</p>
                <p className="text-sm text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-card p-4 border border-white/10">
          <p className="text-sm font-medium text-white flex items-center gap-2">
            🎁 <span>100 free credits on signup</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Start learning immediately with no cost</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <RegisterForm />
      </div>
    </div>
  );
}
