import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  const projectId = project._id || encodeURIComponent(project.title);
  
  return (
  <Link to={`/project/${projectId}`} className="group block h-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass overflow-hidden rounded-2xl hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all h-full flex flex-col"
    >
      <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-purple-900/40 dark:to-cyan-900/40">
            <span className="text-gray-500 dark:text-gray-400 text-lg font-bold opacity-50">Project</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack?.slice(0, 3).map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-full text-xs font-medium text-primary-700 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-100 dark:bg-white/10 p-2 rounded-full hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-500/20 dark:hover:text-primary-400 text-gray-600 dark:text-gray-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-100 dark:bg-white/10 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </Link>
  );
};

export default ProjectCard;