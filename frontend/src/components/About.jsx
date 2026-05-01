import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, Trophy, Lightbulb, Blocks, Hash } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedSection from './AnimatedSection';

const facts = [
  { icon: GraduationCap, label: 'B.Tech in AI & ML', value: 'NIMS University', color: 'text-blue-400' },
  { icon: ShieldCheck, label: 'CGPA', value: '9.30 / 10', color: 'text-emerald-400' },
  { icon: Lightbulb, label: 'Patents', value: '30+', color: 'text-yellow-400' },
  { icon: Trophy, label: 'Smart India Hackathon 2024', value: 'Team Leader', color: 'text-orange-400' },
  { icon: Hash, label: 'Data Science Hackathon', value: 'Rank 930 / 2000', color: 'text-purple-400' },
  { icon: Blocks, label: 'Production‑Grade Products', value: '5+ Delivered', color: 'text-pink-400' },
];

const About = () => (
  // 1. Add a native <section> wrapper with the ID here
  <section id="about">
    {/* 2. Remove the ID from AnimatedSection */}
    <AnimatedSection className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
        About Me
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {facts.map((item, i) => {
          const Icon = item.icon;
          return (
            <GlassCard key={i} className="flex flex-col items-center text-center p-6">
              <Icon className={`${item.color} w-8 h-8 mb-3`} />
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</span>
            </GlassCard>
          );
        })}
      </div>
    </AnimatedSection>
  </section>
);

export default About;