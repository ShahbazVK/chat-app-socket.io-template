import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomAndUsers = ({ socket, username, room }) => {
  return (
    <div className="roomAndUsersColumn">
      <h2 className="roomTitle">{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className="usersTitle">Users:</h5>}
        <ul className="usersList">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-outline" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
