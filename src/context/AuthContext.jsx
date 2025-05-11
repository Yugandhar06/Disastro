import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role }

  // Load user from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    if (storedRole && storedToken) {
      setUser({ role: storedRole, token: storedToken });
    }
  }, []);

  const login = (userData) => {
    console.log('AuthContext login called with:', userData);
    setUser(userData);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    console.log('AuthContext logout called');
    setUser(null);
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);