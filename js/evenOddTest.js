const min = 10;
const max = 99;
const average = document.getElementById("average");
const resultDiv = document.getElementById("result");
let startTime;
let a;
let b;
let attempts = 0;
const maxAttempts = 5;
let totalReactionTime = 0;
let averageReactionTime;
name = 'Оценка скорости реакции на сложение в уме(текст)'
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
    let wrong = 0;
    let time = performance.now() - startTime;
    if ((answer === "четное" && (a + b) % 2 === 0) || (answer === "нечетное" && (a + b) % 2 !== 0)) {
        resultDiv.innerText = `Ваше время реакции: ${(time).toFixed(2)} миллисекунд.`;
        document.querySelector(".start").style.display = "block";
        totalReactionTime += time;
    } else {
        resultDiv.innerText = "Ошибочка(";
        wrong++;
    }
    averageReactionTime = totalReactionTime / (attempts - wrong);
    if (attempts === maxAttempts) {
        average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;

        //sendForm
        document.getElementById("test_name").value = name;
        document.getElementById("avg_time").value = averageReactionTime.toFixed(2);
        document.getElementById("total_time").value = totalReactionTime.toFixed(2);
        document.getElementById("correct").value = maxAttempts - wrong;
        document.getElementById("misses").value = wrong;
        document.getElementById("submit-button").click();
        //sendForm
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