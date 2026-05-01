import { motion } from 'framer-motion';

const AnimatedSection = ({ children, className = '', delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export default AnimatedSection;