import { Link } from 'react-router-dom';
import {
  Wallet, ShieldCheck, BarChart2, Map, FolderKanban, FileText,
  ArrowRight, Sparkles, ChevronRight,
} from 'lucide-react';
import Navbar from '../components/shared/Navbar';

const features = [
  { icon: Wallet, title: 'Credit Wallet', desc: 'Earn, spend, and track credits across the platform with a full transaction ledger.' },
  { icon: ShieldCheck, title: 'AI Content Validator', desc: 'Every uploaded course is reviewed by AI for quality, completeness, and originality.' },
  { icon: BarChart2, title: 'Skills Dashboard', desc: 'Visualize your skill profile with radar charts and track your growth over time.' },
  { icon: Map, title: 'Roadmap Builder', desc: 'Get AI-curated learning paths with structured milestones tailored to your goals.' },
  { icon: FolderKanban, title: 'Project Walkthroughs', desc: 'Build real projects guided by community-created step-by-step walkthroughs.' },
  { icon: FileText, title: 'Resume Builder', desc: 'Auto-generate a portfolio from your completed courses and verified skills.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 bg-brand-soft text-brand px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <Sparkles size={14} />
          Peer-Powered Skill Economy
        </div>

        <h1 className="font-heading font-bold text-ink tracking-tight leading-tight mb-6"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
          The{' '}
          <em className="italic text-brand not-italic font-heading" style={{ fontStyle: 'italic' }}>
            teach-to-earn,
          </em>{' '}
          learn-to-grow platform
        </h1>

        <p className="text-ink-soft max-w-xl mx-auto mb-10" style={{ fontSize: '17px' }}>
          Share what you know. Earn credits. Spend them to level up.
          No money needed — just knowledge.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/register" className="btn-primary text-base px-8 py-3 rounded-btn flex items-center gap-2">
            Start Learning Free <ArrowRight size={18} />
          </Link>
          <a href="#how-it-works" className="btn-ghost text-base px-6 py-3">
            See How It Works
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-12 mt-14 flex-wrap">
          {[
            { num: '2,400+', label: 'Credits Transacted' },
            { num: '340+', label: 'Courses Live' },
            { num: '1,200+', label: 'Learners' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-ink">{stat.num}</p>
              <p className="text-sm text-ink-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-surface-alt py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-ink text-center mb-4">How It Works</h2>
          <p className="text-center text-ink-muted mb-14 max-w-xl mx-auto">
            Three simple steps to start your learning journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign Up & Get Credits', desc: 'Create your free account and receive 100 starter credits to begin your journey.' },
              { step: '02', title: 'Browse & Enroll', desc: 'Discover courses across Python, React, ML, System Design, and more. Enroll using credits.' },
              { step: '03', title: 'Teach & Earn', desc: 'Upload your own courses. Every enrollment earns you credits. Knowledge is your currency.' },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <span className="font-heading text-5xl font-bold text-brand/15">{item.step}</span>
                <h3 className="font-heading text-lg font-semibold text-ink mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-ink text-center mb-4">Everything You Need</h2>
          <p className="text-center text-ink-muted mb-14 max-w-xl mx-auto">
            Built for learners and teachers who value their knowledge
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card">
                <div className="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center mb-3">
                  <f.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-heading text-base font-semibold text-ink mb-1">{f.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Economy */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-ink mb-4">The Credit Economy</h2>
          <p className="text-ink-muted mb-12 max-w-lg mx-auto">
            Knowledge flows both ways. Our credit system ensures fair exchange.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="card text-center px-8 py-6 flex-1 max-w-xs">
              <div className="w-12 h-12 rounded-full bg-earn-soft flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-heading font-semibold text-ink">Teacher</h3>
              <p className="text-sm text-ink-muted mt-1">Creates courses, earns credits per enrollment</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-ink-muted">
              <ChevronRight size={24} className="rotate-0 md:rotate-0 text-brand" />
              <div className="text-xs text-center space-y-1">
                <p className="tag-blue">AI validates</p>
                <p className="tag-green">Credits flow</p>
              </div>
              <ChevronRight size={24} className="rotate-180 md:rotate-180 text-brand" />
            </div>

            <div className="card text-center px-8 py-6 flex-1 max-w-xs">
              <div className="w-12 h-12 rounded-full bg-brand-soft flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👩‍🎓</span>
              </div>
              <h3 className="font-heading font-semibold text-ink">Learner</h3>
              <p className="text-sm text-ink-muted mt-1">Spends credits to learn new skills</p>
            </div>
          </div>

          <p className="text-xs text-ink-muted mt-8">Platform takes a 15% fee per transaction to sustain operations</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">
        <p className="font-heading text-lg font-bold text-ink">
          Skill<span className="text-brand">Sync</span>
        </p>
        <p className="text-sm text-ink-muted mt-2">
          © {new Date().getFullYear()} SkillSync. The peer-powered skill economy.
        </p>
      </footer>
    </div>
  );
}
