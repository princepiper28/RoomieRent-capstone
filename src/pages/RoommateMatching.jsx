import React, { useState } from "react";
import roommateData from "../data/roommates"; // Importing mock roommate data

const RoommateMatching = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter roommates based on name or location (case-insensitive)
  const filteredRoommates = roommateData.filter((roommate) =>
    roommate.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    roommate.location.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
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
            className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 🏡 Roommate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.map((roommate) => (
            <div key={roommate.id} className="border p-4 rounded-lg shadow-lg bg-white">
              <img
                src={roommate.image}
                alt={roommate.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{roommate.name}, {roommate.age}</h2>
              <p className="text-gray-600 mb-1">{roommate.location}</p>
              <p className="text-green-600 font-bold mb-2">{roommate.budget}</p>
              <p className="text-gray-700 italic">{roommate.profession}</p>
              
              {/* 🏷 Preferences List */}
              <div className="mt-2">
                <p className="font-semibold text-gray-700">Preferences:</p>
                <ul className="text-gray-500 text-sm mb-2">
                  {roommate.preferences.map((pref, index) => (
                    <li key={index}>✔ {pref}</li>
                  ))}
                </ul>
              </div>
              
              {/* 🎭 Hobbies */}
              <div className="mt-2">
                <p className="font-semibold text-gray-700">Hobbies:</p>
                <ul className="text-gray-500 text-sm mb-3">
                  {roommate.hobbies.map((hobby, index) => (
                    <li key={index}>🎯 {hobby}</li>
                  ))}
                </ul>
              </div>

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

