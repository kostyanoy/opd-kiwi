let currentSequence = 0;
const sequences = [
    generateSequence1,
    generateSequence2,
    generateSequence3,
    generateSequence4,
    generateSequence5,
    generateSequence6,
    generateSequence7,
    generateSequence8,
    generateSequence9,
    generateSequence10,
];

let numCorrect = 0;
let numDisplayed = 0;

document.getElementById("answer-input").style.display = "none";
document.getElementById("next").style.display = "none";
document.getElementById("end-test").style.display = "none";

function start() {
    numCorrect = 0;
    numDisplayed = 0;
    currentSequence = 0;
    displaySequence();
    document.getElementById("answer").value = "";
    document.getElementById("end-test").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("answer-input").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("test-end").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("scoreMy").innerHTML = "";
    document.getElementById("answer").disabled = false; // added this line
}


function endTest() {
    document.getElementById("end-test").style.display = "none";
    const startButton = document.getElementById("start-button");
    startButton.style.display = "block"; // Отобразить кнопку "Начать"
    const percentage = Math.round((numCorrect / numDisplayed) * 100);
    const resultString = `${numCorrect} из ${numDisplayed} (${percentage}%) правильных ответов`;
    document.getElementById("test-end").innerHTML = `Тест завершен. Результат: ${resultString}.`;
    document.getElementById("sequence").innerHTML = "";
    document.getElementById("answer-input").style.display = "none";
    document.getElementById("answer").disabled = true;
    document.getElementById("next").style.display = "none";
    document.getElementById("end-test").style.display = "none";
    document.getElementById("scoreMy").innerHTML = "";
    startButton.addEventListener("click", start);
    document.body.appendChild(startButton);
    //sendForm
    document.getElementById("correct").value = percentage;
    document.getElementById("score").value = percentage;
    document.getElementById("submit-button").click();
    //sendForm
}
function nextSequence() {
    currentSequence++;
    if (currentSequence >= sequences.length) {
        const percentage = Math.round(numCorrect / numDisplayed * 100);
        const resultString = `${numCorrect} из ${numDisplayed}  (${percentage}%)`;
        document.getElementById("name").innerHTML = `Продолжите текущую последовательность:`;
        document.getElementById("result").innerHTML = resultString;
        document.getElementById("sequence").innerHTML = "";
        document.getElementById("answer-input").style.display = "none";
        document.getElementById("answer").value = "";
        document.getElementById("answer-input").style.display = "block";
        document.getElementById("answer").disabled = false;

        return;
    }
    displaySequence();
    if (currentSequence === sequences.length - 1) {
        document.getElementById("next").style.display = "none";
        document.getElementById("end-test").style.display = "block";
    }
}


function displaySequence() {
    const sequenceFunc = sequences[currentSequence];
    if (typeof sequenceFunc === "function") {
        const sequence = sequenceFunc();
        const sequenceString = sequence.join(", ");
        document.getElementById("sequence").innerHTML = ` ${currentSequence + 1}: ${sequenceString}...`;
        document.getElementById("answer").value = "";
        document.getElementById("scoreMy").innerHTML = `Правильных ответов: ${numCorrect}`;
        numDisplayed++;
        document.getElementById('progress').value = ((numDisplayed / sequences.length) * 100).toFixed(0);
    }
}



function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    let isCorrect = false;
    let correctAnswer;
    switch (currentSequence) {
        case 0:
            correctAnswer = correctAnswer1;
            break;
        case 1:
            correctAnswer = correctAnswer2;
            break;
        case 2:
            correctAnswer = correctAnswer3;
            break;
        case 3:
            correctAnswer = correctAnswer4;
            break;
        case 4:
            correctAnswer = correctAnswer5;
            break;
        case 5:
            correctAnswer = correctAnswer6;
            break;
        case 6:
            correctAnswer = correctAnswer7;
            break;
        case 7:
            correctAnswer = correctAnswer8;
            break;
        case 8:
            correctAnswer = correctAnswer9;
            break;
        case 9:
            correctAnswer = correctAnswer10;
            break
    }
    if (userAnswer === correctAnswer) {
        document.getElementById("scoreMy").innerHTML = "Правильно!";
        numCorrect++;
        isCorrect = true;
    } else {
        document.getElementById("scoreMy").innerHTML = `Неправильно. Правильный ответ: ${correctAnswer}`;
    }
    return isCorrect;
}



let correctAnswer1;
function generateSequence1() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start % 2 === 0 ? start + 1 : start;
    sequence.push(x);
    for (let i = 1; i < 9; i++) {
        x += 2;
        if (i === 8) {
            correctAnswer1 = x;
        } else {
            sequence.push(x);
        }
    }
    return sequence;
}
let correctAnswer2;
function generateSequence2() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start % 2 === 0 ? start + 1 : start;
    sequence.push(x);
    for (let i = 1; i < 9; i++) {
        x += 3;
        if (i === 8) {
            correctAnswer2 = x;
        } else {
            sequence.push(x);
        }
    }
    return sequence;
}
let correctAnswer3;
function generateSequence3() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start % 2 === 0 ? start + 1 : start;
    sequence.push(x);
    for (let i = 0; i < 9; i++) {
        x *= 2;
        if (i === 8) {
            correctAnswer3 = x;
        } else {
            sequence.push(x);
        }
    }
    return sequence;
}
let correctAnswer4;
function generateSequence4() {
    const sequence = [0, 1];
    let x = 1;
    for (let i = 2; i < 9; i++) {
        x=(sequence[i - 2] + sequence[i - 1]);
        if (i === 8) {
            correctAnswer4 = x;
        } else {
            sequence.push(x);
        }
    }
    return sequence;
}
let correctAnswer5;
function generateSequence5() {
    const sequence = [1];
    let x = 1;
    for (let i = 1; i < 4; i++) {
        x = (x + 1) * (x + 1);
        if (i === 3) {
            correctAnswer5 = x;
        } else {
            sequence.push(x);
        }
    }
    return sequence;
}
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0) return false;
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

let correctAnswer6;

function generateSequence6() {
    const sequence = [];
    let x = 2;
    while (sequence.length < 8) {
        if (isPrime(x)) {
            sequence.push(x);
        }
        x++;
    }
    correctAnswer6 = 23;
    return sequence;
}


let correctAnswer7;
function generateSequence7() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start;
    sequence.push(x);
    for (let i = 1; i < 9; i++) {
        x -= 7;
        if (i === 8) {
            correctAnswer7 = x;
        } else {
            sequence.push(x);
        }
    }
    return sequence;
}

let correctAnswer8;
function generateSequence8() {
    const sequence = [];
    let sum = 0;
    const n = 4;
    for (let i = 1; i <= n; i++) {
        sum += i;
        sequence.push(sum);
    }
    correctAnswer8 = sum + (n + 1);
    return sequence;
}
let correctAnswer9;

function generateSequence9() {
    const sequence = [0, 1, 1];
    for (let i = 3; i < 9; i++) {
        const sum = sequence[i - 1] + sequence[i - 2] + sequence[i - 3];
        if (i === 8) {
            correctAnswer9 = 81;
        }
        sequence.push(sum);
    }
    return sequence;
}



let correctAnswer10;
function generateSequence10() {
    const sequence = [];
    for (let i = 0; i < 9; i++) {
        const powerOfTwo = Math.pow(2, i);
        if (i === 8) {
            correctAnswer10 = powerOfTwo;
        } else {
            sequence.push(powerOfTwo);
        }}
    return sequence;
}
