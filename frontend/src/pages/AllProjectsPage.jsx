import { useState, useEffect } from 'react';
import api from '../api/api';
import { projects as localProjects } from '../data/initialData';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const categories = ['All', 'AI & Agents', 'Full-Stack', 'Data Science', 'Automation', 'Machine Learning'];

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data.length > 0) {
          setProjects(res.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend not reachable, using local data');
      }
      setProjects(localProjects);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <AnimatedSection id="all-projects" className="py-12 px-4 max-w-7xl mx-auto flex-grow w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
          All Projects
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Explore my complete portfolio of work, from autonomous AI agents and intelligent systems to scalable full-stack platforms.
        </p>
        
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] border-transparent'
                  : 'bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass h-80 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="h-full flex"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatedSection>
      <Footer />
    </div>
  );
};

export default AllProjectsPage;
