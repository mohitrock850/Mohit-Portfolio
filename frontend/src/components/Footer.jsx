import { personalInfo } from '../data/initialData';
import { FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Mohit. Built with React & Node.js.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><FiGithub /></a>
          <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><FiLinkedin /></a>
          <a href={personalInfo.links.website} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><FiExternalLink /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;