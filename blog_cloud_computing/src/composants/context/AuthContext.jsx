import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [userRole, setUserRole] = useState(() => {
    const storedRole = sessionStorage.getItem('userRole');
    return storedRole || null;
  });

  useEffect(() => {
    // Vérifiez si l'authentification et le rôle sont stockés dans le sessionStorage
    const syncAuthState = () => {
      const storedAuth = sessionStorage.getItem('isAuthenticated');
      const storedRole = sessionStorage.getItem('userRole');
      if (storedAuth) {
        setIsAuthenticated(JSON.parse(storedAuth));
      }
      if (storedRole) {
        setUserRole(storedRole);
      }
    };

    syncAuthState();
  }, []);

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
    sessionStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
  };

  const authContextValue = {
    isAuthenticated,
    userRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
