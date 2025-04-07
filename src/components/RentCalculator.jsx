import React, { useState } from "react";

const RentCalculator = () => {
  const [rent, setRent] = useState("");
  const [roommates, setRoommates] = useState("");
  const [result, setResult] = useState(null);

  const calculateShare = () => {
    if (!rent || !roommates) return;
    const share = (parseFloat(rent) / parseInt(roommates)).toFixed(2);
    setResult(share);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Rent Split Calculator</h2>
      <input
        type="number"
        placeholder="Total Rent"
        className="w-full p-2 border rounded mb-2"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Roommates"
        className="w-full p-2 border rounded mb-2"
        value={roommates}
        onChange={(e) => setRoommates(e.target.value)}
      />
      <button
        onClick={calculateShare}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
      {result && (
        <p className="mt-4 text-lg">Each roommate pays: <strong>₦{result}</strong></p>
      )}
    </div>
  );
};

export default RentCalculator;
