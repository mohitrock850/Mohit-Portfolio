import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllProjectsPage from './pages/AllProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import MessagesManager from './pages/admin/MessagesManager';
import ResumeManager from './pages/admin/ResumeManager';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/projects" element={<><Navbar /><AllProjectsPage /></>} />
              <Route path="/project/:id" element={<><Navbar /><ProjectDetail /></>} />
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />}>
                <Route index element={<ProjectsManager />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="resume" element={<ResumeManager />} />
                <Route path="messages" element={<MessagesManager />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AdminProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;