const canvas = document.getElementById('canvas');
const context1 = canvas.getContext('2d');
const context2 = canvas.getContext('2d');
const context3 = canvas.getContext('2d');
const progress1 = document.getElementById("progress1");
const progress2 = document.getElementById("progress2");
const progress3 = document.getElementById("progress3");
const startButton = document.getElementById("startButton");
let theResult;
const circleX1 = 200;
const circleY1 = 200;
const circleX2 = 600;
const circleY2 = 200;
const circleX3 = 1000;
const circleY3 = 200;
const circleRadius = 150;
const pointRadius = 10;
let totalAccuracy1 = 0;
let totalAttempts1 = 0;
let totalAccuracy2 = 0;
let totalAttempts2 = 0;
let totalAccuracy3 = 0;
let totalAttempts3 = 0;
const point1 = {
    x: circleX1 + circleRadius,
    y: circleY1
};
const point2 = {
    x: circleX2 + circleRadius,
    y: circleY2
};
const point3 = {
    x: circleX3 + circleRadius,
    y: circleY3
};
let fixedPointX1;
let fixedPointY1;
let fixedPointX2;
let fixedPointY2;
let fixedPointX3;
let fixedPointY3;

let count1 = 0;
let totalDistance1 = 0;
let theResult1 = 0;
let count2 = 0;
let totalDistance2 = 0;
let theResult2 = 0;
let count3 = 0;
let totalDistance3 = 0;
let theResult3 = 0;

function calculateFixedPoint() {
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.random() * Math.PI * 2;
    const angle3 = Math.random() * Math.PI * 2;
    fixedPointX1 = circleX1 + Math.cos(angle1) * circleRadius;
    fixedPointY1 = circleY1 + Math.sin(angle1) * circleRadius;
    fixedPointX2 = circleX2 + Math.cos(angle2) * circleRadius;
    fixedPointY2 = circleY2 + Math.sin(angle2) * circleRadius;
    fixedPointX3 = circleX3 + Math.cos(angle3) * circleRadius;
    fixedPointY3 = circleY3 + Math.sin(angle3) * circleRadius;
}

function drawCircle() {
    context1.beginPath();
    context1.arc(circleX1, circleY1, circleRadius, 0, Math.PI * 2);
    context1.strokeStyle ='blue';
    context1.stroke();
    context2.beginPath();
    context2.arc(circleX2, circleY2, circleRadius, 0, Math.PI * 2);
    context2.strokeStyle = 'orange';
    context2.stroke();
    context3.beginPath();
    context3.arc(circleX3, circleY3, circleRadius, 0, Math.PI * 2);
    context3.strokeStyle = 'red';
    context3.stroke();
}

function drawPoint() {
    context1.beginPath();
    context1.arc(point1.x, point1.y, pointRadius, 0, Math.PI * 2);
    context1.fillStyle = 'orange';
    context1.fill();
    context2.beginPath();
    context2.arc(point2.x, point2.y, pointRadius, 0, Math.PI * 2);
    context2.fillStyle = 'green';
    context2.fill();
    context3.beginPath();
    context3.arc(point3.x, point3.y, pointRadius, 0, Math.PI * 2);
    context3.fillStyle = 'blue';
    context3.fill();
}

function drawFixedPoint() {
    context1.beginPath();
    context1.arc(fixedPointX1, fixedPointY1, pointRadius, 0, Math.PI * 2);
    context1.stroke();
    context2.beginPath();
    context2.arc(fixedPointX2, fixedPointY2, pointRadius, 0, Math.PI * 2);
    context2.stroke();
    context3.beginPath();
    context3.arc(fixedPointX3, fixedPointY3, pointRadius, 0, Math.PI * 2);
    context3.stroke();
}

function updatePointPosition() {
    const angle1 = performance.now() / 600;
    point1.x = circleX1 + Math.cos(angle1) * circleRadius;
    point1.y = circleY1 + Math.sin(angle1) * circleRadius;
    const angle2 = performance.now() / 300;
    point2.x = circleX2 + Math.cos(angle2) * circleRadius;
    point2.y = circleY2 + Math.sin(angle2) * circleRadius;
    const angle3 = performance.now() / 100;
    point3.x = circleX3 + Math.cos(angle3) * circleRadius;
    point3.y = circleY3 + Math.sin(angle3) * circleRadius;
}


function firstCircle() {
    const distance = Math.sqrt((point1.x - fixedPointX1) ** 2 + (point1.y - fixedPointY1) ** 2);
    totalDistance1 += distance;
    count1++;
    progress1.value = ((count1 / 70).toFixed(2) * 100).toFixed(0);
    showResult1();
}

