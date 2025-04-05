import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Property not found");
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!property) return <p className="text-center">No property found</p>;

  const imageUrl = property.image
    ? property.image.startsWith("http")
      ? property.image
      : `http://localhost:5000/images/${property.image}`
    : "/images/default-property.jpeg";

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image Banner */}
      <div className="w-full h-72 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/images/default-property.jpeg")}
        />
      </div>

      {/* Property Info */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-gray-600 text-lg">{property.location}</p>
        <p className="text-green-600 font-semibold text-2xl mt-2">${property.price}</p>
      </div>

      {/* Property Description */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">{property.description}</p>
      </div>

      {/* Features List */}
      {property.features && property.features.length > 0 && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Features</h2>
          <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
            {property.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-8">
        <Link to="/listings" className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Back to Listings
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;
