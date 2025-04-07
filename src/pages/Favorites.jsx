import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import PropertyCard from "../components/PropertyCard";

const Favorites = () => {
  const { favorites } = useFavorites(); // ✅ Use Context to get favorites

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Your Favorite Properties</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">No favorite properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
