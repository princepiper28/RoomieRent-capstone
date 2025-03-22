import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>
      
      <div className="bg-white p-6 shadow rounded mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-white p-6 shadow rounded mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Listings (Coming Soon)</h2>
        <p>You haven’t added any properties yet.</p>
      </div>

      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

