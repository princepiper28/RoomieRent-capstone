import React from 'react';
import { useParams } from 'react-router-dom';
import properties from '../data/properties';

function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) return <p>Property not found</p>;

  return (
    <div className="p-6">
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-2">{property.location}</p>
      <p className="text-blue-600 text-xl mb-4">{property.price}</p>
      <p>{property.description || "No description provided."}</p>
    </div>
  );
}

export default PropertyDetails;
