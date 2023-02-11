import Phaser from "phaser";
import { io } from "socket.io-client";
import mapImg from "./assets/map.png";
import player1Img from "./assets/player_1.png";
import monsterImg from "./assets/monster.png";
import {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_START_X,
  PLAYER_START_Y,
  MONSTER_WIDTH,
  MONSTER_HEIGHT,
} from "./constants";
import { movePlayer } from "./movement";
import { animateMovement } from "./animation";

let player = {};
let monster = {};
let players = [];

let socket = io("http://localhost:5000/");

let pressedKeys = [];

class ProjectGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("map", mapImg);
    this.load.spritesheet("player", player1Img, {
      frameWidth: PLAYER_WIDTH,
      frameHeight: PLAYER_HEIGHT,
    });
    this.load.spritesheet("monster", monsterImg, {
      frameWidth: MONSTER_WIDTH,
      frameHeight: MONSTER_HEIGHT,
    });
  }

  create() {
    const map = this.add.image(0, 0, "map");

    player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "player");
    // monster.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "monster");

    setTimeout(() => {
      let id = socket.id;
      player.id = id;

      players.push(player);
      socket.emit("newPlayer", { id, sprite: player.sprite });
    }, 300);

    socket.on("newPlayer", (data) => {
      let otherPlayer = data.filter(function (player) {
        return !players.find((_player) => _player.id == player.id);
      });

      // 새로 추가된 플레이어를 sprite에 추가함
      otherPlayer.forEach((item, idx, arr) => {
        arr[idx].sprite = this.add.sprite(
          item.sprite.x,
          item.sprite.y,
          "player"
        );
        players.push(arr[idx]);
      });
    });

    player.runAnimation = this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 12,
      repeat: -1,
    });

    this.input.keyboard.on("keydown", (e) => {
      if (e.target.id == "msg") {
        return;
      }
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => key != e.code);
    });

    socket.on("move", ({ x, y, id }) => {
      let movePlayer = players.find((item) => item.id == id);
      if (movePlayer.sprite.x > x) {
        movePlayer.sprite.flipX = false;
      } else if (movePlayer.sprite.x < x) {
        movePlayer.sprite.flipX = true;
      }

      movePlayer.sprite.x = x;
      movePlayer.sprite.y = y;
      movePlayer.moving = true;
    });

    socket.on("moveEnd", ({ id }) => {
      let movePlayer = players.find((item) => item.id == id);
      movePlayer.moving = false;
    });

    socket.on("disconnection", ({ id }) => {
      let removePlayer = players.find((item) => item.id == id);
      let idx = players.indexOf(removePlayer);
      players.splice(idx, 1);
      removePlayer.sprite.destroy();
    });
  }

  update() {
    this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
    const playerMoved = movePlayer(pressedKeys, player.sprite);
    if (playerMoved) {
      socket.emit("move", {
        x: player.sprite.x,
        y: player.sprite.y,
        id: player.id,
      });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit("moveEnd");
      }
      player.movedLastFrame = false;
    }
    animateMovement(pressedKeys, player.sprite);

    players
      .filter((_player) => _player.id != player.id)
      .forEach((_player) => {
        if (_player.moving && !_player.sprite.anims.isPlaying) {
          _player.sprite.play("running");
        } else if (!_player.moving && _player.sprite.anims.isPlaying) {
          _player.sprite.stop("running");
        }
      });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: ProjectGame,
};

const game = new Phaser.Game(config);
