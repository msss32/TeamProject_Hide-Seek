// 캐릭터 설정

function Player() {
  this.x = canvasMain.width / 3;
  this.y = canvasMain.height / 1.6;
  this.width = 40;
  this.height = 65;
  this.state = "stay";
  this.time = 0;
  this.index = 0;
  this.speed = 7;

  // this.draw = function () {
  //   this.time++;
  //   if (this.time % this.speed === 0) {
  //     if (this.index < 3) {
  //       this.index++;
  //     } else {
  //       this.index = 0;
  //     }
  //   }

  //   ctxMain.fillStyle = "green";
  //   ctxMain.fillRect(this.x, this.y, this.width, this.height);
  //   ctxMain.drawImage(
  //     this.state == "stay"
  //       ? stayPlayer[this.index]
  //       : this.state == "down"
  //       ? downPlayer[this.index]
  //       : this.state == "up"
  //       ? upPlayer[this.index]
  //       : this.state == "left"
  //       ? leftPlayer[this.index]
  //       : this.state == "right"
  //       ? rightPlayer[this.index]
  //       : null,
  //     this.x,
  //     this.y,
  //     this.width,
  //     this.height
  //   );
  // };

  this.update = function () {
    this.draw();
  };
}

let gamePlayer;

let stayPlayer = new Array();
let stayImglink = [
  "games/images/character/character1-2(down).png",
  "games/images/character/character1-2(down).png",
  "games/images/character/character1-2(down).png",
  "games/images/character/character1-2(down).png",
];
for (let i = 0; i < 4; i++) {
  stayPlayer.push(new Image());
  stayPlayer[i].src = stayImglink[i];
}

let upPlayer = new Array();
let upImglink = [
  "games/images/character/character1-1(up).png",
  "games/images/character/character1-2(up).png",
  "games/images/character/character1-3(up).png",
  "games/images/character/character1-2(up).png",
];
for (let i = 0; i < 4; i++) {
  upPlayer.push(new Image());
  upPlayer[i].src = upImglink[i];
}

let downPlayer = new Array();
let downImglink = [
  "games/images/character/character1-1(down).png",
  "games/images/character/character1-2(down).png",
  "games/images/character/character1-3(down).png",
  "games/images/character/character1-2(down).png",
];
for (let i = 0; i < 4; i++) {
  downPlayer.push(new Image());
  downPlayer[i].src = downImglink[i];
}

let leftPlayer = new Array();
let lefImglink = [
  "games/images/character/character1-1(left).png",
  "games/images/character/character1-2(left).png",
  "games/images/character/character1-3(left).png",
  "games/images/character/character1-2(left).png",
];
for (let i = 0; i < 4; i++) {
  leftPlayer.push(new Image());
  leftPlayer[i].src = lefImglink[i];
}

let rightPlayer = new Array();
let rightImglink = [
  "games/images/character/character1-1(right).png",
  "games/images/character/character1-2(right).png",
  "games/images/character/character1-3(right).png",
  "games/images/character/character1-2(right).png",
];
for (let i = 0; i < 4; i++) {
  rightPlayer.push(new Image());
  rightPlayer[i].src = rightImglink[i];
}

let shot = new Image();
shot.src = "games/images/character/stay-shot.png";

// function Shoot() {
//   this.x = gamePlayer.x;
//   this.y = gamePlayer.y;
//   this.width = 20;
//   this.height = 50;

//   this.draw = function () {
//     ctxMain.drawImage(shot, this.x, this.y, this.width, this.height);
//   };
// }

// let skill = new Shoot();
