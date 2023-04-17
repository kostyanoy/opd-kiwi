const container = document.getElementById("container");
const ball = document.getElementById("ball");
const startButton = document.getElementById("startButton");
const mark = document.createElement("div");
mark.classList.add("mark");
mark.style.left = (container.offsetWidth / 2 - 5) + "px";
container.appendChild(mark);
const reactionT = document.getElementById('reaction')
const score = document.getElementById("score");
let currentPosition = 0;
let direction = "right";
let randomDirectionInterval;
let moveBallInterval;
let resistance = 1;
let numHits = 0;
let count = 0;
const reactionValues = [];
const deviationValues = [];

function startMovingBall() {
    const progress = document.getElementById("progress");
    let value = 0;
    const intervalId = setInterval(() => {
        value++;
        progress.value = value;

        if (value === 30) {
            clearInterval(intervalId);
        }
    }, 1000);
    startButton.style.display = "none";
    moveBallInterval = setInterval(() => {
        if (direction === "right") {
            currentPosition += 10 * resistance;
            if (currentPosition >= container.offsetWidth - ball.offsetWidth) {
                direction = "left";
            }
        } else {
            currentPosition -= 10 * resistance;
            if (currentPosition <= 0) {
                direction = "right";
            }
        }
        ball.style.left = currentPosition + "px";
        const ballRight = currentPosition + ball.offsetWidth;
        const markLeft = mark.offsetLeft;
        const markRight = mark.offsetLeft + mark.offsetWidth;
        if (ballRight >= markLeft && currentPosition <= markRight) {
            resistance = 0.6;
            if (currentPosition + ball.offsetWidth / 2 === markLeft + mark.offsetWidth / 2) {
                numHits++;
                calculateHitPercentage(progress);
            }
        } else {
            resistance = 1;
        }

    }, 20);

    randomDirectionInterval = setInterval(() => {
        if (Math.random() < 0.5) {
            direction = "left";
        } else {
            direction = "right";
        }
    }, 1000);
    document.addEventListener("keydown", (event) => {
        const reactionT = document.getElementById('reaction')
        if (event.key === "ArrowLeft") {
            direction = "left";
            if (direction === "right") {
                resistance = 2;
            } else {
                resistance = 0.5;
            }
        } else if (event.key === "ArrowRight") {
            direction = "right";
            if (direction === "left") {
                resistance = 2;
            } else {
                resistance = 0.5;
            }
        }
        const ballRight = currentPosition + ball.offsetWidth;
        const markLeft = mark.offsetLeft;
        const markRight = mark.offsetLeft + mark.offsetWidth;
        const distanceToMark = Math.min(Math.abs(ballRight - markLeft), Math.abs(currentPosition - markRight));
        const reaction = distanceToMark / 10;
        reactionValues.push(reaction.toFixed(2));
        reactionT.innerText = `Cкорость реакции на изменение движения шарика: ${reactionValues[reactionValues.length - 1]} с/шарик`;
    });
    function calculateHitPercentage(progress) {
        const deviation = Math.abs(currentPosition + ball.offsetWidth / 2 - mark.offsetLeft - mark.offsetWidth / 2 + mark.offsetWidth / 2 - ball.offsetWidth / 2);
        const containerWidth = container.offsetWidth;
        const deviationPercentage = ((containerWidth / 2 - deviation) / (containerWidth / 2)) * 100;
        deviationValues.push(Math.abs(deviationPercentage.toFixed(2)));
        score.innerText = `Процент отклонения от средней границы: ${deviationValues[deviationValues.length - 1]}%`;
    }

    setInterval(() => {
        calculateHitPercentage(progress);
    }, 2000);
    setTimeout(() => {
        clearInterval(moveBallInterval);
        clearInterval(randomDirectionInterval);
        startButton.style.display = "block";
        const reactionAverage = reactionValues.reduce((acc, val) => acc + Number(val), 0) / reactionValues.length;
        const deviationAverage = deviationValues.reduce((acc, val) => acc + Number(val), 0) / deviationValues.length;
        reactionT.innerText =` Средняя скорость реакции на изменение движения шарика: ${reactionAverage.toFixed(2)} с/шарик`;
        score.innerText = `Среднее отклонение от средней границы: ${deviationAverage.toFixed(2)}%`;

    }, 30000);}
startButton.addEventListener("click", startMovingBall);
