import { useState, useEffect } from 'react';
import api from '../api/api';
import { projects as localProjects } from '../data/initialData';
import FeaturedProjects from './FeaturedProjects';
import SecondaryProjects from './SecondaryProjects';

const TOP5_TITLES = [
  "Autonomous Enterprise Researcher – Multi-Agent Compliance Auditor",
  "Echo – Autonomous Voice Assistant",
  "Rule Intelligence – Visual DAG Workflow Automation Platform",
  "StockBuddy – AI-Powered Financial Analytics Platform",
  "Maison Aurelle – Full-Stack Luxury E-Commerce Platform"
];

const SECONDARY_TITLES = [
  "UrbanPlan AI",
  "X-RAG",
  "Hospital Management System",
  "Autonomous Compliance Auditor",
  "Smart Mail Agent",
  "LORA Multi Adapter System"
];

const ProjectsWrapper = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        const apiProjects = res.data.filter(p =>
          TOP5_TITLES.includes(p.title) || SECONDARY_TITLES.includes(p.title)
        );
        if (apiProjects.length > 0) {
          setProjects(apiProjects);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend not reachable, using local data');
      }

      // Fallback to local data
      const fallback = localProjects.filter(p =>
        TOP5_TITLES.includes(p.title) || SECONDARY_TITLES.includes(p.title)
      );
      setProjects(fallback);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const featured = projects.filter(p => TOP5_TITLES.includes(p.title));
  const secondary = projects.filter(p => SECONDARY_TITLES.includes(p.title));

  return (
    <>
      <FeaturedProjects projects={featured} loading={loading} />
    </>
  );
};

export default ProjectsWrapper;