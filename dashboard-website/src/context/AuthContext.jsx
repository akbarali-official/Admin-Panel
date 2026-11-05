import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api, { getToken, setToken } from '../services/api';

const AuthContext = createContext(null);
const USER_KEY = 'dashboard_user';

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  // Page refresh par login bana rahe: token + user localStorage se
  const [user, setUser] = useState(() => (getToken() ? readStoredUser() : null));

  const saveSession = (data) => {
    const { token, ...profile } = data;
    setToken(token);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
    setUser(profile);
  };

  const login = async (email, password) => {
    saveSession(await api.post('/auth/login', { email, password }));
  };

  const register = async (name, email, password) => {
    saveSession(await api.post('/auth/register', { name, email, password }));
  };

  const logout = useCallback(() => {
    setToken(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  }, []);

  // Token purana/galat ho to khud logout
  useEffect(() => {
    if (!getToken()) return;
    api
      .get('/auth/me')
      .then((me) => setUser((u) => ({ ...(u || {}), ...me })))
      .catch((err) => {
        if (err.status === 401) logout();
      });
  }, [logout]);

  const value = { user, isAdmin: !!user && user.role === 'admin', login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
