import { useState, useEffect } from 'react';
import { Check, Plus, X, Loader2 } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';

const steps = ['Basic Info', 'Content', 'Pricing', 'AI Review'];

export default function UploadCourse() {
  const [currentStep, setCurrentStep] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  // Step 1 state
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [skillTags, setSkillTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');

  // Step 2 state
  const [videoUrl, setVideoUrl] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [curriculum, setCurriculum] = useState([{ title: '' }]);
  const [learnings, setLearnings] = useState(['']);

  // Step 3 state
  const [creditPrice, setCreditPrice] = useState(50);

  // Step 4 mock results
  const mockReview = {
    overallScore: 78,
    completeness: 82,
    structure: 75,
    originality: 90,
    feedback: [
      { type: 'strong', text: 'Clear learning objectives and structured curriculum' },
      { type: 'improve', text: 'Add more practical examples in Section 2' },
      { type: 'improve', text: 'Description could be more specific' },
    ],
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!skillTags.includes(tagInput.trim())) {
        setSkillTags([...skillTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setSkillTags(skillTags.filter((t) => t !== tag));
  };

  const addCurriculumSection = () => {
    setCurriculum([...curriculum, { title: '' }]);
  };

  const removeCurriculumSection = (index) => {
    setCurriculum(curriculum.filter((_, i) => i !== index));
  };

  const updateCurriculumSection = (index, value) => {
    const updated = [...curriculum];
    updated[index] = { title: value };
    setCurriculum(updated);
  };

  const addLearning = () => {
    setLearnings([...learnings, '']);
  };

  const removeLearning = (index) => {
    setLearnings(learnings.filter((_, i) => i !== index));
  };

  const updateLearning = (index, value) => {
    const updated = [...learnings];
    updated[index] = value;
    setLearnings(updated);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0: return title.trim() && shortDesc.trim() && skillTags.length > 0;
      case 1: return fullDescription.trim() && curriculum.some((s) => s.title.trim());
      case 2: return creditPrice >= 10;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      alert('Please fill in all required fields');
      return;
    }
    if (currentStep === 2) {
      setCurrentStep(3);
      setReviewLoading(true);
      setTimeout(() => {
        setReviewLoading(false);
        setReviewDone(true);
      }, 2000);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isApproved = mockReview.overallScore >= 70;
  const creatorEarning = Math.floor(creditPrice * 0.85);
  const platformFee = creditPrice - creatorEarning;

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      <main className="md:ml-14 lg:ml-60 pb-20 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-heading text-2xl font-semibold text-ink mb-8">Upload Course</h1>

          {/* Step Indicator */}
          <div className="flex items-center mb-10">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors
                      ${i < currentStep
                        ? 'bg-brand border-brand text-white'
                        : i === currentStep
                        ? 'border-brand text-brand bg-brand-soft'
                        : 'border-border text-ink-muted'
                      }`}
                  >
                    {i < currentStep ? <Check size={16} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline ${
                    i <= currentStep ? 'text-ink' : 'text-ink-muted'
                  }`}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 ${
                    i < currentStep ? 'bg-brand' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="card space-y-5">
              <h2 className="font-heading text-lg font-semibold text-ink">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Course Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  placeholder="e.g., Python for Data Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">
                  Short Description *
                  <span className="text-ink-muted font-normal ml-1">({shortDesc.length}/200)</span>
                </label>
                <textarea
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value.slice(0, 200))}
                  className="input min-h-[80px] resize-none"
                  placeholder="Brief description of what learners will gain..."
                  maxLength={200}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Skill Tags *</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skillTags.map((tag) => (
                    <span key={tag} className="tag-blue flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:text-danger">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="input"
                  placeholder="Type a skill and press Enter..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Difficulty Level *</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`p-3 rounded-card text-sm font-medium border-2 transition-all ${
                        difficulty === level
                          ? 'border-brand bg-brand-soft text-brand'
                          : 'border-border text-ink-muted hover:border-ink-muted'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content */}
          {currentStep === 1 && (
            <div className="card space-y-5">
              <h2 className="font-heading text-lg font-semibold text-ink">Course Content</h2>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Video URL (YouTube/Loom)</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="input"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Full Description *</label>
                <textarea
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="input min-h-[120px] resize-y"
                  placeholder="Detailed description of the course..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-ink">Curriculum Sections *</label>
                  <button onClick={addCurriculumSection} className="text-brand text-sm font-medium flex items-center gap-1 hover:underline">
                    <Plus size={14} /> Add Section
                  </button>
                </div>
                <div className="space-y-2">
                  {curriculum.map((section, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-ink-muted w-6">{i + 1}.</span>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateCurriculumSection(i, e.target.value)}
                        className="input flex-1"
                        placeholder={`Section ${i + 1} title`}
                      />
                      {curriculum.length > 1 && (
                        <button onClick={() => removeCurriculumSection(i)} className="text-ink-muted hover:text-danger p-1">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-ink">What Learners Will Gain</label>
                  <button onClick={addLearning} className="text-brand text-sm font-medium flex items-center gap-1 hover:underline">
                    <Plus size={14} /> Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {learnings.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check size={14} className="text-earn shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateLearning(i, e.target.value)}
                        className="input flex-1"
                        placeholder="Learning outcome..."
                      />
                      {learnings.length > 1 && (
                        <button onClick={() => removeLearning(i)} className="text-ink-muted hover:text-danger p-1">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card space-y-6">
                <h2 className="font-heading text-lg font-semibold text-ink">Set Your Price</h2>

                <div>
                  <label className="block text-sm font-medium text-ink mb-3">
                    Credit Price: <span className="font-heading text-2xl text-brand">{creditPrice}</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={10}
                    value={creditPrice}
                    onChange={(e) => setCreditPrice(Number(e.target.value))}
                    className="w-full accent-brand"
                  />
                  <div className="flex justify-between text-xs text-ink-muted mt-1">
                    <span>10 credits</span>
                    <span>500 credits</span>
                  </div>
                </div>
              </div>

              <div className="card bg-surface-alt">
                <h3 className="font-heading text-lg font-semibold text-ink mb-4">Earnings Preview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ink-muted">Price per enrollment</span>
                    <span className="font-heading font-bold text-ink text-lg">{creditPrice} credits</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-earn font-medium">Your earnings (85%)</span>
                      <span className="font-heading font-bold text-earn text-lg">{creatorEarning} credits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-ink-muted">Platform fee (15%)</span>
                      <span className="font-heading font-semibold text-ink-muted">{platformFee} credits</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Review */}
          {currentStep === 3 && (
            <div className="card">
              {reviewLoading && (
                <div className="text-center py-16">
                  <Loader2 className="w-12 h-12 text-brand animate-spin mx-auto mb-4" />
                  <h2 className="font-heading text-xl font-semibold text-ink mb-2">Submitting for AI Review...</h2>
                  <p className="text-sm text-ink-muted">Our AI is analyzing your course content</p>
                </div>
              )}

              {reviewDone && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-heading text-xl font-semibold text-ink mb-6">AI Review Results</h2>

                    {/* Score Ring */}
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" stroke="#e5e4e0" strokeWidth="8" fill="none" />
                        <circle
                          cx="60" cy="60" r="50"
                          stroke="#2563eb"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 50}`}
                          strokeDashoffset={`${2 * Math.PI * 50 * (1 - mockReview.overallScore / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <span className="font-heading text-3xl font-bold text-ink">{mockReview.overallScore}</span>
                          <span className="text-sm text-ink-muted">/100</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-ink-muted">Overall AI Score</p>
                  </div>

                  {/* Quality Breakdown */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-base font-semibold text-ink">Quality Breakdown</h3>
                    {[
                      { label: 'Completeness', score: mockReview.completeness },
                      { label: 'Structure', score: mockReview.structure },
                      { label: 'Originality', score: mockReview.originality },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-ink-muted">{item.label}</span>
                          <span className="font-medium text-ink">{item.score}/100</span>
                        </div>
                        <div className="w-full bg-surface-alt rounded-full h-2">
                          <div
                            className={`rounded-full h-2 transition-all duration-700 ${
                              item.score >= 80 ? 'bg-earn' : item.score >= 60 ? 'bg-warn' : 'bg-danger'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feedback */}
                  <div className="bg-surface-alt rounded-card p-4 space-y-2">
                    <h3 className="font-heading text-base font-semibold text-ink mb-2">AI Feedback</h3>
                    {mockReview.feedback.map((f, i) => (
                      <p key={i} className="text-sm text-ink-soft">
                        {f.type === 'strong' ? '✅' : '⚠️'}{' '}
                        <span className="font-medium">{f.type === 'strong' ? 'Strong:' : 'Improve:'}</span>{' '}
                        {f.text}
                      </p>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    {isApproved ? (
                      <>
                        <span className="tag-green text-sm px-4 py-1.5 mb-4 inline-block">
                          ✓ Approved — Ready to Publish
                        </span>
                        <br />
                        <button
                          onClick={() => alert('Course published! (Mock)')}
                          className="btn-primary text-base px-8 py-3 mt-3"
                        >
                          Publish Course
                        </button>
                      </>
                    ) : (
                      <span className="tag-amber text-sm px-4 py-1.5">
                        Needs Revision — Score below 70
                      </span>
                    )}
                    <p className="text-xs text-ink-muted mt-4">
                      Note: On real implementation, this calls POST /api/agents/validate
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-40"
              >
                Back
              </button>
              <button onClick={handleNext} className="btn-primary">
                {currentStep === 2 ? 'Submit for AI Review' : 'Next'}
              </button>
            </div>
          )}

          {currentStep === 3 && reviewDone && (
            <div className="flex justify-start mt-6">
              <button onClick={handleBack} className="btn-secondary">
                ← Back to Pricing
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
