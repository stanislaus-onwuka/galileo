/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "artisan" });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    // Redirect based on role
    if (userData.role === 'admin') {
      navigate('/admin');
    } else if (userData.role === 'customer') {
      navigate('/');
    } else if (userData.role === 'artisan') {
      navigate('/artisan');
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
