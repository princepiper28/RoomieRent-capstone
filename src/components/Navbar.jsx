import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white p-4 mb-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        <span className="text-blue-600">Roomie</span>
        <span className="text-orange-500">Rent</span>
      </h1>
      <ul className="flex gap-4 text-gray-700">
        <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
        <li><Link to="/listings" className="hover:text-blue-500">Listings</Link></li>
        <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
        <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
        <li><Link to="/signUp" className="hover:text-blue-500">SignUp</Link></li>
        {user ? (
  <>
  <li>
  <Link to="/roommate-matching" className="hover:text-orange-400">
    Roommate Matching
  </Link>
</li>
    <li>
      <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
    </li>
    <li>
      <button
        onClick={logout}
        className="text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </li>
  </>
) : (
  <>
  </>
)}
 
      </ul>
    </nav>
  );
}

export default Navbar;
