import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const PropertyCard = ({ property }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  if (!property) {
    return <div className="text-red-500">Error: Property data is missing.</div>;
  }

  // Check if the property is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === property.id);

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 transform hover:scale-105">
      {/* Property Image */}
      <img
        src={property.image || `${process.env.PUBLIC_URL}/images/default-property.jpeg`}
        alt={property.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      {/* Property Details */}
      <h2 className="text-xl font-semibold">{property.title || "Untitled Property"}</h2>
      <p className="text-gray-600">{property.location || "Unknown location"}</p>
      <p className="text-green-600 font-bold">{property.price || "N/A"}</p>

      {/* Features List */}
      {property.features?.length > 0 ? (
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {property.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No features listed.</p>
      )}

      {/* Buttons */}
      <div className="flex justify-between items-center mt-3">
        {/* View Details */}
        <Link
          to={`/property/${property.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition"
        >
          View Details
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() =>
            isFavorite ? removeFromFavorites(property.id) : addToFavorites(property)
          }
          className={`px-4 py-2 rounded text-white transition ${
            isFavorite ? "hover:bg-red-500" : "hover:bg-gray-500"
          }`}
        >
          {isFavorite ? "❤️ " : "♡ "}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

