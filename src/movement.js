import { PLAYER_SPEED, MAP_WIDTH, MAP_HEIGHT } from "./constants";
import { mapBounds } from "./mapBounds";

const movementBoundary = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayer = (keys, player) => {
  let playerMoved = false;
  const absPlayerX = player.x + MAP_WIDTH / 2;
  const absPlayerY = player.y + MAP_HEIGHT / 2 + 31;
  if (
    keys.includes("KeyW") &&
    movementBoundary(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    playerMoved = true;
    player.y = player.y - PLAYER_SPEED;
  }
  if (
    keys.includes("KeyS") &&
    movementBoundary(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    playerMoved = true;
    player.y = player.y + PLAYER_SPEED;
  }
  if (
    keys.includes("KeyA") &&
    movementBoundary(absPlayerX - PLAYER_SPEED, absPlayerY)
  ) {
    playerMoved = true;
    player.x = player.x - PLAYER_SPEED;
    player.flipX = false;
  }
  if (
    keys.includes("KeyD") &&
    movementBoundary(absPlayerX + PLAYER_SPEED, absPlayerY)
  ) {
    playerMoved = true;
    player.x = player.x + PLAYER_SPEED;
    player.flipX = true;
  }
  return playerMoved;
};
