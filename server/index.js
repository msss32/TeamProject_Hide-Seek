const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:7000"],
  },
});
const path = require("path");
let players = [];
let roomJoined = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

io.on("connection", (socket) => {
  console.log(socket.id, "플레이어 접속");
  console.log(players.length);

  socket.on("playerCheck", () => {
    socket.emit("playerCheck", roomJoined);
  });

  socket.on("playerJoin", ({ room }) => {
    if (roomJoined[room] < 7) {
      roomJoined[room]++;
    }
  });

  socket.on("newPlayer", (playerInfo) => {
    players.push(playerInfo);
    io.emit("newPlayer", players);
  });

  socket.on("move", ({ x, y }) => {
    socket.broadcast.emit("move", { x, y, id: socket.id });
  });
  socket.on("moveEnd", () => {
    socket.broadcast.emit("moveEnd", { id: socket.id });
  });

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    let outPlayer = players.find((player) => player.id == socket.id);
    let idx = players.indexOf(outPlayer);
    players.splice(idx, 1);
    if (roomJoined["1"] > 0) {
      roomJoined["1"]--;
    }
    socket.broadcast.emit("playerCheck", roomJoined);
    socket.broadcast.emit("disconnection", { id: socket.id });
    console.log(socket.id, "플레이어 나감");
  });
});

http.listen(5000, () => {
  console.log("서버 열림");
});
