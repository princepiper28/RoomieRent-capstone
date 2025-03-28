import React from 'react';
import { useParams, Link } from 'react-router-dom';
import properties from '../data/properties';

function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) return <p className="text-center text-red-500 text-xl">Property not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded-md shadow-lg mb-4" />
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-blue-600 text-xl font-bold">{property.price}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-700">{property.description || "No description provided."}</p>
      </div>

      <ul className="mt-6 list-disc list-inside">
        {property.features.map((feature, index) => (
          <li key={index} className="text-gray-600">{feature}</li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
          Contact Owner
        </button>
        <Link to="/listings" className="bg-gray-200 px-6 py-3 rounded-md hover:bg-gray-300 transition">
          Back to Listings
        </Link>
      </div>
    </div>
  );
}

export default PropertyDetails;
