import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Check if the user already exists
      const response = await fetch(`http://localhost:5000/users?email=${userData.email}`);
      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        setError('Email is already registered');
        return;
      }

      // If not registered, create a new user
      const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      };

      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
