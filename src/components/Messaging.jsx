import React, { useState, useEffect, useRef } from "react";

const Messaging = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I'm interested in your listing.", sender: "You" },
    { id: 2, text: "Great! Let’s discuss further.", sender: "John Doe" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Add new message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate a delayed response from the other person
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        text: "Thanks for reaching out! How can I assist?",
        sender: "John Doe",
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Messages</h2>

      {/* Messages List */}
      <div className="h-80 overflow-y-auto p-4 border rounded-lg bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-1 rounded-md ${
              msg.sender === "You"
                ? "bg-blue-500 text-white text-right ml-auto max-w-xs"
                : "bg-gray-300 text-black text-left mr-auto max-w-xs"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field & Send Button */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messaging;



