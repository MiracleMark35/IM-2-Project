import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/apiConfig';
import '../styles/Login.css'; // This must point to the actual CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      alert('Login successful!');
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>Login</button>
        <p>
          Don&apos;t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
