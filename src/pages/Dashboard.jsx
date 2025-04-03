import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaEnvelope, FaHeart, FaCog, FaFilter } from "react-icons/fa"; // Removed FaStar

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || "/images/user-avatar.png"
  );

  const [listings, setListings] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [filters, setFilters] = useState({ location: "", price: "", type: "" });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) setProfilePicture(savedProfilePicture);
  }, []);

  // ✅ Fetch listings separately
  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => {
        let filteredData = Array.isArray(data) ? data : [];

        if (filters.location?.trim()) {
          filteredData = filteredData.filter((listing) =>
            listing.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }

        if (filters.price && !isNaN(Number(filters.price))) {
          filteredData = filteredData.filter((listing) =>
            Number(listing.price) <= Number(filters.price)
          );
        }

        if (filters.type?.trim()) {
          filteredData = filteredData.filter((listing) => listing.type === filters.type);
        }

        setListings(filteredData);
      })
      .catch(console.error);
  }, [filters]); // ✅ This effect only depends on filters

  // ✅ Separate useEffect for roommates
  useEffect(() => {
    fetch("http://localhost:5000/roommates")
      .then((res) => res.json())
      .then((data) =>
        setRoommates(
          Array.isArray(data)
            ? data.map((roommate) => ({
                ...roommate,
                rating: Math.max(0, Number(roommate.rating) || 0), // Ensure rating is valid
              }))
            : []
        )
      )
      .catch(console.error);
  }, []); // ✅ This runs only once when the component mounts

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
      <aside className="w-[200px] h-full bg-blue-900 text-white flex flex-col items-center py-6">
        <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="mt-2 text-sm" />
        <h2 className="mt-4 text-lg font-semibold">
          {user?.firstName || "Guest"} {user?.lastName || ""}
        </h2>

        <nav className="mt-8 w-full">
          <ul className="space-y-4 text-center">
            {[ 
              { path: "/listings", icon: <FaHome />, label: "Listings" },
              { path: "/messages", icon: <FaEnvelope />, label: "Messages" },
              { path: "/favorites", icon: <FaHeart />, label: "Favorites" },
              { path: "/settings", icon: <FaCog />, label: "Settings" },
            ].map(({ path, icon, label }) => (
              <li key={path}>
                <Link to={path} className="flex items-center justify-center space-x-2 hover:text-gray-300">
                  {icon} <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName || "Guest"}!</h1>

        {/* Filters */}
        <section className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-2xl font-semibold flex items-center mb-4">
            <FaFilter className="mr-2" /> Filter Listings
          </h2>
          <div className="flex space-x-4">
            {[ 
              { placeholder: "Location", key: "location" },
              { placeholder: "Max Price ($)", key: "price" },
            ].map(({ placeholder, key }) => (
              <input
                key={key}
                type="text"
                placeholder={placeholder}
                className="border px-4 py-2 rounded w-1/3"
                onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            ))}
            <select className="border px-4 py-2 rounded w-1/3" onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}>
              <option value="">Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Shared">Shared</option>
            </select>
          </div>
        </section>

        {/* Listings */}
        <section>
          <h2 className="text-xl font-bold mb-4">Recommended Listings</h2>
          <div className="grid grid-cols-2 gap-4">
            {listings.length > 0 ? (
              listings.map(({ id, title, location, price }) => (
                <div key={id} className="border border-orange-500 bg-orange-100 p-4 rounded shadow-md text-orange-900">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">{location}</p>
                  <p className="font-bold text-lg">${price}</p>
                </div>
              ))
            ) : (
              <p>No listings available</p>
            )}
          </div>
        </section>

        {/* Roommates */}
        <section className="mt-6">
          <h2 className="text-xl font-bold mb-4">Roommates</h2>
          <div className="grid grid-cols-1 gap-4">
            {roommates.length > 0 ? (
              roommates.map(({ id, name, rating }) => (
                <div key={id} className="border border-blue-500 p-4 rounded shadow-md text-blue-900">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm">Rating: {rating} <FaStar className="inline text-yellow-500" /></p>
                </div>
              ))
            ) : (
              <p>No roommates available</p>
            )}
          </div>
        </section>

        {/* Logout */}
        <button onClick={() => { logout(); navigate("/"); }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-6">
          Logout
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
