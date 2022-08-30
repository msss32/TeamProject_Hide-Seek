// 캔버스 설정

let canvasMain = document.getElementById("main");
let ctxMain = canvasMain.getContext("2d");

canvasMain.x = 333;
canvasMain.y = 625;
canvasMain.width = 1000;
canvasMain.height = 1000;

let mapImg = new Image();
mapImg.src = "games/images/map/map.png";

// 맵 설정
let map = {
  x: Math.floor(Math.random() * 2700 - 2400),
  y: Math.floor(Math.random() * 1300 - 700),
  width: 2880,
  height: 1600,

  draw() {
    ctxMain.drawImage(mapImg, this.x, this.y, this.width, this.height);
  },
};
