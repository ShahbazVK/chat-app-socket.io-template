const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];
let chatRoomUsers = [];

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    let createdTime = Date.now();

    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      createdTime,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdTime,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    // socket.emit('last_100_messages', last100Messages);
  });

  socket.on("send_message", (data) => {
    io.in(data.room).emit("receive_message", data); // Send to all users in room, including sender
    // db
  });
});

server.listen(3000, () => console.log("Server is running on port 3000"));
