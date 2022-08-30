// setTimeout(function () {
//   document.getElementById("firstTxt").style.visibility = "visible";
// }, 3000);
// setTimeout(function () {
//   document.getElementById("secondTxt").style.visibility = "visible";
// }, 4000);
// setTimeout(function () {
//   document.getElementById("thirdTxt").style.visibility = "visible";
// }, 5000);

// 키입력 객체
let keyMap = {};

// 키입력 기능
// vx, vy 변수 설정
// keyMap에 wasd가 들어갔을 때 캐릭터 움직임
// 맵과 닿았을 때 vx, vy값 0 아니면 정한 값으로 움직임
function keyPress() {
  let vx = 0;
  let vy = 0;
  let shotX = 0;
  let shotY = 0;

  if (!gamePlayer?.state) return;
  if (keyMap["w"]) {
    gamePlayer.state = "up";
    if (gamePlayer.y - 25 < map.y) {
      vy = 0;
    } else {
      vy = -3.5;
    }
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  } else {
    gamePlayer.state = "stay";
    delete keyMap["w"];
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  }

  if (keyMap["s"]) {
    gamePlayer.state = "down";
    if (gamePlayer.y + gamePlayer.height + 59 > map.y + map.height) {
      vy = 0;
    } else {
      vy = 3.5;
    }
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  } else {
    delete keyMap["s"];
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  }

  if (keyMap["a"]) {
    gamePlayer.state = "left";
    if (gamePlayer.x - 32 < map.x) {
      vx = 0;
    } else {
      vx = -3.5;
    }
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  } else {
    delete keyMap["a"];
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  }

  if (keyMap["d"]) {
    gamePlayer.state = "right";
    if (gamePlayer.x + gamePlayer.width + 32 > map.x + map.width) {
      vx = 0;
    } else {
      vx = 3.5;
    }
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  } else {
    delete keyMap["d"];
    // 소켓으로 보냄
    socket.emit("updatePlayer", gamePlayer);
  }

  if (keyMap["k"]) {
    if ((gamePlayer.state = "stay")) {
      skill.draw();
      shotX = 3.5;
    }
  } else {
    delete keyMap["k"];
  }

  map.x -= vx;
  map.y -= vy;
}

// 플레이어 빈 객체
let player = [];

// 기능 넣고 프레임 돌림
function frame() {
  ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
  keyPress();
  map.draw();
  if (player !== []) {
    player.forEach((e) => {
      e.draw();
    });
  }
  requestAnimationFrame(game);
}

// 키보드 이벤트 넣고 게임 돌리기
function game() {
  document.addEventListener("keydown", function (key) {
    if (!keyMap[key.key]) {
      keyMap[key.key] = true;
    }
  });

  document.addEventListener("keyup", function (key) {
    if (keyMap[key.key]) {
      keyMap[key.key] = false;
    }
  });

  frame();
}

// 소켓 연결
const socket = io.connect();

// 클라이언트 소켓 설정
window.onload = function () {
  console.log("유저접속");

  // 새로운 플레이어 생성후 소켓으로 emit
  setTimeout(() => {
    let id = socket.id;
    gamePlayer = new Player();
    socket.emit("createPlayer", id, gamePlayer, canvasMain);
  }, 300);

  // 서버에서 받아온 플레이어 그려줌
  socket.on("createPlayer", (data) => {
    player = data;
    player.forEach((e) => {
      if (e.draw === false) {
        e.draw = function () {
          ctxMain.drawImage(stayPlayer[0], e.x, e.y, e.width, e.height);
        };
      }
    });
  });

  socket.on("updatePlayer", (data) => {
    player = data;
    for (let i = 0; i < 4; i++) {
      player.draw = function (e) {
        e.time++;
        console.log(e.time);
        if (e.time % e.speed === 0) {
          if (e.index < 3) {
            e.index++;
          } else {
            e.index = 0;
          }
        }
        ctxMain.drawImage(
          e.state == "stay"
            ? stayPlayer[e.index]
            : e.state == "down"
            ? downPlayer[e.index]
            : e.state == "up"
            ? upPlayer[e.index]
            : e.state == "left"
            ? leftPlayer[e.index]
            : e.state == "right"
            ? rightPlayer[e.index]
            : null,
          e.x,
          e.y,
          e.width,
          e.height
        );
      };
    }
  });

  game();
};
