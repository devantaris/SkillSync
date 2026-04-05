import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import CourseGrid from '../components/courses/CourseGrid';
import { api } from '../lib/api';

export default function Courses() {
  const location = useLocation();
  const isPublicRoute = location.pathname === '/courses';
  const [allCourses, setAllCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => setAllCourses(res.data?.courses || []))
      .catch((err) => console.error('Failed to fetch courses:', err))
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => [...new Set(allCourses.flatMap((c) => c.skill_tags || []))].sort(), [allCourses]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const filteredCourses = useMemo(() => {
    let courses = allCourses;
    if (search.trim()) {
      const q = search.toLowerCase();
      courses = courses.filter((c) =>
        c.title?.toLowerCase().includes(q) || c.creator?.toLowerCase().includes(q) || (c.skill_tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length > 0) {
      courses = courses.filter((c) => (c.skill_tags || []).some((t) => selectedTags.includes(t)));
    }
    switch (sortBy) {
      case 'Most Popular': return [...courses].sort((a, b) => (b.enrolled_count || 0) - (a.enrolled_count || 0));
      case 'Price Low-High': return [...courses].sort((a, b) => (a.credit_cost || 0) - (b.credit_cost || 0));
      default: return courses;
    }
  }, [allCourses, search, selectedTags, sortBy]);

  const content = (
    <div className={isPublicRoute ? "max-w-6xl mx-auto px-4 sm:px-6 py-8" : "max-w-6xl mx-auto px-4 sm:px-6 py-6"}>
      {isPublicRoute && (
        <>
          <h1 className="font-heading text-3xl font-bold text-ink mb-2">Course Marketplace</h1>
          <p className="text-ink-muted mb-8">Browse peer-created courses. Enroll with credits.</p>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-9" placeholder="Search courses, skills, or creators..." />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-ink-muted" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input w-auto">
            <option>Newest</option>
            <option>Most Popular</option>
            <option>Price Low-High</option>
          </select>
        </div>
      </div>

      {!loading && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button key={tag} onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                selectedTags.includes(tag) ? 'bg-brand text-white border-brand' : 'bg-surface-card border-border text-ink-muted hover:bg-surface-alt'
              }`}
            >{tag}</button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand animate-spin mb-3" />
          <p className="text-sm text-ink-muted">Loading courses...</p>
        </div>
      ) : filteredCourses.length > 0 ? (
        <CourseGrid courses={filteredCourses} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-medium text-ink mb-1">No courses found</p>
          <p className="text-ink-muted text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );

  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        {content}
      </div>
    );
  }

  return content;
}
