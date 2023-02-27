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

### 2. 게임구현 및 코드
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
캐릭터를 먼저 맵의 랜덤위치에 그려준 후 방향키(WASD)가 입력되었을 때 이미지가 돌아가도록 구현 <br>
키보드 이벤트는 빈 배열 안에 W, A, S, D가 각각 들어갔을 때 지정된 값만큼 캐릭터가 움직이도록 구현(상충되지 않는 방향 내에서 더블키 입력 가능 - ex) 우상, 우하, 좌상, 좌하) <br>
다른 캐릭터의 움직임을 구현하기 위해서는 내 캐릭터가 움직일 때마다 소켓에 통신을 해줘야하는데 그것은 멀티플레이 부분에 후술하도록 하겠음

<br/>

- **충돌**

<img width="600" alt="1" src="https://user-images.githubusercontent.com/107897886/218092337-64fd744e-3226-4f32-be54-877a41b13b0c.png">

```javascript
PNG.decode("mapmask.png", function (data) {
  const result = {};
  for (let i = 0; i < data.length; i += 4) {
    const row = Math.floor(i / 4 / IMG_WIDTH);
    if (data[i] >= 190 && data[i + 1] <= 50 && data[i + 2] <= 50) {
      if (result[row]) {
        result[row].push((i / 4) % IMG_WIDTH);
      } else {
        result[row] = [(i / 4) % IMG_WIDTH];
      }
    }
  }
  fs.writeFileSync(
    "./mapBounds.js",
    "export const mapBounds = " + JSON.stringify(result)
  );
});
```
```javascript
  if (
    keys.includes("KeyW") &&
    movementBoundary(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    playerMoved = true;
    player.y = player.y - PLAYER_SPEED;
  };
```
리서치를 통해 PNG를 decode해서 바운드영역을 설정할 수 있다는 것을 알게 되어 png-js와 fs 모듈을 통해 바운드영역을 손쉽게 제작 <br/>
먼저 맵 이미지(mapmask.png)에 첫번째 이미지처럼 한 색(빨간색)으로 바운더리를 지정
<br>
Move Function쪽에 바운더리를 적용해주면 아래의 이미지와 같이 충돌이 잘 실행되는 것을 볼 수 있음
<br/>

<img width="600" alt="1" src="https://user-images.githubusercontent.com/107897886/218107763-25a928e7-03cd-43ae-b7c7-58778912dbbc.gif">

<br/>
<br/>

- **멀티플레이**

멀티플레이를 구현하는 것에서 오랜 시간 소요<br> 
어떤 부분을 소켓으로 보내고 받아와야할 지 많은 고민 끝에 구현함

<br> 
<img width="600" alt="1" src="https://user-images.githubusercontent.com/107897886/218254702-93933311-aec2-46db-9f85-212c58a7d631.gif">

<br>
<img width="600" alt="1" src="https://user-images.githubusercontent.com/107897886/218254726-abf706f0-4c81-497e-9dd6-eab2c2548f57.gif">

<br/>

Client 부분
```javascript
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
```
<br>
Server 부분

```javascript
 socket.on("move", ({ x, y }) => {
    socket.broadcast.emit("move", { x, y, id: socket.id });
  });
  socket.on("moveEnd", () => {
    socket.broadcast.emit("moveEnd", { id: socket.id });
  });
```
코드의 자체는 굉장히 간결했고 로직을 짜는 데에는 굉장히 많은 시간을 소모 <br>
현재 이유는 모르지만 멀티플레이 어떤 때는 잘 작동하고, 어떤 때는 오작동하는 순간이 발생 -> 후에 리팩토링이 필요

<br>

### 3. 이슈
#

(0) 쿠키런과 마찬가지로 vanila를 지향했으나 카메라를 구현하는 부분에서 막혀 프로젝트가 진행되지 않음 

    - 프레임워크 중 웹게임에 최적화된 Phaser를 도입
<br>

(1) 
캐릭터가 잘려서 출력되거나 이미지 렌더링이 비정상적으로 출력

    - 원 이미지의 규격과 로드되는 spritesheet의 frameWidth, frameHeight의 값이 맞지 않아서 오류가 발생한다는 것을 인식
    - 원 이미지의 width, height의 값을 조정하고 spritesheet 또한 적정값을 부여하여 오류 해결
<br/>

(2) 
맵이 디코딩된 후 이상하게 바운더리가 적용되는 오류 발생

    - 디코딩될 때 y좌표에 약간의 오차가 발생하는 것을 확인
    - 충돌이 일어나는 값 y좌표의 값을 31추가하는 것으로 해결
<br/>

(3)
처음 이동기능을 구현했을 때, 다른 플레이어가 애니메이션이 진행되지 않고 좌표만 바뀌는 오류 발생

    - 소켓으로 타 플레이어의 움직임을 보내줄 때 애니메이션 또한 클라이언트에서 그려줘야 함을 인식
    - 움직이는 플레이어의 소켓을 받아 자신이 아닐 때, 그 캐릭터의 움직임과 애니메이션을 함께 그려줌으로 해결