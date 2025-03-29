import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaEnvelope, FaHeart, FaCog, FaFilter, FaStar } from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || "https://via.placeholder.com/100"
  );

  const [listings, setListings] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [filters, setFilters] = useState({ location: "", price: "", type: "" });

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Load profile picture from localStorage
  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  // Fetch listings and roommates
  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => setListings(Array.isArray(data) ? data : [])) // ✅ Ensure data is an array
      .catch(() => setListings([]));

    fetch("http://localhost:5000/roommates")
      .then((res) => res.json())
      .then((data) =>
        setRoommates(
          Array.isArray(data)
            ? data.map((roommate) => ({
                ...roommate,
                rating: Number(roommate.rating) || 0, // ✅ Ensure rating is a number
              }))
            : []
        )
      )
      .catch(() => setRoommates([]));
  }, []);

  // Handle Profile Picture Upload (only images allowed)
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profilePicture", reader.result);
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[200px] h-full bg-blue-900 text-white flex flex-col items-center py-6">
        {/* Profile Picture */}
        <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* Upload Profile Picture */}
        <input 
          type="file"
          accept="image/*"
          onChange={handleProfilePictureUpload}
          className="mt-2 text-sm"
        />

        {/* User Name */}
        <h2 className="mt-4 text-lg font-semibold">
          {user?.firstName || "Guest"} {user?.lastName || ""}
        </h2>

        {/* Navigation Links */}
        <nav className="mt-8 w-full">
          <ul className="space-y-4 text-center">
            <li>
              <Link to="/listings" className="flex items-center justify-center space-x-2 hover:text-gray-300">
                <FaHome /> <span>Listings</span>
              </Link>
            </li>
            <li>
              <Link to="/messages" className="flex items-center justify-center space-x-2 hover:text-gray-300">
                <FaEnvelope /> <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="flex items-center justify-center space-x-2 hover:text-gray-300">
                <FaHeart /> <span>Favorites</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center justify-center space-x-2 hover:text-gray-300">
                <FaCog /> <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName || "Guest"}!</h1>

        {/* Filters Section */}
        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-2xl font-semibold flex items-center mb-4"><FaFilter className="mr-2" /> Filter Listings</h2>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Location" 
              className="border px-4 py-2 rounded w-1/3"
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Max Price ($)" 
              className="border px-4 py-2 rounded w-1/3"
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            />
            <select 
              className="border px-4 py-2 rounded w-1/3"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Shared">Shared</option>
            </select>
          </div>
        </div>

        {/* Recommended Listings */}
        <h2 className="text-xl font-bold mb-4">Recommended Listings</h2>
        <div className="grid grid-cols-2 gap-4">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing.id} className="border p-4 rounded shadow">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-sm text-gray-500">{listing.location}</p>
                <p className="font-bold text-lg">${listing.price}</p>
              </div>
            ))
          ) : (
            <p>No listings available</p>
          )}
        </div>

        {/* Suggested Roommates */}
        <h2 className="text-xl font-bold mt-6 mb-4">Suggested Roommates</h2>
        <div className="grid grid-cols-2 gap-4">
          {roommates.length > 0 ? (
            roommates.map((roommate) => (
              <div key={roommate.id} className="border p-4 rounded shadow text-center">
                <img 
                  src={roommate.profilePicture || "https://via.placeholder.com/100"} 
                  alt="Roommate" 
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="font-semibold">{roommate.name}</h3>
                <p className="text-sm text-gray-500">Match: {roommate.matchPercentage}%</p>
                
                {/* Star Ratings (Fix Invalid Array Length) */}
                <div className="flex justify-center text-yellow-500 my-2">
                  {[...Array(Math.max(0, Math.floor(Number(roommate.rating) || 0)))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Connect</button>
              </div>
            ))
          ) : (
            <p>No roommates available</p>
          )}
        </div>

        {/* Logout Button */}
        <button onClick={() => { logout(); navigate("/"); }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-6">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
