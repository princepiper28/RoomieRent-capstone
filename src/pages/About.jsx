import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section 
        className="bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/about-hero.jpeg)` }} // ✅ Fixed background image path
      >
        <div className="bg-black bg-opacity-70 min-h-[300px] flex items-center justify-center text-center text-white p-10">
          <div>
            <h1 className="text-5xl font-bold mb-4">About RoomieRent</h1>
            <p className="text-xl">Helping you find the perfect home and compatible roommates</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto p-6 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Who We Are</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center">
          RoomieRent is a platform designed to make finding rental properties and connecting with reliable roommates easier than ever.
          We understand that a great home is more than just a space — it's about the people you share it with.  
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img 
            src={`${process.env.PUBLIC_URL}/images/about-image1.jpeg`} 
            alt="RoomieRent Team" 
            className="rounded-lg shadow-md" 
            onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default-placeholder.jpg`} // ✅ Fallback for missing images
          />
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              We aim to create a trustworthy, convenient, and user-friendly experience for renters and those seeking shared accommodation.
              Whether you’re moving to a new city or simply searching for a better space, RoomieRent is here to help.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>Verified property listings</li>
              <li>Easy roommate matching</li>
              <li>Secure and seamless communication</li>
              <li>Affordable rental options for all budgets</li>
              <li>Passionate support team</li>
            </ul>
          </div>
          <img 
            src={`${process.env.PUBLIC_URL}/images/about-image2.jpeg`} 
            alt="Why Choose RoomieRent" 
            className="rounded-lg shadow-md"
            onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default-placeholder.jpg`} // ✅ Fallback for missing images
          />
        </div>

        {/* Additional Images */}
        <div className="text-center mt-12">
          <img 
            src={`${process.env.PUBLIC_URL}/images/team-photo.jpeg`} 
            alt="Our Team" 
            className="w-full h-auto rounded mx-auto max-w-4xl"
            onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default-placeholder.jpg`} // ✅ Fallback
          />

          <img 
            src={`${process.env.PUBLIC_URL}/images/company-logo.png`} 
            alt="Company Logo" 
            className="h-16 mx-auto mt-6"
            onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`} // ✅ Fallback
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
