const min = 10;
const max = 99;
let average = document.getElementById("average");
let resultDiv = document.getElementById("result");
let startTime;
let a;
let b;
let attempts = 0;
const maxAttempts = 30;
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
    let audio = new SpeechSynthesisUtterance(`${a} плюс ${b}`)
    audio.lang = 'ru-RU';
    window.speechSynthesis.speak(audio);

    startTime = performance.now();
    return [a, b];
}

function checkAnswer(answer) {
    const time = performance.now() - startTime;
    if (answer === "четное" && (a + b) % 2 === 0 || answer === "нечетное" && (a + b) % 2 !== 0) {
        if ((time - 2800).toFixed(2) < 0) {
            resultDiv.innerText = "А вот так вот не надо...";
        } else {
            resultDiv.innerText = `Ваше время реакции: ${(time - 2700).toFixed(2)} миллисекунд.`;
            document.querySelector(".start").style.display = "block";
            totalReactionTime += time - 2700;
            averageReactionTime = totalReactionTime / attempts;
        }
    } else {
        if ((time - 2800).toFixed(2) < 0) {
            resultDiv.innerText = "А вот так вот не надо...";
        } else {
            resultDiv.innerText = "Ошибочка(";
        }
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