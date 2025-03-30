import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat min-h-screen flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/contact-bg.jpeg)` }} // ✅ Fixed background image path
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-3xl text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center mb-8 text-gray-300">
          Have questions or need assistance? We'd love to hear from you!
        </p>

        {/* Contact Form */}
        <form className="space-y-4 mb-10">
          <div>
            <label className="block mb-1 text-gray-200 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-500 p-3 rounded text-black focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-500 p-3 rounded text-black focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-medium">Message</label>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-500 p-3 rounded text-black focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <FaMapMarkerAlt className="text-orange-400 text-2xl" />
            <p>123 Roomie Street, Lagos, Nigeria</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <FaPhone className="text-orange-400 text-2xl" />
            <p>+234 123 456 7890</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <FaEnvelope className="text-orange-400 text-2xl" />
            <p>info@roomierent.com</p>
          </div>
        </div>

        {/* Contact Image Section */}
        <div className="mt-8 text-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/contact-office.jpeg`}
            alt="Office Location"
            className="w-full h-auto rounded-lg shadow-md mx-auto max-w-lg"
            onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default-placeholder.jpg`} // ✅ Added fallback image
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
