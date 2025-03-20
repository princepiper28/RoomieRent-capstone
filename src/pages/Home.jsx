import React, { useState } from 'react'; // ✅ Import useState
import properties from '../data/properties';
import PropertyCard from '../components/PropertyCard';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter properties based on search
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to RoomieRent!</h1>
      <p className="text-gray-700 mb-6">
        Discover the best rental spaces and connect with compatible roommates.  
        Start exploring rental listings tailored to your needs.
      </p>
      
      {/* 🔎 Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by location or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>

      <h2 className="text-2xl font-bold text-blue-600 mb-4">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
        {filteredProperties.length === 0 && (
          <p className="text-gray-500">No properties found for your search.</p>
        )}
      </div>
    </div>
  );
}

export default Home;

