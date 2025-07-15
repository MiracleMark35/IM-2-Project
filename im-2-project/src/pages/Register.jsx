import React, { useState } from 'react';
import { API_BASE_URL } from '../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !mobile) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mobile })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Registration failed');

      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
