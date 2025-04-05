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

  if (loading) return <p className="text-center text-lg">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!property) return <p className="text-center text-gray-500">No property found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Image */}
        <div>
          <img
            src={property.image || `${process.env.PUBLIC_URL}/images/default-property.jpeg`}
            alt={property.title}
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/images/default-property.jpeg`)}
          />
        </div>

        {/* Property Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-gray-600 text-lg mt-2">{property.location}</p>
          <p className="text-green-600 font-semibold text-2xl mt-2">${property.price} / month</p>
          <p className="mt-4 text-gray-700 leading-relaxed">{property.description}</p>

          {/* Property Features */}
          {property.features && property.features.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Features:</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="py-1">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <Link
            to="/listings"
            className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

