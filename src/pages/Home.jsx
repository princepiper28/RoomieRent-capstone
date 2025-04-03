import React, { useState } from 'react';
import properties from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className="bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/homepage-background.jpg)`,  // Fixed background image path
        }}
      >
        <div className="bg-black bg-opacity-60 min-h-screen p-8">
          <div className="text-center text-white mb-10">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-blue-500">Roomie</span>
              <span className="text-orange-500">Rent!</span>
            </h1>
            <p className="text-xl">
              Discover rental spaces and connect with compatible roommates.
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Search by location or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded shadow-sm"
            />
          </div>

          <div className="bg-white p-6 rounded shadow max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Available Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center">
                  No properties found for your search.
                </p>
              ) : (
                filteredProperties.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>

            {/* See More button */}
            <div className="flex justify-center mt-8">
              <Link
                to="/listings"
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              >
                See More Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;


