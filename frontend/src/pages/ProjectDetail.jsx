import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import api from '../api/api';

import { projects as localProjects } from '../data/initialData';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        // Fallback to local data if backend is unreachable or project is not on backend
        const localFallback = localProjects.find(p => p._id === id || encodeURIComponent(p.title) === id);
        if (localFallback) {
          setProject(localFallback);
        } else {
          setError('Project not found.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || 'Project not found'}</p>
        <Link to="/" className="text-primary-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-4"
    >
      <Helmet>
        <title>{project.title} | Mohit Portfolio</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <Link
          to="/#projects"
          className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors mb-8 font-medium"
        >
          <FiArrowLeft className="mr-2" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative group">
            <div className="glass overflow-hidden rounded-3xl p-2 bg-white/50 dark:bg-white/5">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-2xl opacity-50">No Image</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons directly under image */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-1"
                >
                  <FiExternalLink size={20} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex justify-center items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <FiGithub size={20} /> GitHub Repo
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack?.map((tech) => (
                <span key={tech} className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                  {tech}
                </span>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4 gradient-text inline-block">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-8 text-lg">
                {project.description}
              </p>
              
              {project.detailedDescription && (
                <>
                  <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-8"></div>
                  <h2 className="text-2xl font-bold mb-4 gradient-text inline-block">Technical Details</h2>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                    {project.detailedDescription}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;