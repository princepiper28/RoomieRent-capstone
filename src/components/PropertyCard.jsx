import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div className="border rounded p-4 shadow bg-white">
    <img
      src={property.image}
      alt={property.title}
      className="w-full h-48 object-cover rounded mb-4"
    />
    <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
    <p className="text-gray-600 mb-2">{property.location}</p>
    <p className="text-green-600 font-bold mb-2">{property.price}</p>
    <ul className="list-disc list-inside mb-3">
      {(property.features || []).map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <Link
      to={`/property/${property.id}`}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
    >
      View Details
    </Link>
  </div>
);

export default PropertyCard;
