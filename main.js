const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

const snake = {
    x: 10,
    y: 10,
    dx: gridSize,
    dy: 0,
    cells: [],
    maxCells: 4,
    applesEaten: 0, // New property
};

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * gridWidth) * gridSize,
        y: Math.floor(Math.random() * gridHeight) * gridSize,
    };
};

let apple = getRandomPosition();

// Adjust the frame rate (in milliseconds) to control the snake's speed
const frameRate = 150; // Change this value as needed


function update() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - gridSize;
    }
    if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - gridSize;
    }
    if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Check for collisions with the apple
    if (snake.x === apple.x && snake.y === apple.y) {
        snake.maxCells++;
        apple = getRandomPosition();
        document.getElementById('score').innerText = `Apples eaten: ${snake.applesEaten}`;
    }

    // Check for collisions with the snake itself
    for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
            alert('Game Over');
            snake.x = 10;
            snake.y = 10;
            snake.cells = [];
            snake.maxCells = 4;
            apple = getRandomPosition();
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.cells.forEach((cell) => {
        ctx.fillRect(cell.x, cell.y, gridSize, gridSize);
    });

    // Schedule the next update with the adjusted frame rate
    setTimeout(() => {
        requestAnimationFrame(update);
    }, frameRate);
}

// Handle keyboard controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (snake.dy === 0) {
                snake.dy = -gridSize;
                snake.dx = 0;
            }
            break;
        case 'ArrowDown':
            if (snake.dy === 0) {
                snake.dy = gridSize;
                snake.dx = 0;
            }
            break;
        case 'ArrowLeft':
            if (snake.dx === 0) {
                snake.dx = -gridSize;
                snake.dy = 0;
            }
            break;
        case 'ArrowRight':
            if (snake.dx === 0) {
                snake.dx = gridSize;
                snake.dy = 0;
            }
            break;
    }
});

// Start the game
requestAnimationFrame(update);
