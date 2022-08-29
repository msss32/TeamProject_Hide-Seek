let camera = document.getElementById("canvas");

function Player() {
  this.x = 330;
  this.y = 600;
  this.width = 60;
  this.height = 104;
  this.state = "stay";
  this.time = 0;
  this.index = 0;
  this.speed = 7;

  this.draw = function () {
    this.time++;
    if (this.time % this.speed === 0) {
      if (this.index < 3) {
        this.index++;
      } else {
        this.index = 0;
      }
    }

    ctxMain.fillStyle = "green";
    ctxMain.fillRect(this.x, this.y, this.width, this.height);
    ctxMain.drawImage(
      this.state == "stay"
        ? stayPlayer[this.index]
        : this.state == "down"
        ? downPlayer[this.index]
        : this.state == "up"
        ? upPlayer[this.index]
        : this.state == "left"
        ? leftPlayer[this.index]
        : this.state == "right"
        ? rightPlayer[this.index]
        : null,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  this.update = function () {
    this.draw();
  };
}

let gamePlayer = new Player();

let stayPlayer = new Array();
let stayImglink = [
  "images/character/character1-2(down).png",
  "images/character/character1-2(down).png",
  "images/character/character1-2(down).png",
  "images/character/character1-2(down).png",
];
for (let i = 0; i < 4; i++) {
  stayPlayer.push(new Image());
  stayPlayer[i].src = stayImglink[i];
}

let upPlayer = new Array();
let upImglink = [
  "images/character/character1-1(up).png",
  "images/character/character1-2(up).png",
  "images/character/character1-3(up).png",
  "images/character/character1-2(up).png",
];
for (let i = 0; i < 4; i++) {
  upPlayer.push(new Image());
  upPlayer[i].src = upImglink[i];
}

let downPlayer = new Array();
let downImglink = [
  "images/character/character1-1(down).png",
  "images/character/character1-2(down).png",
  "images/character/character1-3(down).png",
  "images/character/character1-2(down).png",
];
for (let i = 0; i < 4; i++) {
  downPlayer.push(new Image());
  downPlayer[i].src = downImglink[i];
}

let leftPlayer = new Array();
let lefImglink = [
  "images/character/character1-1(left).png",
  "images/character/character1-2(left).png",
  "images/character/character1-3(left).png",
  "images/character/character1-2(left).png",
];
for (let i = 0; i < 4; i++) {
  leftPlayer.push(new Image());
  leftPlayer[i].src = lefImglink[i];
}

let rightPlayer = new Array();
let rightImglink = [
  "images/character/character1-1(right).png",
  "images/character/character1-2(right).png",
  "images/character/character1-3(right).png",
  "images/character/character1-2(right).png",
];
for (let i = 0; i < 4; i++) {
  rightPlayer.push(new Image());
  rightPlayer[i].src = rightImglink[i];
}
