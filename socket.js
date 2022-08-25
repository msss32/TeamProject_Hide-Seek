const { Socket } = require("dgram");
const express = require("express");
const fs = require("fs");
const socketio = require("socket.io");
const path = require("path");

const app = express();

const server = app.listen(3000, () => {
  console.log("서버 열림");
});

const io = socketio(server);

app.use("/games", express.static(__dirname));

app.get("/", (req, res) => {
  fs.readFile("game.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

const playerId = [];
const playerList = [];

let Player;
let players = [];

io.on("connection", (socket) => {
  console.log("유저접속");

  socket.on("createPlayer", (name, id, player) => {
    playerList.push(name);
    playerId.push(id);
    Player = {
      id: id,
      name: name,
      x: player.x,
      y: player.y,
      width: player.width,
      height: player.height,
      state: player.state,
      time: player.time,
      index: player.index,
      speed: player.speed,
    };
    players.push(Player);
    io.emit("createPlayer", players);
  });

  socket.on("updatePlayer", (data) => {
    Player = data;
    socket.broadcast.emit("updatePlayer");
  });
});
