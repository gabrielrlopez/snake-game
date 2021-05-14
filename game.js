import {
  SNAKE_SPEED,
  updateSnake,
  drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { updateFood, drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById("game-board");
let gameOver = false;
let lastRenderTime = 0;

const main = (currentTime) => {
  if (gameOver) {
    if (confirm("You lost. Press OK to restart.")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  console.log("Render");
  lastRenderTime = currentTime;

  update();
  draw();
};

window.requestAnimationFrame(main);

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
};

const draw = () => {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
