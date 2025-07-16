import React, { useState } from 'react';
import { API_BASE_URL } from '../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    const { firstName, lastName, email, password, dateOfBirth } = formData;
    
    if (!firstName || !lastName || !email || !password || !dateOfBirth) {
      setError('All required fields must be filled');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
        <h2 className="register-title">Create Account</h2>
        
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
          />
          
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div className="date-input-container">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {error && <p className="error">{error}</p>}
        <button onClick={handleRegister}>Register</button>
        <p className="login-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;