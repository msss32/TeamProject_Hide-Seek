// setTimeout(function () {
//   document.getElementById("firstTxt").style.visibility = "visible";
// }, 3000);
// setTimeout(function () {
//   document.getElementById("secondTxt").style.visibility = "visible";
// }, 4000);
// setTimeout(function () {
//   document.getElementById("thirdTxt").style.visibility = "visible";
// }, 5000);

// 소켓 연결
const socket = io.connect();

// 키입력 객체
let keyMap = {};

// 키입력 기능
// vx, vy 변수 설정
// keyMap에 wasd가 들어갔을 때 캐릭터 움직임
// 맵과 닿았을 때 vx, vy값 0 아니면 정한 값으로 움직임
function keyPress() {
  let vx = 0;
  let vy = 0;

  if (keyMap["w"]) {
    gamePlayer.state = "up";
    if (gamePlayer.y + 55 < map.y) {
      vy = 0;
    } else {
      vy = -3.5;
    }
  } else {
    delete keyMap["w"];
  }

  if (keyMap["s"]) {
    gamePlayer.state = "down";
    if (gamePlayer.y + gamePlayer.height + 1.5 > map.y + map.height) {
      vy = 0;
    } else {
      vy = 3.5;
    }
  } else {
    delete keyMap["s"];
  }

  if (keyMap["a"]) {
    gamePlayer.state = "left";
    if (gamePlayer.x - 1.5 < map.x) {
      vx = 0;
    } else {
      vx = -3.5;
    }
  } else {
    delete keyMap["a"];
  }

  if (keyMap["d"]) {
    gamePlayer.state = "right";
    if (gamePlayer.x + gamePlayer.width + 2.5 > map.x + map.width) {
      vx = 0;
    } else {
      vx = 3.5;
    }
  } else {
    delete keyMap["d"];
  }

  map.x -= vx;
  map.y -= vy;

  // 소켓으로 보냄
  socket.emit("updatePlayer", map);
}

// 스킬 미구현
let skillObj = {};

function shoot() {
  skillObj.x = gamePlayer.x;
  skillObj.y = gamePlayer.y;
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

// 클라이언트 소켓 설정
window.onload = function () {
  loginbtn.onclick = function () {
    login.style.display = "none";
    console.log("유저접속");
    const name = username.value;

    // 새로운 플레이어 생성후 소켓으로 emit
    setTimeout(() => {
      let id = socket.id;
      gamePlayer = new Player();
      socket.emit("createPlayer", name, id, gamePlayer, canvasMain);
    }, 300);

    // 서버에서 받아온 플레이어 그려줌
    socket.on("createPlayer", (data) => {
      player = data;
      console.log(data);
      player.forEach((e) => {
        if (e.draw === false) {
          e.draw = function () {
            ctxMain.fillStyle = "green";
            ctxMain.fillRect(e.x, e.y, e.width, e.height);
          };
        }
      });
    });

    // socket.on("updatePlayer", (data) => {
    //   player.forEach((data) => {
    //     data.update();
    //   });
    // });

    game();
  };
};
