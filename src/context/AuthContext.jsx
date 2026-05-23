import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [activeOrgId, setActiveOrgId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recover credentials from persistent local storage during bootstrap
    const savedToken = localStorage.getItem('taskflow_token');
    const savedUser = localStorage.getItem('taskflow_user');
    const savedOrgId = localStorage.getItem('taskflow_org_id');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setActiveOrgId(savedOrgId);
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    
    localStorage.setItem('taskflow_token', newToken);
    localStorage.setItem('taskflow_user', JSON.stringify(newUser));

    // Auto-select first user organization if available
    if (newUser.organizations && newUser.organizations.length > 0) {
      const firstOrg = newUser.organizations[0].organizationId || newUser.organizations[0]._id;
      if (firstOrg) {
        changeOrganization(firstOrg.toString());
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setActiveOrgId(null);
    
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_user');
    localStorage.removeItem('taskflow_org_id');
  };

  const changeOrganization = (orgId) => {
    setActiveOrgId(orgId);
    localStorage.setItem('taskflow_org_id', orgId);
    
    // Refresh page if active session is already live to invalidate all tenant queries
    if (token) {
      window.location.reload();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        activeOrgId,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
        changeOrganization,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
