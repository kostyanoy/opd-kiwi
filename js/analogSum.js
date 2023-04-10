const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const CENTER_MARK_X = CANVAS_WIDTH / 2;
const CENTER_MARK_Y = CANVAS_HEIGHT / 2;
const BALL_RADIUS = 20;
const BALL_SPEED = 3;
const MAX_ATTEMPTS = 10;
const CORRECT_KEY_CODES = [37, 39];
let ballX = CENTER_MARK_X;
let ballY = CENTER_MARK_Y;
let ballDirection = -1;
let correctDirection = null;
let correctKeyPressed = false;
let reactionTime = null;
let numOfCorrectAttempts = 0;
let numOfAttempts = 0;
let MAX_BALL_SPEED=0.7;
let MIN_BALL_SPEED =0.2;
let MAX_BALL_ACCELERATION = 0;
let MIN_BALL_ACCELERATION = 0;
let ballAcceleration = Math.random() * MAX_BALL_ACCELERATION + MIN_BALL_ACCELERATION;
function init() {
    ballAcceleration = Math.random() * MAX_BALL_ACCELERATION + MIN_BALL_ACCELERATION;
    canvasContext = document.getElementById('canvas').getContext('2d');
    ballX = CENTER_MARK_X;
    ballY = CANVAS_HEIGHT / 2;
    ballDirection = Math.random() < 0.5 ? -1 : 1;
    correctDirection = null;
    reactionTime = null;
    correctKeyPressed = false;
    numOfAttempts = 0;
    numOfCorrectAttempts = 0;
    isRunning = false;
    resultsList.innerText = '';
}


function drawBall() {
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI*2);
    canvasContext.fillStyle = 'blue';
    canvasContext.fill();
    canvasContext.closePath();
}

function drawCenterMark() {
    canvasContext.beginPath();
    canvasContext.moveTo(CENTER_MARK_X, 0);
    canvasContext.lineTo(CENTER_MARK_X, CANVAS_HEIGHT);
    canvasContext.strokeStyle = 'orange';
    canvasContext.stroke();
    canvasContext.closePath();
}

function draw() {
    if (ballX < -BALL_RADIUS || ballX > CANVAS_WIDTH + BALL_RADIUS) {
        ballX = null;
    }

    if (ballX == null) {
        ballX = CENTER_MARK_X;
        ballY = CANVAS_HEIGHT / 2;
        correctDirection = null;
        reactionTime = null;
        correctKeyPressed = false;
        numOfAttempts++;
        attempts++;
    } else {
        if (ballX < BALL_RADIUS) {
            ballX = BALL_RADIUS;
        } else if (ballX > CANVAS_WIDTH - BALL_RADIUS) {
            ballX = CANVAS_WIDTH - BALL_RADIUS;
        }

        canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawCenterMark();
        drawBall();

        ballX += ballDirection * BALL_SPEED;

        if (correctKeyPressed) {
            ballDirection = Math.random() < 0.5 ? -1 : 1;
            ballSpeed = Math.random() * MAX_BALL_SPEED + MIN_BALL_SPEED;
            ballX = CENTER_MARK_X;
            correctKeyPressed = false;
            if (ballDirection === -correctDirection) {
                numOfCorrectAttempts++;
                resultsList.innerText += `Реакция: ${reactionTime.toFixed(2)}мс, Результат: ВЕРНО\n`;
            } else {
                correctDirection = ballDirection;
                resultsList.innerText += `Реакция: ${reactionTime.toFixed(2)}мс, Результат: НЕВЕРНО\n`;
            }
            reactionTime = null; // сброс времени для следующей попытки
        }

        if (ballX < CENTER_MARK_X - (CANVAS_WIDTH / 2) || ballX > CENTER_MARK_X + (CANVAS_WIDTH / 2)) {
            ballDirection = -ballDirection;
            ballX = CENTER_MARK_X + ballDirection * (CANVAS_WIDTH / 2);
            numOfAttempts++;
            attempts++;
            resultsList.innerText += ` Реакция: ${reactionTime.toFixed(2)}-мс, Результат: НЕВЕРНО`;
            reactionTime = null; // сброс времени для следующей попытки
        }

        if (correctDirection !== null && reactionTime === null) {
            reactionTime = Date.now(); // начало замера времени для текущей попытки
        }
    }

    if (isRunning) {
        if (numOfAttempts >= MAX_ATTEMPTS) {
            stop();
        } else {
            requestAnimationFrame(draw);
        }
    }
}




function start() {
    init();
    if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(draw);
        document.getElementById('startBtn').style.display = 'none';
    }
}
function stop() {
    isRunning = false;
    document.getElementById('startBtn').style.display = 'block';
}

let startTime;

function handleKeyDown(event) {
    if (CORRECT_KEY_CODES.includes(event.keyCode)) {
        if (correctDirection === null && !correctKeyPressed) {
            correctDirection = event.keyCode === 37 ? -1 : 1;
            reactionTime = Date.now();
        }
        if (!correctKeyPressed) {
            correctKeyPressed = true;
            numOfAttempts++;
        }
        reactionTime = Date.now() - reactionTime;
    }
}



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startBtn').addEventListener('click', start);
    document.addEventListener('keydown', handleKeyDown);
});
function openModalW() {
    document.getElementById("modal").style.display = "block";
}

function closeModalW() {
    document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
