const words = ['красный', 'зеленый', 'синий', 'оранжевый', 'желтый', 'розовый'];
const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'pink'];
let wordIndex;
let colorIndex;
let answer = '';
let count, correctAnswers, correctReactionTime, incorrectReactionTime = 0;
let startTime;
let averageReactionTime = 0;

document.getElementById('start').addEventListener('click', function () {
    document.getElementById('start').style.display = 'none';
    enableButtons();
    startTest();
});

function enableButtons() {
    document.getElementById('red').disabled = false;
    document.getElementById('green').disabled = false;
    document.getElementById('blue').disabled = false;
    document.getElementById('orange').disabled = false;
    document.getElementById('yellow').disabled = false;
    document.getElementById('pink').disabled = false;
}

function disableButtons() {
    document.getElementById('red').disabled = true;
    document.getElementById('green').disabled = true;
    document.getElementById('blue').disabled = true;
    document.getElementById('orange').disabled = true;
    document.getElementById('yellow').disabled = true;
    document.getElementById('pink').disabled = true;
}

function startTest() {
    document.getElementById('correctAnswers').innerHTML = '';
    document.getElementById('scoreMy').innerHTML = '';
    document.getElementById('progress').value = 0;
    count = 0;
    correctAnswers = 0;
    correctReactionTime = 0;
    incorrectReactionTime = 0;
    averageReactionTime = 0;
    document.getElementById('result').innerHTML = '';
    getNextWord();
}

function getNextWord() {
    wordIndex = Math.floor(Math.random() * words.length);
    colorIndex = Math.floor(Math.random() * colors.length);
    startTime = new Date().getTime();
    document.getElementById('word').innerHTML = words[wordIndex];
    document.getElementById('word').style.color = colors[colorIndex];
}

document.getElementById('red').addEventListener('click', function () {
    checkAnswer('red');
});

document.getElementById('green').addEventListener('click', function () {
    checkAnswer('green');
});

document.getElementById('blue').addEventListener('click', function () {
    checkAnswer('blue');
});

document.getElementById('orange').addEventListener('click', function () {
    checkAnswer('orange');
});

document.getElementById('yellow').addEventListener('click', function () {
    checkAnswer('yellow');
});

document.getElementById('pink').addEventListener('click', function () {
    checkAnswer('pink');
});

function checkAnswer(clickedColor) {
    const reactionTime = new Date().getTime() - startTime;
    let avgReactionTimePercent;
    if (count >= 20) {
        document.getElementById('word').innerHTML = 'Тест завершен!';
        document.getElementById('start').style.display = 'block';
        const avgCorrectReactionTime = correctReactionTime / correctAnswers;
        const avgIncorrectReactionTime = incorrectReactionTime / (count - correctAnswers);
        document.getElementById('scoreMy').innerHTML = `Среднее время реакции на правильные ответы: ${avgCorrectReactionTime.toFixed(2)} мс, на неправильные ответы: ${avgIncorrectReactionTime.toFixed(2)} мс`;
        const avgReactionTime = (correctAnswers > 0) ? avgCorrectReactionTime : 0;
        avgReactionTimePercent = ((avgReactionTime / 1000) * 100).toFixed(0);
        //sendForm
        document.getElementById("score").value = avgReactionTimePercent;
        //sendForm
        disableButtons();
        return;
    }
    count++;
    if (clickedColor === colors[colorIndex] || clickedColor === words[wordIndex]) {
        document.getElementById('result').innerHTML = `Правильно! Время реакции: ${reactionTime} мс`;
        correctAnswers++;
        correctReactionTime += reactionTime;
        document.getElementById('correctAnswers').innerHTML = `Количество правильных ответов: ${correctAnswers}`;
    } else {
        document.getElementById('result').innerHTML = `Неправильно! Время реакции: ${reactionTime} мс`;
        incorrectReactionTime += reactionTime;
    }
    wordIndex = Math.floor(Math.random() * words.length);
    colorIndex = Math.floor(Math.random() * colors.length);
    startTime = new Date().getTime();
    document.getElementById('word').innerHTML = words[wordIndex];
    document.getElementById('word').style.color = colors[colorIndex];
    answer = '';
    document.getElementById('progress').value = ((count / 20).toFixed(2) * 100).toFixed(0);

    //sendForm
    document.getElementById('avg_time').value = averageReactionTime;
    document.getElementById("correct").value = correctAnswers;
    document.getElementById("submit-button").click();
    //sendForm
}
