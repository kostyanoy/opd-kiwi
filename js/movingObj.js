const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const startButton = document.getElementById("startButton");
const circleX = canvas.width / 2;
const circleY = canvas.height / 2;
const circleRadius = 150;
const pointRadius = 10;
const point = {
    x: circleX + circleRadius,
    y: circleY
};
let pointX;
let pointY;
let count = 0;
let totalDistance = 0;
let result = 0;
const resultDiv = document.getElementById("resultAns");

function calculateFixedPoint() {
    const angle = Math.random() * Math.PI * 2;
    pointX = circleX + Math.cos(angle) * circleRadius;
    pointY = circleY + Math.sin(angle) * circleRadius;
}

function pointDr() {
    context.beginPath();
    context.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
}

function circle() {
    context.beginPath();
    context.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    context.strokeStyle = 'blue';
    context.stroke();
}



function fixedPoint() {
    context.beginPath();
    context.arc(pointX, pointY, pointRadius, 0, Math.PI * 2);
    context.stroke();
}

function updatePosition() {
    const angle = performance.now() / 1000;
    point.x = circleX + Math.cos(angle) * circleRadius;
    point.y = circleY + Math.sin(angle) * circleRadius;
}

function spacePress() {
    const distance = Math.sqrt((point.x - pointX) ** 2 + (point.y - pointY) ** 2);
    totalDistance += distance;
    count++;
    document.getElementById('progress').value = ((count / 10).toFixed(2) * 100).toFixed(0);
    showResult();
}

function showResult() {
    const average = totalDistance;
    totalDistance = 0;
    let matchPercent;
    matchPercent = 100 - (average / circleRadius * 100);
    if (matchPercent < 0) {
        matchPercent = 0;
        resultDiv.innerText = `Ваш процент попадания: ${matchPercent.toFixed(2)}%`;
        result = result + matchPercent;
    } else {
        resultDiv.innerText = `Ваш процент попадания: ${matchPercent.toFixed(2)}%`;
        result = result + matchPercent;
    }
    let answer;
    if (count === 10) {
        answer = (result / 10).toFixed(0)
        resultDiv.innerText = `Ваш средний процент попадания: ${answer}%`;
        startButton.style.display = 'block';
        startButton.disabled = false;
        //sendForm
        document.getElementById("avg_time").value = answer;
        document.getElementById("score").value = answer;
        document.getElementById("submit-button").click();
        //sendForm
    }
}


function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    circle();
    fixedPoint();
    updatePosition();
    pointDr();
    requestAnimationFrame(loop);
}

calculateFixedPoint();
loop();

startButton.addEventListener("click", function () {
    startButton.style.display = 'none';
    startButton.disabled = true;
    count = 0;
    result = 0;
    const resultDivs = document.querySelectorAll('#result + div');
    resultDivs.forEach(div => div.remove());
    document.getElementById('result').innerText = '';
    calculateFixedPoint();
    loop();
});



document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && count < 10 && startButton.disabled === true) {
        spacePress();
    }
});
