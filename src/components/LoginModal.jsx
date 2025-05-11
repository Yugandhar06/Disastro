import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginModal.css';

const LoginModal = ({ onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'USER' });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Invalid email, password, or role');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // Call onLogin to update AuthContext
      onLogin({ role: data.role, token: data.token });

      // Navigate to dashboard
      navigate('/dashboard');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, role } = registerData;

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: role.toUpperCase(),
        }),
      });

      if (response.ok) {
        alert('Registered successfully!');
        setIsRegistering(false);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      setError('An error occurred while registering.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="flip-card">
          <div className={`flip-inner ${isRegistering ? 'flipped' : ''}`}>
            {/* Login Form */}
            <div className="flip-front">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <select name="role" value={loginData.role} onChange={handleLoginChange}>
                  <option value="USER">USER</option>
                  <option value="RESCUE">RESCUE TEAM</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
              </form>
              <div className="toggle-auth">
                Don't have an account? <span onClick={toggleForm}>Register</span>
              </div>
            </div>

            {/* Register Form */}
            <div className="flip-back">
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
                <select name="role" value={registerData.role} onChange={handleRegisterChange}>
                  <option value="USER">USER</option>
                  <option value="RESCUE">RESCUE TEAM</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Register</button>
              </form>
              <div className="toggle-auth">
                Already have an account? <span onClick={toggleForm}>Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;