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

let startTimeFirstDigit;
let timeToSpeakDigits;

function startTest() {
    document.querySelector(".start").style.display = "none"
    attempts++;
    if (attempts > maxAttempts) {
        return;
    }
    const [a, b] = generateNumbers();
    let audio = new SpeechSynthesisUtterance(`${a} плюс ${b}`)
    audio.lang = 'ru-RU';
    audio.onboundary = function (event) {
        if (event.charIndex === 0) {
            startTimeFirstDigit = performance.now();
        } else {
            timeToSpeakDigits = performance.now() - startTimeFirstDigit;
        }
    }
    window.speechSynthesis.speak(audio);

    startTime = performance.now();
    return [a, b];
}

function checkAnswer(answer) {
    let wrong = 0
    const time = performance.now() - startTime - timeToSpeakDigits;
    if (answer === "четное" && (a + b) % 2 === 0 || answer === "нечетное" && (a + b) % 2 !== 0) {
        if (time.toFixed(2) < 0) {
            resultDiv.innerText = "А вот так вот не надо...";
        } else {
            resultDiv.innerText = `Ваше время реакции: ${time.toFixed(2)} миллисекунд.`;
            document.querySelector(".start").style.display = "block";
            totalReactionTime += time;
        }
    } else {
        if (time.toFixed(2) < 0) {
            resultDiv.innerText = "А вот так вот не надо...";
        } else {
            resultDiv.innerText = "Ошибочка(";
            wrong++;
        }
    }
    averageReactionTime = totalReactionTime / (attempts - wrong);
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
