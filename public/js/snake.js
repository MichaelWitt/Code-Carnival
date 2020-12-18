// SnakeScript

// Game Board
const board_border = 'black';
const board_background = 'white';
const snake_col = 'white';
const snake_border = 'black';

// Snake Start Position
let snake = [
	{ x: 100, y: 200 },
	{ x: 90, y: 200 },
	{ x: 80, y: 200 },
	{ x: 70, y: 200 },
	{ x: 60, y: 200 }
];

// Game Parameters
let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

// Game Board Canvas Variables
const snakeboard = document.getElementById('snakeboard');
const snakeboard_ctx = snakeboard.getContext('2d');

// Starts Game
document.getElementById('start-btn').addEventListener('click', function () {
	main();
	gen_food();
	changeText();
});

// Page Refresh
document.getElementById('refresh-btn').addEventListener('click', function () {
	refreshPage();
});

function refreshPage() {
	window.location.reload();
}

// 2x Mode
function changeText() {
	document.getElementById('start-btn').innerHTML = '2x Speed';
}

// Snake Moves Direction With Keys
document.addEventListener('keydown', change_direction);

// Game Run
function main() {
	if (has_game_ended()) return;

	changing_direction = false;
	setTimeout(function onTick() {
		clear_board();
		drawFood();
		move_snake();
		drawSnake();
		main();
	}, 100);
}

// Draw Game Board
function clear_board() {
	snakeboard_ctx.fillStyle = board_background;
	snakeboard_ctx.strokestyle = board_border;
	snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
	snakeboard_ctx.lineWidth = 2;
}

// Draw Snake
function drawSnake() {
	snake.forEach(drawSnakePart);
}

// Draw Food
function drawFood() {
	snakeboard_ctx.fillStyle = 'black';
	snakeboard_ctx.strokestyle = 'white';
	snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
	snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

// Draw Snake Cube
function drawSnakePart(snakePart) {
	snakeboard_ctx.fillStyle = snake_col;
	snakeboard_ctx.strokestyle = snake_border;
	snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Game End Parameters
function has_game_ended() {
	for (let i = 4; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
	}
	const hitLeftWall = snake[0].x < 0;
	const hitRightWall = snake[0].x > snakeboard.width - 10;
	const hitTopWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > snakeboard.height - 10;
	return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Food Randomizer
function random_food(min, max) {
	return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

// Food Generator
function gen_food() {
	food_x = random_food(0, snakeboard.width - 10);
	food_y = random_food(0, snakeboard.height - 10);
	snake.forEach(function has_snake_eaten_food(part) {
		const has_eaten = part.x == food_x && part.y == food_y;
		if (has_eaten) gen_food();
	});
}

// Game Pad Key
function change_direction(event) {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;

	if (changing_direction) return;
	changing_direction = true;
	const keyPressed = event.keyCode;
	const goingUp = dy === -10;
	const goingDown = dy === 10;
	const goingRight = dx === 10;
	const goingLeft = dx === -10;
	if (keyPressed === LEFT_KEY && !goingRight) {
		dx = -10;
		dy = 0;
	}
	if (keyPressed === UP_KEY && !goingDown) {
		dx = 0;
		dy = -10;
	}
	if (keyPressed === RIGHT_KEY && !goingLeft) {
		dx = 10;
		dy = 0;
	}
	if (keyPressed === DOWN_KEY && !goingUp) {
		dx = 0;
		dy = 10;
	}
}

// Snake Body, Move, And Score
function move_snake() {
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);
	const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
	if (has_eaten_food) {
		score += 10;
		document.getElementById('score').innerHTML = score;
		gen_food();
	} else {
		snake.pop();
	}
}
