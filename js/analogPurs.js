const ball1 = document.getElementById("ball1");
const ball2 = document.getElementById("ball2");
const startButton = document.getElementById("startButton");
const score = document.getElementById("score");
const reaction = document.getElementById("reaction");
let lastDirectionChangeTime = 0;
let ball2Position = 0;
let ball1Position = 0;
let ball1Direction = "right";
let startTime = 0;
let testTime = 30000;
let reactionTime = 0;
const startTest = () => {
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
    lastDirectionChangeTime = 0;
    startTime = new Date().getTime();
    const scores = [];
    const reactions = [];
    setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5) {
            ball1Direction = ball1Direction === "right" ? "left" : "right";
            const elapsedTime = new Date().getTime() - startTime;
            const reactionTime = elapsedTime - lastDirectionChangeTime;
            reactions.push(reactionTime);
        }
    }, 2000);
    setTimeout(() => {
        clearInterval(ball1MoveInterval);
        clearInterval(ball1DirectionChangeInterval);
        clearInterval(checkCollisionInterval);
        startButton.style.display = "block";
        startButton.disabled = false;

        const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
        const avgReaction = (reactions.reduce((a, b) => a + b, 0) / reactions.length / 1000).toFixed(2);
        score.innerText = `Среднее значение совпадения с шариком: ${avgScore}%`;
        reaction.innerText = `Среднее значение скорости реакции на изменение движения шарика: ${avgReaction} с/шарик`;
        //sendForm
        document.getElementById("avg_time").value = avgReaction;
        document.getElementById("correct").value = avgScore;
        document.getElementById("submit-button").click();
        //sendForm
    }, testTime);
    startButton.style.display = "none";
    const ball1MoveInterval = setInterval(() => {
        if (ball1Direction === "right") {
            ball1Position += 10;
            if (ball1Position >= container.clientWidth - 50) {
                ball1Direction = "left";
            }
        } else {
            ball1Position -= 10;
            if (ball1Position <= 0) {
                ball1Direction = "right";
            }
        }
        ball1.style.left = ball1Position + "px";
    }, 50);

    const ball1DirectionChangeInterval = setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5) {
            ball1Direction = ball1Direction === "right" ? "left" : "right";
            const elapsedTime = new Date().getTime() - startTime;
            const percentMatch = ((elapsedTime / testTime) * 100).toFixed(2);
            scores.push(Math.max(percentMatch, 0));
            lastDirectionChangeTime = elapsedTime;
        }
    }, 2000);

    const checkCollisionInterval = setInterval(() => {
        const ball1Position = ball1.offsetLeft;
        const ball2Position = ball2.offsetLeft;
        if (ball1Position === ball2Position) {
            const elapsedTime = new Date().getTime() - startTime;
            const reactionTime = elapsedTime - lastDirectionChangeTime;
            const speed = (reactionTime / 1000).toFixed(2);
            const percentMatch = ((elapsedTime / testTime) * 100).toFixed(2);
            score.innerText = `Совпадение с шариком: ${Math.max(percentMatch, 0)}%`;
            reaction.innerText = `Cкорость реакции на изменение движения шарика: ${speed} с/шарик`;
            lastDirectionChangeTime = elapsedTime;
        }


    }, 50);
};
const moveBall2 = (direction) => {
    if (direction === "right") {
        ball2Position += 10;
    } else if (direction === "left") {
        ball2Position -= 10;
    }
    ball2.style.left = ball2Position + "px";
};
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveBall2("left");
    } else if (event.key === "ArrowRight") {
        moveBall2("right");
    }
});
ball1.addEventListener("click", () => {
    ball1Direction = ball1Direction === "right" ? "left" : "right";
    reactionTime = new Date().getTime() - startTime;
});

startButton.addEventListener("click", startTest);