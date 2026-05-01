import api from './api';

// Attach JWT to requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const loginAdmin = async (email, password) => {
  const res = await api.post('/admin/login', { email, password });
  return res.data;
};

export const getMessages = async () => {
  const res = await api.get('/admin/messages');
  return res.data;
};

export const markMessageRead = async (id) => {
  const res = await api.put(`/admin/messages/${id}/read`);
  return res.data;
};

export const createProject = async (formData) => {
  const res = await api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateProject = async (id, formData) => {
  const res = await api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

// ── Resume ────────────────────────────────────────────────────────────────

export const getResume = async () => {
  const res = await api.get('/resume');
  return res.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const res = await api.post('/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteResume = async () => {
  const res = await api.delete('/resume');
  return res.data;
};