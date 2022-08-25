// setTimeout(function () {
//   document.getElementById("firstTxt").style.visibility = "visible";
// }, 3000);
// setTimeout(function () {
//   document.getElementById("secondTxt").style.visibility = "visible";
// }, 4000);
// setTimeout(function () {
//   document.getElementById("thirdTxt").style.visibility = "visible";
// }, 5000);

let keyMap = {};

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
}

function shoot() {
  let misObj = {};
  misObj.x = gamePlayer.x;
  misObj.y = gamePlayer.y;
}

function frame() {
  ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
  keyPress();
  map.draw();
  gamePlayer.update();
  requestAnimationFrame(game);
}

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

window.onload = function () {
  loginbtn.onclick = function () {
    login.style.display = "none";
    const name = username.value;
    let user = [];

    const socket = io.connect();

    setTimeout(() => {
      let id = socket.id;
      let gamePlayer = new Player();
      socket.emit("createPlayer", name, id, gamePlayer);
    }, 300);

    socket.on();
  };
};

game();
