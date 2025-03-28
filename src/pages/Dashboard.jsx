import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaEnvelope, FaHeart, FaCog, FaFilter, FaUserFriends, FaPlusCircle } from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [filters, setFilters] = useState({ location: "", price: "", type: "" });

  useEffect(() => {
    // Fetch listings (Replace with actual API call)
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => setListings(data));

    // Fetch suggested roommates (Replace with actual API call)
    fetch("http://localhost:5000/roommates")
      .then((res) => res.json())
      .then((data) => setRoommates(data));
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  // Function to calculate roommate match percentage
  const calculateMatchPercentage = (roommate) => {
    let matchScore = 0;

    if (roommate.age === user.age) matchScore += 20;
    if (roommate.gender === user.gender) matchScore += 20;
    if (roommate.location === user.location) matchScore += 20;

    const commonInterests = roommate.interests.filter((interest) =>
      user.interests.includes(interest)
    );
    matchScore += commonInterests.length * 10;

    return Math.min(matchScore, 100); // Cap match percentage at 100%
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[200px] h-full bg-navy-blue text-white flex flex-col items-center py-6">
        {/* Profile Picture */}
        <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img 
            src={user.profilePicture || "https://via.placeholder.com/100"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* User Name */}
        <h2 className="mt-4 text-lg font-semibold">{user.firstName} {user.lastName}</h2>

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
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>

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

        {/* Add Listing Button */}
        <div className="flex justify-end mb-6">
          <Link 
            to="/add-listing"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
          >
            <FaPlusCircle />
            <span>Add Listing</span>
          </Link>
        </div>

        {/* Recommended Listings */}
        <div className="bg-white p-6 shadow rounded mb-6">
          <h2 className="text-2xl font-semibold mb-4">Recommended Listings 🏠</h2>
          <div className="grid grid-cols-2 gap-4">
            {listings
              .filter((listing) => 
                (!filters.location || listing.location.toLowerCase().includes(filters.location.toLowerCase())) &&
                (!filters.price || listing.price <= parseInt(filters.price)) &&
                (!filters.type || listing.type === filters.type)
              )
              .map((listing) => (
                <div key={listing.id} className="border p-4 rounded shadow">
                  <h3 className="font-bold">{listing.title}</h3>
                  <p>{listing.location} - ${listing.price}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Suggested Roommates */}
        <div className="bg-white p-6 shadow rounded mb-6">
          <h2 className="text-2xl font-semibold flex items-center mb-4"><FaUserFriends className="mr-2" /> Suggested Roommates</h2>
          <div className="grid grid-cols-2 gap-4">
            {roommates.map((roommate) => (
              <div key={roommate.id} className="border p-4 rounded shadow">
                <h3 className="font-bold">{roommate.name}</h3>
                <p>Age: {roommate.age}, Interests: {roommate.interests.join(", ")}</p>
                <p className="font-semibold text-green-600">Match: {calculateMatchPercentage(roommate)}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
