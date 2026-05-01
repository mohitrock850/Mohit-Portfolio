import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiPython, SiReact, SiNodedotjs, SiMongodb, SiDocker,
  SiPytorch, SiFastapi, SiTensorflow,
  SiNextdotjs, SiExpress, SiTailwindcss, SiPostgresql,
  SiVercel, SiNetlify, SiGithub,
  SiHuggingface, SiOpencv, SiStreamlit, SiGradio
} from 'react-icons/si';
import {
  Brain, Code2, Database, Cloud, Bot, BarChart3,
  Webhook, Workflow, TestTube, Server, Shield, MessageSquare,
  Eye, FileText, Globe, Layers, PenTool, Terminal, Activity
} from 'lucide-react';
import { FiCloud } from 'react-icons/fi';

/* ---------- skill name → safe icon component ---------- */
const skillIconMap = {
  // AI, LLMs & Agents
  'Agentic AI': Bot,
  'Large Language Models (LLMs)': Brain,
  'Multi-Agent Systems (CrewAI)': Bot,
  'LLM Tool Calling': Terminal,
  'Autonomous Agents': Bot,
  'Model Context Protocol (MCP)': Shield,
  'RAG': FileText,
  'LangChain': Brain,
  'LangGraph': Workflow,
  'Google ADK': Globe,

  // Backend & Frontend
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'FastAPI': SiFastapi,
  'Python': SiPython,
  'REST APIs': Webhook,
  'WebSockets': Activity,
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'MERN Stack': Layers,

  // Databases
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Vector Databases (FAISS, ChromaDB)': Database,
  'Neo4j (Cypher)': Database,

  // DevOps & Cloud
  'Docker': SiDocker,
  'Git/GitHub': SiGithub,
  'CI/CD': Workflow,
  'n8n': PenTool,
  'AWS (S3, EC2)': FiCloud,
  'Render': Server,
  'Vercel': SiVercel,
  'Netlify': SiNetlify,
  'LangSmith': TestTube,
  'PyTest': TestTube,
  'Jest': TestTube,

  // ML, NLP & Multimodal
  'Machine Learning': Brain,
  'Deep Learning': Brain,
  'NLP': MessageSquare,
  'Transformers': Brain,
  'LoRA/PEFT': PenTool,
  'Hugging Face': SiHuggingface,
  'YOLOv8': Eye,
  'OpenCV': SiOpencv,
  'STT/TTS Engines': Activity,
  'Streamlit': SiStreamlit,
  'Gradio': SiGradio,

  // Quantitative & Financial
  'TradingView Pine Script v5': BarChart3,
  'Quantitative Finance Scripting': BarChart3,
  'Financial Data Integration': BarChart3,
};

const skillClusters = [
  {
    title: 'AI, LLMs & Agents',
    skills: [
      'Agentic AI', 'Large Language Models (LLMs)', 'Multi-Agent Systems (CrewAI)',
      'LLM Tool Calling', 'Autonomous Agents', 'Model Context Protocol (MCP)',
      'RAG', 'LangChain', 'LangGraph', 'Google ADK'
    ],
  },
  {
    title: 'Backend & Frontend',
    skills: [
      'Node.js', 'Express.js', 'FastAPI', 'Python', 'REST APIs', 'WebSockets',
      'React.js', 'Next.js', 'Tailwind CSS', 'MERN Stack'
    ],
  },
  {
    title: 'Databases',
    skills: [
      'MongoDB', 'PostgreSQL', 'Vector Databases (FAISS, ChromaDB)', 'Neo4j (Cypher)'
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      'Docker', 'Git/GitHub', 'CI/CD', 'n8n', 'AWS (S3, EC2)', 'Render',
      'Vercel', 'Netlify', 'LangSmith', 'PyTest', 'Jest'
    ],
  },
  {
    title: 'ML, NLP & Multimodal',
    skills: [
      'Machine Learning', 'Deep Learning', 'NLP', 'Transformers', 'LoRA/PEFT',
      'Hugging Face', 'YOLOv8', 'OpenCV', 'STT/TTS Engines', 'Streamlit', 'Gradio'
    ],
  },
  {
    title: 'Quantitative & Financial',
    skills: [
      'TradingView Pine Script v5', 'Quantitative Finance Scripting', 'Financial Data Integration'
    ],
  },
];

/* Orbit – only icons we know exist */
const orbitSkills = [
  { name: 'Python', Icon: SiPython },
  { name: 'React', Icon: SiReact },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Docker', Icon: SiDocker },
  { name: 'AWS', Icon: FiCloud },
  { name: 'PyTorch', Icon: SiPytorch },
  { name: 'FastAPI', Icon: SiFastapi },
];

const radius = 120;
const center = 140;

const orbitStyles = (index, total) => {
  const angle = (index / total) * 2 * Math.PI;
  const x = center + radius * Math.cos(angle) - 16;
  const y = center + radius * Math.sin(angle) - 16;
  return { left: `${x}px`, top: `${y}px` };
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillClusters[0].title);
  const activeCluster = skillClusters.find(c => c.title === activeTab);

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
        Technical Skills
      </h2>

      {/* Orbit */}
      <div className="flex justify-center mb-16">
        <div className="relative w-[280px] h-[280px]">
          <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-white/10" />
          {orbitSkills.map((skill, i) => {
            const Icon = skill.Icon;
            return (
              <motion.div
                key={skill.name}
                className="absolute w-8 h-8 flex items-center justify-center bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 hover:bg-primary-500/20 hover:border-primary-500/60 transition-colors cursor-default"
                style={orbitStyles(i, orbitSkills.length)}
                whileHover={{ scale: 1.2 }}
                title={skill.name}
              >
                <Icon className="text-gray-700 dark:text-white/70 w-5 h-5" />
              </motion.div>
            );
          })}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-lg font-bold gradient-text">Skills</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {skillClusters.map(cluster => (
          <button
            key={cluster.title}
            onClick={() => setActiveTab(cluster.title)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === cluster.title
                ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border-transparent'
                : 'bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            {cluster.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {activeCluster.skills.map((skillName) => {
              const Icon = skillIconMap[skillName] || Code2;
              return (
                <div
                  key={skillName}
                  className="glass flex items-center gap-3 p-4 rounded-xl hover:-translate-y-1 hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 group"
                >
                  <Icon className="text-gray-500 dark:text-white/50 group-hover:text-primary-500 dark:group-hover:text-primary-400 w-6 h-6 flex-shrink-0 transition-colors" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                    {skillName}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;