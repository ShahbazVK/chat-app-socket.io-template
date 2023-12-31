import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const createdTime = Date.now();
      socket.emit("send_message", { username, room, message, createdTime });
      setMessage("");
    }
  };

  return (
    <div className="sendMessageContainer">
      <input
        className="messageInput"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
