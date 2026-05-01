import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { loginAdmin } from '../api/adminApi';
import { toast, Toaster } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(email, password);
      login(data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Login failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

      <form onSubmit={handleSubmit} className="glass p-8 md:p-10 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text">Admin Portal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Secure access required</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary-500/25 transition-all transform hover:-translate-y-0.5 mt-2"
          >
            Authenticate
          </button>
        </div>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AdminLogin;