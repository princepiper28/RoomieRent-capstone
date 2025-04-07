import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import PropertyDetails from "./pages/PropertyDetails";
import Listings from "./pages/Listings";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoommateMatching from "./pages/RoommateMatching";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorites from "./pages/Favorites";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import { FavoritesProvider } from "./context/FavoritesContext";
import RentCalculator from "./components/RentCalculator"; 
import Messaging from "./components/Messaging";  
function App() {
  const { user } = useAuth(); // Get the logged-in user

  return (
    <AuthProvider>
      {/* Pass the user to FavoritesProvider to manage favorites per user */}
      <FavoritesProvider user={user}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/roommate-matching" element={<RoommateMatching />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/rent-calculator" element={<RentCalculator />} />
          <Route path="/messages" element={<Messaging />} />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
