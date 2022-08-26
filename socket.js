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

let players = [];

function Player(x, y, player) {
  this.x = x;
  this.y = y;
  this.width = player.width;
  this.height = player.height;
  this.state = player.state;
  this.time = player.time;
  this.index = player.index;
  this.speed = player.speed;
  this.draw = false;
}
function anotherPlayer(x, y, player) {
  this.x = x;
  this.y = y;
  this.width = player.width;
  this.height = player.height;
  this.state = player.state;
  this.time = player.time;
  this.index = player.index;
  this.speed = player.speed;
  this.draw = false;
}

io.on("connection", (socket) => {
  socket.on("createPlayer", (name, id, player, map) => {
    playerList.push(name);
    playerId.push(id);
    let _player = new Player(map.width / 2, map.height / 2, player);
    players.push(_player);

    socket.emit("createPlayer", players);
    io.broadcast.emit("createPlayer", players);
  });

  // socket.on("updatePlayer", (map) => {
  //   Player.x = map.x;
  //   Player.y = map.y;
  //   socket.broadcast.emit("updatePlayer", Player);
  // });
});
