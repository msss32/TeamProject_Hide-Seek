const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:7000"],
  },
});

let players = [];

io.on("connection", (socket) => {
  console.log(socket.id, "플레이어 접속");

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
    socket.broadcast.emit("disconnection", { id: socket.id });
    console.log(socket.id, "플레이어 나감");
    console.log(players.length);
  });
});

http.listen(5000, () => {
  console.log("서버 열림");
});
