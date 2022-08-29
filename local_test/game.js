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
    gamePlayer.state = "stay";
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
  // canvasMain.style.left -= `calc(${Number(canvasMain.style.left)} - ${vx}px)`;
  map.y -= vy;
  // canvasMain.style.top = `calc(- ${vy}px)`;
}

let skillObj = {};

function shoot() {
  skillObj.x = gamePlayer.x;
  skillObj.y = gamePlayer.y;
}

let players = [];

function frame() {
  ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
  keyPress();
  map.draw();
  gamePlayer.draw();
  console.log(map.x);
  console.log(map.y);
  console.log(gamePlayer.x);
  console.log(gamePlayer.y);
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
game();
