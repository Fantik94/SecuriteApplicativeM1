import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const syncAuthState = () => {
      const storedAuth = sessionStorage.getItem('isAuthenticated');
      if (storedAuth) {
        setIsAuthenticated(JSON.parse(storedAuth));
      }
    };

    syncAuthState();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem('isAuthenticated');
  };

  const authContextValue = {
    isAuthenticated,
    userRole,
    setUserRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
