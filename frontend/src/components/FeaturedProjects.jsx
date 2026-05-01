import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FeaturedProjects = ({ projects, loading }) => {
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        Loading featured projects...
      </div>
    );
  }

  if (!projects || projects.length === 0) return null;

  return (
    <section id="featured-projects" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
        Featured Projects
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
        Top 5 projects that define my work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => {
          const projectId = project._id || encodeURIComponent(project.title);
          return (
          <Link to={`/project/${projectId}`} key={project._id || idx} className="group block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass overflow-hidden rounded-3xl hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-all"
            >
              {/* Hero image container */}
              <div className="h-56 md:h-72 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-purple-900/40 dark:to-cyan-900/40">
                    <motion.div
                      className="text-3xl md:text-5xl font-bold gradient-text opacity-30 dark:opacity-40 px-4 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.title.split(' –')[0]}
                    </motion.div>
                  </div>
                )}

                {/* Overlay badge with project title */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-md border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl text-sm font-semibold max-w-[90%] truncate text-gray-900 dark:text-white shadow-sm">
                  {project.title}
                </div>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/90 dark:bg-black/60 backdrop-blur-md p-2.5 rounded-full hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-500/20 dark:hover:text-primary-400 text-gray-700 dark:text-white transition-colors shadow-sm"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/90 dark:bg-black/60 backdrop-blur-md p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white transition-colors shadow-sm"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Short description */}
              <div className="p-6 md:p-8">
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.stack?.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-full text-xs font-medium text-primary-700 dark:text-primary-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
          );
        })}
      </div>

      {/* View All Projects Button */}
      <div className="mt-16 flex justify-center">
        <Link 
          to="/projects"
          className="group relative px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full font-semibold text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <span className="relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            View All Projects
          </span>
          <div className="absolute inset-0 h-full w-0 bg-gray-50 dark:bg-gray-800 transition-all duration-300 ease-out group-hover:w-full z-0" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;