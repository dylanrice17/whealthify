import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem('whealthify_last_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
    // Listen for login/logout events
    const syncAuth = () => {
      const stored = localStorage.getItem('whealthify_last_user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('whealthify-auth', syncAuth);
    window.addEventListener('storage', syncAuth);
    return () => {
      window.removeEventListener('whealthify-auth', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const login = (userObj) => {
    localStorage.setItem('whealthify_last_user', JSON.stringify(userObj));
    setUser(userObj);
    window.dispatchEvent(new Event('whealthify-auth'));
  };

  const logout = () => {
    localStorage.removeItem('whealthify_last_user');
    setUser(null);
    window.dispatchEvent(new Event('whealthify-auth'));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 