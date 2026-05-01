import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'about', id: 'about' },
  { name: 'experience', id: 'experience' },
  { name: 'projects', id: 'featured-projects' },
  { name: 'skills', id: 'skills' },
  { name: 'contact', id: 'contact' }
];

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    // Small delay lets the mobile menu finish closing before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-surface/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold gradient-text">Mohit.</Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(item => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="capitalize text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 dark:text-gray-200">
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-surface/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/5">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(item => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="block capitalize text-gray-700 dark:text-gray-300 font-medium py-2 active:text-primary-500"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;