import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import CourseGrid from '../components/courses/CourseGrid';

const allCourses = [
  { id: '1', title: 'Python for Data Science', creator: 'Aryan Mehta', skill_tags: ['Python', 'Data Science'], credit_cost: 40, ai_score: 88, enrolled: 124, level: 'Beginner' },
  { id: '2', title: 'React from Zero to Hero', creator: 'Priya Sharma', skill_tags: ['React', 'JavaScript'], credit_cost: 60, ai_score: 92, enrolled: 87, level: 'Intermediate' },
  { id: '3', title: 'SQL Mastery: Queries to Optimization', creator: 'Rohan Das', skill_tags: ['SQL', 'Databases'], credit_cost: 35, ai_score: 79, enrolled: 56, level: 'Intermediate' },
  { id: '4', title: 'ML Fundamentals with Scikit-learn', creator: 'Sneha Iyer', skill_tags: ['Machine Learning', 'Python'], credit_cost: 75, ai_score: 85, enrolled: 203, level: 'Intermediate' },
  { id: '5', title: 'System Design for Interviews', creator: 'Karan Singh', skill_tags: ['System Design', 'Backend'], credit_cost: 90, ai_score: 94, enrolled: 312, level: 'Advanced' },
  { id: '6', title: 'Git & GitHub Complete Guide', creator: 'Diya Nair', skill_tags: ['Git', 'DevOps'], credit_cost: 20, ai_score: 72, enrolled: 445, level: 'Beginner' },
  { id: '7', title: 'FastAPI Backend Development', creator: 'Vikram Rao', skill_tags: ['Python', 'Backend'], credit_cost: 55, ai_score: 81, enrolled: 67, level: 'Intermediate' },
  { id: '8', title: 'Docker & Containers Fundamentals', creator: 'Ananya Bose', skill_tags: ['DevOps', 'Docker'], credit_cost: 45, ai_score: 68, enrolled: 39, level: 'Beginner' },
  { id: '9', title: 'Competitive Programming: DSA Patterns', creator: 'Rahul Joshi', skill_tags: ['DSA', 'C++'], credit_cost: 80, ai_score: 91, enrolled: 178, level: 'Advanced' },
];

const allTags = [...new Set(allCourses.flatMap((c) => c.skill_tags))].sort();

export default function Courses() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCourses = useMemo(() => {
    let courses = allCourses;

    if (search.trim()) {
      const q = search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.creator.toLowerCase().includes(q) ||
          c.skill_tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTags.length > 0) {
      courses = courses.filter((c) =>
        c.skill_tags.some((t) => selectedTags.includes(t))
      );
    }

    switch (sortBy) {
      case 'Most Popular':
        courses = [...courses].sort((a, b) => b.enrolled - a.enrolled);
        break;
      case 'Price Low-High':
        courses = [...courses].sort((a, b) => a.credit_cost - b.credit_cost);
        break;
      default:
        break;
    }

    return courses;
  }, [search, selectedTags, sortBy]);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-ink mb-2">Course Marketplace</h1>
        <p className="text-ink-muted mb-8">Browse peer-created courses. Enroll with credits.</p>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9"
              placeholder="Search courses, skills, or creators..."
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-ink-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-auto"
            >
              <option>Newest</option>
              <option>Most Popular</option>
              <option>Price Low-High</option>
            </select>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                selectedTags.includes(tag)
                  ? 'bg-brand text-white border-brand'
                  : 'bg-surface-card border-border text-ink-muted hover:bg-surface-alt'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredCourses.length > 0 ? (
          <CourseGrid courses={filteredCourses} />
        ) : (
          <div className="text-center py-16">
            <p className="text-ink-muted">No courses match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
