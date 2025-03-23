import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Quick Links on the left */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-300">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/listings" className="hover:text-orange-400">Listings</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
            <li><Link to="/about" className="hover:text-orange-400">About Us</Link></li>
          </ul>
        </div>

        {/* Centered company info */}
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">RoomieRent</h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            Helping you find the perfect rental spaces and connect with reliable roommates.
          </p>
        </div>

        {/* Contact info and socials on the right */}
        <div className="flex-1 text-center md:text-right">
          <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
          <p>Email: info@roomierent.com</p>
          <p>Phone: +234 123 456 7890</p>
          <div className="flex justify-center md:justify-end mt-4 space-x-4">
            <a href="#" className="text-gray-300 hover:text-blue-500 text-2xl transition-transform transform hover:scale-125 duration-300"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-sky-400 text-2xl transition-transform transform hover:scale-125 duration-300"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-pink-500 text-2xl transition-transform transform hover:scale-125 duration-300"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-blue-600 text-2xl transition-transform transform hover:scale-125 duration-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} RoomieRent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
