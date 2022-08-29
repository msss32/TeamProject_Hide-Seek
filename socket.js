// 서버구축 & 모듈
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

// fs모듈로 game.html 읽어옴
app.get("/", (req, res) => {
  fs.readFile("game.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

// 서버 플레이어 소켓 아이디, 닉네임 빈 배열
const playerId = [];
const playerList = [];

// 서버 플레이어 빈 배열
let players = [];
let otherPlayers = function Player(x, y, state, player) {
  this.x = x;
  this.y = y;
  this.state = state;
  this.draw = false;
};

function anotherPlayer(x, y, state, player) {
  this.x = x;
  this.y = y;
  this.state = state;
  this.draw = false;
}

// 소켓 연결
io.on("connection", (socket) => {
  // createPlayer 서버에 소켓아이디, 닉네임 넣고 플레이어 생성
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
