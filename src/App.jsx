import React from 'react';
import { Routes, Route } from 'react-router-dom';  // ✅ Import HashRouter
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import PropertyDetails from './pages/PropertyDetails';
import Listings from './pages/Listings';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './AuthContext';
import RoommateMatching from "./pages/RoommateMatching";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      
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

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
