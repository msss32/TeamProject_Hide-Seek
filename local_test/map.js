let canvasMain = document.getElementById("main");
let ctxMain = canvasMain.getContext("2d");

canvasMain.x = 0;
canvasMain.y = 0;
canvasMain.width = 1000;
canvasMain.height = 1000;

let map = {
  x: canvasMain.x,
  y: canvasMain.y,
  width: canvasMain.width,
  height: canvasMain.height,

  draw() {
    ctxMain.fillStyle = "red";
    ctxMain.fillRect(this.x, this.y, this.width, this.height);
  },
};
