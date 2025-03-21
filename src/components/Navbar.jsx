import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">RoomieRent</h1>
      <ul className="flex gap-4 text-gray-700">
        <li>
          <Link to="/" className="hover:text-blue-500">Home</Link>
        </li>
        <li>
          <Link to="/listings" className="hover:text-blue-500">Listings</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-500">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
        </li>
        <li>
          <Link to="/signUp" className="hover:text-blue-500">SignUp</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
