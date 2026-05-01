import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SecondaryProjects = ({ projects, loading }) => {
  if (loading) {
    return <div className="py-10 text-center text-gray-400">Loading...</div>;
  }
  if (projects.length === 0) return null;

  return (
    <section id="secondary-projects" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text">
        More Projects
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-5 rounded-2xl hover:border-primary-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                {project.description || 'No description available.'}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.stack?.slice(0, 3).map(tech => (
                  <span key={tech} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiExternalLink size={16} />
                </a>
              ) : (
                <Link to={`/project/${project._id}`} className="text-gray-400 hover:text-white">
                  <FiExternalLink size={16} />
                </Link>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiGithub size={16} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SecondaryProjects;