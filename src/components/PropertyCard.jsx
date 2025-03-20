import React from 'react';
import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <div className="border rounded shadow p-4">
     <Link to={`/property/${property.id}`} className="block border rounded shadow p-4 hover:shadow-lg">
      <img src={property.image} alt={property.title} className="w-full h-36 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{property.title}</h2>
      <p className="text-gray-600 mb-1">{property.location}</p>
      <p className="text-blue-500 mb-2">{property.price}</p>
      <ul className="text-sm text-gray-500">
        {property.amenities.map((amenity, index) => (
          <li key={index}>• {amenity}</li>
        ))}
      </ul>
      </Link>
    </div>
  );
}

export default PropertyCard;
