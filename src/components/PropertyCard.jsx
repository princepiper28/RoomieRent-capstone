import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  if (!property) {
    return <div className="text-red-500">Error: Property data is missing.</div>;
  }

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 transform hover:scale-105">
      {/* ✅ Ensure Image Path is Correct */}
      <img 
        src={`${process.env.PUBLIC_URL}/images/${property.image}`} 
        alt={property.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
        onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default-property.jpg`}
      />

      <h2 className="text-xl font-semibold">{property.title || "Untitled Property"}</h2>
      <p className="text-gray-600">{property.location || "Unknown location"}</p>
      <p className="text-green-600 font-bold">₦{property.price || "N/A"}</p>

      {/* ✅ Check if features exist before mapping */}
      {property.features && property.features.length > 0 ? (
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {property.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No features listed.</p>
      )}

      <Link 
        to={`/property/${property.id}`} 
        className="mt-3 block bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default PropertyCard;
