# 소켓을 활용한 멀티플레이 게임
# Hide & Seek

<img width="1100" alt="1" src="https://user-images.githubusercontent.com/107897886/217984864-57340014-144d-4f5b-b3d5-7af53d1ee157.gif">

<br/>

## Canvas와 Phaser를 활용한 멀티플레이 게임
<br/>

### 1. 사용기술
#
- JavaScript, Phaser, Socket.io

<br/>

### 3. 게임구현 및 코드
#

- **첫화면**

<img width="600" alt="1" src="https://user-images.githubusercontent.com/107897886/217987385-d1e75492-4f52-4d8c-8866-d3b3b077af5a.png">
<br/>

Client
```javascript
socket.emit("playerCheck");
socket.on("playerCheck", (room) => {
      for (let x in room) {
        document.querySelector("#playerJoin" + x).innerHTML = room[x] + "/7";
      }
    });
    document
      .querySelector(".enterRoom1")
      .addEventListener("click", function () {
        document.getElementById("title").style.visibility = "hidden";
        document.getElementById("roomSelect").style.visibility = "hidden";
        document.querySelector("canvas").style.visibility = "visible";
        document.querySelector("#chattingTitle").style.visibility = "visible";
        // document.getElementById("characterSelect").style.visibility = "visible"
        socket.emit("playerJoin", { room: 1 });
      });
```
Server
```javascript
socket.on("playerCheck", () => {
    socket.emit("playerCheck", roomJoined);
  });
socket.on("playerJoin", ({ room }) => {
    if (roomJoined[room] < 7) {
      roomJoined[room]++;
    }
  });
```

방을 구현해 접속하면 먼저 소켓과 통신해 입장한 사람이 몇 명 있는지 보여주도록 구현 

<br/>

- **캐릭터**

<img width="600" alt="1" src="https://user-images.githubusercontent.com/107897886/217989173-51c64d12-8aed-42aa-a8cb-e5218c1cf295.gif">

```javascript
player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "player");

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

```


<br/>

- **충돌**

<img width="600" alt="1" src="W">

```javascript

```
-
<br/>
<br/>


### 4. 이슈
#


(1) 

    -
<br/>

(2) 

    -

    