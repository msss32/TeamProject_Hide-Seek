// 캔버스 설정

let canvasMain = document.getElementById("main");
let ctxMain = canvasMain.getContext("2d");

canvasMain.width = 700;
canvasMain.height = 700;

// 맵 설정
let map = {
  x: Math.floor(Math.random() * 600 + 1),
  y: Math.floor(Math.random() * 600 + 1),
  width: 500,
  height: 500,

  draw() {
    ctxMain.fillStyle = "red";
    ctxMain.fillRect(this.x, this.y, this.width, this.height);
  },
};
