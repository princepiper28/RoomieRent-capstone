import { useState } from "react";

const Messages = () => {
  // Step 1: Create state for messages and new message input
  const [messages, setMessages] = useState([]); // Stores messages
  const [newMessage, setNewMessage] = useState(""); // Stores input message

  // Step 2: Function to send a message
  const sendMessage = () => {
    if (newMessage.trim() === "") return; // Prevent empty messages

    const messageData = {
      id: messages.length + 1, // Generate a unique ID (temporary)
      text: newMessage,
      sender: "User", // This can later be dynamic
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, messageData]); // Step 3: Update state with new message
    setNewMessage(""); // Step 4: Clear the input field
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow">
      {/* Messages List */}
      <div className="h-96 overflow-y-auto bg-white p-4 rounded-lg mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <p className="font-bold">{msg.sender}</p>
            <p className="bg-blue-100 p-2 rounded">{msg.text}</p>
            <span className="text-xs text-gray-500">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // Step 5: Update input state
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage} // Call sendMessage function when clicked
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;


