// client/src/pages/home/index.js

import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate(); // Add this
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true }); // Add this
    }
  };
  return (
    <div className={"container"}>
      <div className={"formContainer"}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={"input"}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)} // Add this
        />

        <select
          className={"input"}
          onChange={(e) => setRoom(e.target.value)} // Add this
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          onClick={joinRoom}
          className="btn btn-secondary"
          style={{ width: "100%" }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
