let canvasMain = document.getElementById("main");
let ctxMain = canvasMain.getContext("2d");

canvasMain.x = 0;
canvasMain.y = 0;
canvasMain.width = 1000;
canvasMain.height = 1000;

let map = {
  x: Math.floor(Math.random() * 400 - 200),
  y: Math.floor(Math.random() * 550 + 25),
  width: 700,
  height: 700,

  draw() {
    ctxMain.fillStyle = "red";
    ctxMain.fillRect(this.x, this.y, this.width, this.height);
  },
};
