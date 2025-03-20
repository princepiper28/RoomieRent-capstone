import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <div key={property.id} className="border p-4 rounded shadow">
          <img src={property.image} alt={property.title} className="w-full h-48 object-cover mb-2" />
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <p>{property.location}</p>
          <p className="text-green-600 font-bold">{property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
