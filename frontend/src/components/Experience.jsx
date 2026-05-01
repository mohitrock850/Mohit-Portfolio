import { motion } from 'framer-motion';
import { Briefcase, CalendarDays, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const experiences = [
  {
    role: 'AI Engineer',
    company: 'Xelytics',
    period: 'Oct 2025 – Present',
    location: 'Remote',
    highlights: [
      'Built zero‑configuration AI analytics platform',
      'Engineered statistical reasoning engine with p‑value validation',
      'Enterprise‑ready encrypted data handling & audit trails',
    ],
  },
  {
    role: 'AI Intern',
    company: 'Sweet Design Hub',
    period: 'Feb 2025 – Present',
    location: 'Remote',
    highlights: [
      'Developed AI content generation pipelines',
      'Automated repetitive design tasks using NLP',
      'Improved team productivity by reducing manual effort',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'SunTec India',
    period: 'Jun 2025 – Oct 2025',
    location: 'New Delhi',
    highlights: [
      'Deployed scalable GenAI backend services with FastAPI',
      'Managed Docker containerization & GitHub CI/CD',
      'Created internal tooling capabilities with proprietary LLMs',
    ],
  },
];

const Experience = () => (
  /* ADDED <section> WRAPPER HERE */
  <section id="experience">
    <AnimatedSection className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
        Work Experience
      </h2>

      <div className="relative">
        {/* Central continuous line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative pl-16 md:pl-24 pr-4 md:pr-0 group"
            >
              {/* Glowing Dot on the timeline */}
              <div className="absolute left-6 md:left-8 top-6 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-500 z-10 shadow-[0_0_15px_rgba(14,165,233,0.8)] group-hover:scale-125 transition-transform duration-300" />

              {/* Connecting line to the card */}
              <div className="absolute left-6 md:left-8 top-6 w-10 md:w-16 h-0.5 bg-gradient-to-r from-primary-500 to-transparent opacity-50 z-0 hidden md:block" />

              {/* Glassmorphism Card */}
              <div className="glass p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:-translate-y-1">
                
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary-500 shrink-0" />
                      {exp.role}
                    </h3>
                    <div className="text-lg font-medium text-purple-600 dark:text-purple-400 mt-1">
                      {exp.company}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-semibold bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                      <CalendarDays size={14} className="text-primary-500" />
                      {exp.period}
                    </div>
                    <span className="text-xs text-gray-400 font-medium px-2">{exp.location}</span>
                  </div>
                </div>

                <ul className="relative z-10 space-y-3 mt-6">
                  {exp.highlights.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <ChevronRight className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  </section>
);

export default Experience;