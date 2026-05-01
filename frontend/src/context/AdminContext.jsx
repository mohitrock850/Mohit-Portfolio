import { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken } from '../api/adminApi';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAuthToken(token);
      setAdmin({ token }); // simple – real verify could decode JWT
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setAuthToken(token);
    setAdmin({ token });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAuthToken(null);
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);