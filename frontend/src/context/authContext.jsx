/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "customer" });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser({
      role : userData.role
    });

    localStorage.setItem('access_token', userData.access_token)
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token')

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
