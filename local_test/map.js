let canvasMain = document.getElementById("main");
let ctxMain = canvasMain.getContext("2d");

canvasMain.x = 0;
canvasMain.y = 0;
canvasMain.width = 1000;
canvasMain.height = 1000;

let mapImg = new Image();
mapImg.src = "map/map.png";

let map = {
  x: Math.floor(Math.random() * 2000 - 1700),
  y: Math.floor(Math.random() * 1700 - 1000),
  width: 2880,
  height: 1600,

  draw() {
    ctxMain.drawImage(mapImg, this.x, this.y, this.width, this.height);
  },
};
