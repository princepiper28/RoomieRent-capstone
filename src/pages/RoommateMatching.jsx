import React, { useState } from "react";

const mockRoommates = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    location: "Lagos",
    budget: "$300/month",
    preferences: ["Non-smoker", "Pet-friendly", "Night owl"],
    hobbies: ["Gaming", "Cooking", "Reading"],
    profession: "Software Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 27,
    location: "Abuja",
    budget: "$400/month",
    preferences: ["Quiet", "Early riser", "No pets"],
    hobbies: ["Yoga", "Traveling", "Photography"],
    profession: "Marketing Specialist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 30,
    location: "Lagos",
    budget: "$500/month",
    preferences: ["Neat", "Non-smoker", "Gym enthusiast"],
    hobbies: ["Weightlifting", "Gaming", "Cooking"],
    profession: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 25,
    location: "Port Harcourt",
    budget: "$350/month",
    preferences: ["Social", "Loves pets", "Night owl"],
    hobbies: ["Dancing", "Volunteering", "Board games"],
    profession: "Nurse",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 5,
    name: "David Okafor",
    age: 29,
    location: "Enugu",
    budget: "$450/month",
    preferences: ["Organized", "Quiet", "Non-smoker"],
    hobbies: ["Reading", "Cycling", "Photography"],
    profession: "Civil Engineer",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    id: 6,
    name: "Sophia Williams",
    age: 26,
    location: "Ibadan",
    budget: "$300/month",
    preferences: ["Loves cooking", "Friendly", "Dog lover"],
    hobbies: ["Baking", "Painting", "Movies"],
    profession: "Teacher",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 7,
    name: "Samuel Osei",
    age: 28,
    location: "Kano",
    budget: "$400/month",
    preferences: ["Respectful", "Music lover", "Early riser"],
    hobbies: ["Guitar", "Hiking", "Traveling"],
    profession: "Musician",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
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
