import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ProjectCard from './ProjectCard';

const categories = ['All', 'AI & Agents', 'Full-Stack', 'Data Science', 'Automation'];

const AllProjects = ({ projects, loading }) => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <AnimatedSection id="all-projects" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
        All Projects
      </h2>
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              filter === cat
                ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass h-64 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </AnimatedSection>
  );
};

export default AllProjects;