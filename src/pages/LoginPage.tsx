import React, { useState } from 'react';
import { sha3_256 } from 'js-sha3';
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}
const DEFAULT_PASSWORD = "5464c64a7c1c8f0a05a8cd2382415898d3a2c5e7b2fc1c22cf30ac230b7801ab";
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError('')
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    const hashedPassword = sha3_256(formData.password);
    if(formData.email.endsWith("@bowiestate.edu") && DEFAULT_PASSWORD.match(hashedPassword)){
      localStorage.setItem("authenticated", "true")
        alert('Login successful!');
        navigate(`/`);
        return;
    }
    setError('Invalid email address or password');
    alert('Invalid email address or password');

  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Use your @bowiestate.edu email'
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            required
            placeholder='Hint: Default password is Password123'
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', background: '#fcba03', color: '#050800', border: 'none', borderRadius: '5px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
