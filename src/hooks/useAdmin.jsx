// src/hooks/useAdmin.js — admin auth context hook
import { useState, useEffect, createContext, useContext } from 'react';
import { api } from '../lib/api.jsx';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cafe87_admin_token');
    if (!token) { setLoading(false); return; }
    api.auth.me()
      .then(setAdmin)
      .catch(() => { localStorage.removeItem('cafe87_admin_token'); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { token, admin: adminData } = await api.auth.login(email, password);
    localStorage.setItem('cafe87_admin_token', token);
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('cafe87_admin_token');
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
