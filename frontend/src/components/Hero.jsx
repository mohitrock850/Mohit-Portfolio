import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';
import { personalInfo } from '../data/initialData';
import { Typewriter } from 'react-simple-typewriter';
import { getResume } from '../api/adminApi';
import { API_BASE_URL } from '../api/api';

const Hero = () => {
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    getResume()
      .then(() => setHasResume(true))
      .catch(() => setHasResume(false));
  }, []);

  return (
  <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
    {/* Particle-like background gradient mesh */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(56,189,248,0.08),transparent_50%)]" />

    <div className="max-w-4xl text-center z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-500 dark:text-gray-400 mb-2"
      >
        Hello, I'm
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-6xl md:text-7xl font-bold gradient-text mb-6"
      >
        {personalInfo.name}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 h-12"
      >
        <Typewriter
          words={['AI/ML Engineer', 'Full-Stack Developer', 'Agent Builder', 'Hackathon Leader']}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex flex-wrap justify-center gap-3"
      >
        <div className="glass px-4 py-2 text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Holder of 30+ Patents
        </div>
        <div className="glass px-4 py-2 text-sm">
          Smart India Hackathon 2024 Team Leader
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <a
          href="#projects"
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
        >
          View My Work
        </a>
          {hasResume ? (
            <a
              href={`${API_BASE_URL}/resume/download`}
              download
              className="border border-gray-400 dark:border-white/20 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition backdrop-blur-sm"
            >
              Download Resume
            </a>
          ) : (
            <span className="border border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600 px-8 py-3 rounded-full cursor-not-allowed text-sm">
              Resume Coming Soon
            </span>
          )}
      </motion.div>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 flex justify-center space-x-6 text-gray-500 dark:text-gray-400"
      >
        <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-transform hover:scale-110"><FiLinkedin size={22} /></a>
        <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-transform hover:scale-110"><FiGithub size={22} /></a>
        <a href={personalInfo.links.website} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-transform hover:scale-110"><FiExternalLink size={22} /></a>
      </motion.div>
      </div>
    </section>
  );
};

export default Hero;