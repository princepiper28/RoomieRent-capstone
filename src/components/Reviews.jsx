import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const addReview = () => {
    if (!newReview.trim()) return;
    setReviews([...reviews, newReview]);
    setNewReview("");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        <ul className="list-disc pl-4">
          {reviews.map((review, index) => <li key={index}>{review}</li>)}
        </ul>
      )}
      <input
        type="text"
        className="w-full p-2 border rounded mt-2"
        placeholder="Write a review..."
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      />
      <button onClick={addReview} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Submit
      </button>
    </div>
  );
};

export default Reviews;
