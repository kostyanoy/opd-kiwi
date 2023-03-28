const min = 10;
const max = 99;
const questionDiv = document.getElementById("question");
const average = document.getElementById("average");
const resultDiv = document.getElementById("result");
let startTime;
let a;
let b;
let attempts = 0;
const maxAttempts = 5;
let totalReactionTime = 0;
let averageReactionTime;

function generateNumbers() {
    a = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;
    return [a, b];
}

function startTest() {
    document.querySelector(".start").style.display = "none"
    attempts++;
    if (attempts > maxAttempts) {
        return;
    }
    const [a, b] = generateNumbers();
    resultDiv.innerText = `${a}+${b}`;
    startTime = performance.now();
    return [a, b];
}

function checkAnswer(answer) {
    let time = performance.now() - startTime;
    if (answer === "четное" && (a + b) % 2 === 0 || answer === "нечетное" && (a + b) % 2 !== 0) {
        resultDiv.innerText = `Ваше время реакции: ${(time).toFixed(2)} миллисекунд.`;
        totalReactionTime+=time
        averageReactionTime = totalReactionTime / attempts;
    } else {
        resultDiv.innerText = "Ошибочка(";
    }
    document.querySelector(".start").style.display = "block";
    if (attempts === maxAttempts) {
        average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;
    }
}

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