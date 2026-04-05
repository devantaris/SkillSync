import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Users, Clock, BarChart2, CalendarDays, CheckCircle, ChevronDown, ChevronUp, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import AIScoreBadge from '../components/courses/AIScoreBadge';
import { useCredits } from '../hooks/useCredits';
import { useAuth } from '../hooks/useAuth';
import { api } from '../lib/api';

export default function CourseDetail() {
  const { id } = useParams();
  const location = useLocation();
  const isInApp = location.pathname.startsWith('/app');
  const { isAuthenticated } = useAuth();
  const { deductCredits, fetchBalance } = useCredits();
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [openSection, setOpenSection] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/courses/${id}`)
      .then(res => setCourse(res.data?.course || null))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [id]);

  const backLink = isInApp ? '/app/courses' : '/courses';

  if (loading) {
    const loader = (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-10 h-10 text-brand animate-spin mb-3" />
        <p className="text-sm text-ink-muted">Loading course...</p>
      </div>
    );
    return isInApp ? loader : <div className="min-h-screen bg-surface"><Navbar />{loader}</div>;
  }

  if (!course) {
    const notFound = (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-ink mb-2">Course not found</h1>
        <Link to={backLink} className="text-brand hover:underline">← Back to courses</Link>
      </div>
    );
    return isInApp ? notFound : <div className="min-h-screen bg-surface"><Navbar />{notFound}</div>;
  }

  const handleEnroll = async () => {
    if (enrolled || enrolling) return;
    setEnrolling(true);
    try {
      await api.post(`/courses/${course.id}/enroll`);
      setEnrolled(true);
      fetchBalance();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const creatorEarning = Math.floor(course.credit_cost * 0.85);
  const platformFee = course.credit_cost - creatorEarning;
  const curriculum = course.curriculum || [];
  const learnings = course.learnings || [];

  const content = (
    <>
      <div className="bg-ink text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link to={backLink} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4">
            <ArrowLeft size={16} /> Back to courses
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                {(course.creator || 'U')[0]}
              </div>
              <span className="text-sm text-gray-300">{course.creator || 'Unknown'}</span>
            </div>
            {course.ai_score && <AIScoreBadge score={course.ai_score} />}
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Users size={14} /> {course.enrolled_count || 0} enrolled
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(course.skill_tags || []).map((tag) => (<span key={tag} className="tag-blue">{tag}</span>))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-xl font-semibold text-ink mb-3">About this course</h2>
              <p className="text-ink-soft leading-relaxed">{course.description || course.short_description}</p>
            </div>
            {learnings.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-ink mb-4">What you'll learn</h2>
                <div className="space-y-2">
                  {learnings.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-earn mt-0.5 shrink-0" />
                      <span className="text-sm text-ink-soft">{typeof item === 'string' ? item : item.text || ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {curriculum.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-ink mb-4">Curriculum</h2>
                <div className="space-y-2">
                  {curriculum.map((section, i) => (
                    <div key={i} className="border border-border rounded-card overflow-hidden">
                      <button onClick={() => setOpenSection(openSection === i ? -1 : i)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-alt transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-ink-muted">Section {i + 1}</span>
                          <span className="text-sm font-medium text-ink">{section.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-ink-muted">{section.lessons} lessons</span>
                          {openSection === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>
                      {openSection === i && (
                        <div className="px-4 py-3 bg-surface-alt border-t border-border">
                          {Array.from({ length: section.lessons || 0 }, (_, j) => (
                            <div key={j} className="flex items-center gap-2 py-1.5 text-sm text-ink-soft">
                              <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-xs text-ink-muted">{j + 1}</div>
                              Lesson {j + 1}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="card sticky top-20 shadow-card-lg">
              <p className="font-heading text-3xl font-bold text-ink mb-1">{course.credit_cost} credits</p>
              <p className="text-sm text-ink-muted mb-6">One-time enrollment</p>
              {enrolled ? (
                <div className="bg-earn-soft text-earn text-center py-3 rounded-btn font-medium text-sm mb-4">✓ Enrolled Successfully</div>
              ) : (
                <button onClick={handleEnroll} disabled={!isAuthenticated || enrolling} className="btn-primary w-full mb-4">
                  {enrolling ? 'Enrolling...' : isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
                </button>
              )}
              <div className="text-xs text-ink-muted space-y-1 mb-4 border-t border-border pt-4">
                <p>Creator earns <span className="font-semibold text-earn">{creatorEarning}</span> credits</p>
                <p>Platform fee: <span className="font-semibold">{platformFee}</span> credits (15%)</p>
              </div>
              <div className="space-y-3 border-t border-border pt-4">
                {[
                  { icon: Clock, label: 'Duration', value: course.duration || '—' },
                  { icon: BarChart2, label: 'Level', value: course.level || '—' },
                  { icon: CalendarDays, label: 'Updated', value: course.updated_at ? new Date(course.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink-muted"><item.icon size={14} /> {item.label}</span>
                    <span className="font-medium text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return isInApp ? content : <div className="min-h-screen bg-surface"><Navbar />{content}</div>;
}
