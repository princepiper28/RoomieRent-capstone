import React, { useState } from "react";

const mockRoommates = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    location: "Lagos",
    budget: "$300/month",
    preferences: ["Non-smoker", "Pet-friendly", "Night owl"],
    image: "roommate1.jpg", // ✅ Image filename only
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 27,
    location: "Abuja",
    budget: "$400/month",
    preferences: ["Quiet", "Early riser", "No pets"],
    image: "roommate2.jpg", // ✅ Image filename only
  }
];

const RoommateMatching = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter roommates based on name or location (case-insensitive)
  const filteredRoommates = mockRoommates.filter((roommate) =>
    roommate.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    roommate.location.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Find a Compatible Roommate
        </h1>

        {/* 🔍 Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded shadow-sm"
          />
        </div>

        {/* 🏡 Roommate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.map((roommate) => (
            <div key={roommate.id} className="border p-4 rounded-lg shadow bg-white">
              <img
                src={`${process.env.PUBLIC_URL}/images/${roommate.image}`} // ✅ Corrected path
                alt={roommate.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{roommate.name}, {roommate.age}</h2>
              <p className="text-gray-600 mb-2">{roommate.location}</p>
              <p className="text-green-600 font-bold mb-2">{roommate.budget}</p>

              {/* 🏷 Preferences List */}
              <ul className="text-gray-500 text-sm mb-3">
                {roommate.preferences.map((pref, index) => (
                  <li key={index}>✔ {pref}</li>
                ))}
              </ul>

              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                Send Match Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoommateMatching;
