const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

const gridSize = 20;
let snake = [42]; // Initial position of the snake
let direction = 1; // Moving right
let food = null;
let score = 0;
let interval;
let gameOver = false;

// Create the grid
function createGrid() {
  gameContainer.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameContainer.appendChild(cell);
  }
}

// Render the snake and food
function renderGame() {
  const cells = document.querySelectorAll(".cell");

  // Clear the grid
  cells.forEach((cell) => {
    cell.classList.remove("snake", "food");
  });

  // Render the snake
  snake.forEach((index) => {
    cells[index].classList.add("snake");
  });

  // Render the food
  if (food !== null) {
    cells[food].classList.add("food");
  }
}

// Place food at a random position
function placeFood() {
  const emptyCells = [...Array(gridSize * gridSize).keys()].filter(
    (index) => !snake.includes(index)
  );
  food = emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Move the snake
function moveSnake() {
  const head = snake[snake.length - 1];
  const newHead = head + direction;

  // Check for collisions
  if (
    newHead < 0 || // Top boundary
    newHead >= gridSize * gridSize || // Bottom boundary
    (direction === -1 && head % gridSize === 0) || // Left boundary
    (direction === 1 && (head + 1) % gridSize === 0) || // Right boundary
    snake.includes(newHead) // Self-collision
  ) {
    endGame();
    return;
  }

  // Add the new head
  snake.push(newHead);

  // Check if the snake eats the food
  if (newHead === food) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    placeFood();
  } else {
    // Remove the tail
    snake.shift();
  }

  renderGame();
}

// Change the snake's direction
function changeDirection(e) {
  const key = e.key;

  if (key === "ArrowUp" && direction !== gridSize) direction = -gridSize;
  if (key === "ArrowDown" && direction !== -gridSize) direction = gridSize;
  if (key === "ArrowLeft" && direction !== 1) direction = -1;
  if (key === "ArrowRight" && direction !== -1) direction = 1;
}

// End the game
function endGame() {
  clearInterval(interval);
  gameOver = true;
  alert(`Game Over! Final Score: ${score}`);
  restartButton.style.display = "block";
}

// Restart the game
function restartGame() {
  snake = [42];
  direction = 1;
  food = null;
  score = 0;
  scoreDisplay.textContent = `Score: 0`;
  gameOver = false;
  restartButton.style.display = "none";

  placeFood();
  renderGame();
  interval = setInterval(moveSnake, 200);
}

// Initialize the game
function startGame() {
  createGrid();
  placeFood();
  renderGame();
  interval = setInterval(moveSnake, 200);
}

// Event listeners
document.addEventListener("keydown", changeDirection);
restartButton.addEventListener("click", restartGame);

// Start the game
startGame();
