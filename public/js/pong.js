// Parse Pong

// Get Canvas & Context
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Starts Game
document.getElementById('start-btn').addEventListener('click', function () {
	gameStart();
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

// Pong Ball
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	velocityX: 5,
	velocityY: 5,
	speed: 7,
	color: 'WHITE'
};

// User Paddle
const user = {
	x: 0, // left side of canvas
	y: (canvas.height - 100) / 2, // -100 the height of paddle
	width: 10,
	height: 100,
	score: 0,
	color: 'WHITE'
};

// Computer Paddle
const com = {
	x: canvas.width - 10, // - width of paddle
	y: (canvas.height - 100) / 2, // -100 the height of paddle
	width: 10,
	height: 100,
	score: 0,
	color: 'WHITE'
};

// Net
const net = {
	x: (canvas.width - 2) / 2,
	y: 0,
	height: 10,
	width: 2,
	color: 'WHITE'
};

// Draw Paddle
function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

// Draw Ball
function drawArc(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

// Mouse Listener
canvas.addEventListener('mousemove', getMousePos);

function getMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	user.y = evt.clientY - rect.top - user.height / 2;
}

// When Scored, Reset Ball
function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.velocityX = -ball.velocityX;
	ball.speed = 7;
}

// Draw Net
function drawNet() {
	for (let i = 0; i <= canvas.height; i += 15) {
		drawRect(net.x, net.y + i, net.width, net.height, net.color);
	}
}

// Draw Score Text
function drawText(text, x, y) {
	ctx.fillStyle = '#FFF';
	ctx.font = '75px Helvetica Neue';
	ctx.fillText(text, x, y);
}

// Collision Detection
function collision(b, p) {
	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right = p.x + p.width;
	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;
	return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// Game Logic
function update() {
	if (ball.x - ball.radius < 0) {
		com.score++;
		resetBall();
	} else if (ball.x + ball.radius > canvas.width) {
		user.score++;
		resetBall();
	}
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
	com.y += (ball.y - (com.y + com.height / 1.5)) * 0.1;

	if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
		ball.velocityY = -ball.velocityY;
	}

	let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

	if (collision(ball, player)) {
		let collidePoint = ball.y - (player.y + player.height / 2);
		collidePoint = collidePoint / (player.height / 2);

		let angleRad = (Math.PI / 4) * collidePoint;

		let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);
		ball.speed += 0.1;
	}
}

// Draw Game
function render() {
	drawRect(0, 0, canvas.width, canvas.height, '#000');
	drawText(user.score, canvas.width / 4, canvas.height / 5);
	drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);
	drawNet();
	drawRect(user.x, user.y, user.width, user.height, user.color);
	drawRect(com.x, com.y, com.width, com.height, com.color);
	drawArc(ball.x, ball.y, ball.radius, ball.color);
}

// Game Function
function game() {
	update();
	render();
}

// Frames
let framePerSecond = 50;

// Game Call
function gameStart() {
	const loop = setInterval(game, 1000 / framePerSecond);
}
