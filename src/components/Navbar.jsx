import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Roomie</span>
          <span className="text-orange-500">Rent</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/listings" className="hover:text-blue-500">Listings</Link></li>
          <li><Link to="/favorites" className="hover:text-blue-500 px-4">
           Favorites ❤️
          </Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>

          {/* Authentication Links */}
          {!user ? (
            <>
              <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
              <li><Link to="/signUp" className="hover:text-blue-500">SignUp</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/roommate-matching" className="hover:text-orange-400">Roommate Matching</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
              <li>
                <button onClick={logout} className="text-red-500 hover:text-red-600">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-100 flex flex-col items-center space-y-4 py-4">
          <li><Link to="/" className="block" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/listings" className="block" onClick={toggleMenu}>Listings</Link></li>
          <li><Link to="/favorites" className="block text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600" onClick={toggleMenu}>
            View Favorites ❤️
          </Link></li>
          <li><Link to="/about" className="block" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" className="block" onClick={toggleMenu}>Contact</Link></li>

          {/* Authentication Links for Mobile */}
          {!user ? (
            <>
              <li><Link to="/login" className="block" onClick={toggleMenu}>Login</Link></li>
              <li><Link to="/signUp" className="block" onClick={toggleMenu}>SignUp</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/roommate-matching" className="block" onClick={toggleMenu}>Roommate Matching</Link></li>
              <li><Link to="/dashboard" className="block" onClick={toggleMenu}>Dashboard</Link></li>
              <li>
                <button onClick={() => { logout(); toggleMenu(); }} className="text-red-500">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

