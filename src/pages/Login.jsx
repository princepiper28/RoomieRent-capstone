import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/users?email=${userData.email}`);
      const users = await response.json();

      if (users.length === 0 || users[0].password !== userData.password) {
        setError('Invalid email or password');
        return;
      }

      const loggedInUser = users[0];
      login(loggedInUser); // Set the user in AuthContext
      localStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist login

      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;

