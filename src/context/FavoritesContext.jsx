import React, { useState, createContext, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage when app loads
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add property to favorites (prevent duplicates)
  const addToFavorites = (property) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === property.id)) return prevFavorites;
      return [...prevFavorites, property];
    });
  };

  // Remove property from favorites
  const removeFromFavorites = (propertyId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== propertyId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
