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
// const playerList = [];

// 서버 플레이어 빈 배열
let players = [];
function Player(x, y, player) {
  this.x = x;
  this.y = y;
  this.width = player.width;
  this.height = player.height;
  this.state = player.state;
  this.time = player.time;
  this.speed = player.speed;
  this.index = player.index;
  this.draw = false;
}

// 소켓 연결
io.on("connection", (socket) => {
  // createPlayer 서버에 소켓아이디, 닉네임 넣고 플레이어 생성
  socket.on("createPlayer", (id, player, map, state) => {
    // playerList.push(name);
    playerId.push(id);
    let _player = new Player(map.x, map.y, player);
    console.log(map);
    players.push(_player);

    socket.emit("createPlayer", players, state);
  });

  socket.on("updatePlayer", (gamePlayer) => {
    Player.state = gamePlayer.state;
    socket.emit("updatePlayer", gamePlayer.state);
  });
});
