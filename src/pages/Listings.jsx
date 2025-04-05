import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard"; // Use a separate component for cleaner code

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/properties");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetched properties:", data); // Debugging

        // ✅ Ensure all properties have an image, set fallback if missing
        const updatedProperties = data.map((property) => ({
          ...property,
          image: property.image
            ? `http://localhost:5000/images/${property.image}` // Ensure proper path
            : `${process.env.PUBLIC_URL}/images/default-property.jpeg`, // Fallback image
        }));

        setProperties(updatedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