function secondCircle() {
    const distance = Math.sqrt((point2.x - fixedPointX2) ** 2 + (point2.y - fixedPointY2) ** 2);
    totalDistance2 += distance;
    count2++;
    progress2.value = ((count2 / 115).toFixed(2) * 100).toFixed(0);
    showResult2();
}

function thirdCircle() {
    const distance = Math.sqrt((point3.x - fixedPointX3) ** 2 + (point3.y - fixedPointY3) ** 2);
    totalDistance3 += distance;
    count3++;
    progress3.value = ((count3 / 300).toFixed(2) * 100).toFixed(0);
    showResult3();
}

function showOverallResult() {
    const averageAccuracy = ((theResult1 + theResult2 + theResult3) / 90).toFixed(0);
    document.getElementById('result').innerText = `Ваша средняя точность: ${averageAccuracy}%`;
    startButton.style.display = 'block';
    startButton.disabled = false;
    //sendForm
    document.getElementById("avg_time").value = averageAccuracy;
    document.getElementById("score").value = averageAccuracy;
    document.getElementById("submit-button").click();
    //sendForm
}

function showResult1() {
    const averageDistance1 = totalDistance1;
    totalDistance1 = 0;
    let accuracy;
    accuracy = 100 - (averageDistance1 / circleRadius * 100);
    if (accuracy < 0) {
        accuracy = 0;
    }
    theResult1 = theResult1 + accuracy;
    totalAccuracy1 += accuracy;
    totalAttempts1++;
    const averageAccuracy1 = totalAccuracy1 / totalAttempts1;
    document.getElementById('result1').innerText = `${accuracy.toFixed(0)}%`;
    if (count1 === 70 && count2 === 115 && count3 === 300){
        showOverallResult();
        document.getElementById('result1').innerText = `${averageAccuracy1.toFixed(0)}%`;
    }
}

function showResult2() {
    const averageDistance2 = totalDistance2;
    totalDistance2 = 0;
    let accuracy;
    accuracy = 100 - (averageDistance2 / circleRadius * 100);
    if (accuracy < 0) {
        accuracy = 0;
    }
    theResult2 = theResult2 + accuracy;
    totalAccuracy2 += accuracy;
    totalAttempts2++;
    const averageAccuracy2 = totalAccuracy2 / totalAttempts2;
    document.getElementById('result2').innerText = `${accuracy.toFixed(0)}%`;
    if (count1 === 70 && count2 === 115 && count3 === 300){
        showOverallResult();
        document.getElementById('result2').innerText = `${averageAccuracy2.toFixed(0)}%`;
    }
}

function showResult3() {
    const averageDistance1 = totalDistance3;
    totalDistance3 = 0;
    let accuracy;
    accuracy = 100 - (averageDistance1 / circleRadius * 100);
    if (accuracy < 0) {
        accuracy = 0;
    }
    theResult3 = theResult3 + accuracy;
    totalAccuracy3 += accuracy;
    totalAttempts3++;
    const averageAccuracy3 = totalAccuracy3 / totalAttempts3;
    document.getElementById('result3').innerText = `${accuracy.toFixed(0)}%`;
    if (count1 === 70 && count2 === 115 && count3 === 300){
        showOverallResult();
        document.getElementById('result3').innerText = `${averageAccuracy3.toFixed(0)}%`;
    }
}
function loop() {
    context1.clearRect(0, 0, 400, canvas.height);
    context2.clearRect(400, 0, 800, canvas.height);
    context3.clearRect(800, 0, 1200, canvas.height);
    drawCircle();
    drawFixedPoint();
    updatePointPosition();
    drawPoint();
    requestAnimationFrame(loop);
}

calculateFixedPoint();
loop();

startButton.addEventListener("click", function() {
    startButton.style.display = 'none';
    startButton.disabled = true;
    count = 0;
    theResult = 0;
    totalAccuracy1 = 0;
    totalAttempts1 = 0;
    totalAccuracy2 = 0;
    totalAttempts2 = 0;
    totalAccuracy3 = 0;
    totalAttempts3 = 0;
    count1 = 0;
    totalDistance1 = 0;
    theResult1 = 0;
    count2 = 0;
    totalDistance2 = 0;
    theResult2 = 0;
    count3 = 0;
    totalDistance3 = 0;
    theResult3 = 0;
    calculateFixedPoint();
    drawCircle();
    drawFixedPoint();
    updatePointPosition();
    drawPoint();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Digit1' && count1 < 70 && startButton.disabled === true) {
        firstCircle();
    }
    if (event.code === 'Digit2' && count2 < 115 && startButton.disabled === true) {
        secondCircle();
    }
    if (event.code === 'Digit3' && count3 < 300 && startButton.disabled === true) {
        thirdCircle();
    }
});
