import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import { createProject, updateProject, deleteProject } from '../../api/adminApi';
import { toast, Toaster } from 'react-hot-toast';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    stack: '',
    githubUrl: '',
    demoUrl: '',
    category: 'Full-Stack',
    featured: false,
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editing) {
        await updateProject(editing._id, formData);
        toast.success('Project updated');
      } else {
        await createProject(formData);
        toast.success('Project created');
      }
      setEditing(null);
      setForm({ title: '', description: '', detailedDescription: '', stack: '', githubUrl: '', demoUrl: '', category: 'Full-Stack', featured: false, order: 0 });
      setImageFile(null);
      fetchProjects();
    } catch (err) {
      toast.error('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      detailedDescription: project.detailedDescription || '',
      stack: project.stack.join(', '),
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      category: project.category,
      featured: project.featured,
      order: project.order,
    });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(id);
      toast.success('Project deleted');
      fetchProjects();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="col-span-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="col-span-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
          <textarea name="detailedDescription" value={form.detailedDescription} onChange={handleChange} placeholder="Detailed Description" className="col-span-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" name="stack" value={form.stack} onChange={handleChange} placeholder="Stack (comma-separated)" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <select name="category" value={form.category} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>AI & Agents</option>
            <option>Full-Stack</option>
            <option>Data Science</option>
            <option>Automation</option>
          </select>
          <input type="text" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" name="demoUrl" value={form.demoUrl} onChange={handleChange} placeholder="Demo URL" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" />
            <label htmlFor="featured">Featured</label>
          </div>
          <input type="number" name="order" value={form.order} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" className="p-2" />
        </div>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-primary-500 text-white px-6 py-2 rounded-lg">
            {editing ? 'Update' : 'Create'} Project
          </button>
          {editing && (
            <button onClick={() => setEditing(null)} className="bg-gray-500 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Projects list */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t dark:border-gray-700">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.featured ? 'Yes' : 'No'}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ProjectsManager;