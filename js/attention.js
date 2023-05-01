const words = ['красный', 'зеленый', 'синий', 'оранжевый', 'желтый', 'розовый'];
const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'pink'];
let wordIndex = Math.floor(Math.random() * words.length);
let colorIndex = Math.floor(Math.random() * colors.length);
let answer = '';
let count = 0;
let correctAnswers = 0;
let startTime;
let correctReactionTime = 0;
let incorrectReactionTime = 0;

document.getElementById('start').addEventListener('click', function() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('red').disabled = false;
    document.getElementById('green').disabled = false;
    document.getElementById('blue').disabled = false;
    document.getElementById('orange').disabled = false;
    document.getElementById('yellow').disabled = false;
    document.getElementById('pink').disabled = false;
    startTest();
});

function startTest() {
    document.getElementById('correctAnswers').innerHTML = " "
    document.getElementById('score').innerHTML = " "
    document.getElementById('progress').value = 0
    count = 0;
    correctAnswers = 0;
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



document.getElementById('red').addEventListener('click', function() {
    checkAnswer('red');
});

document.getElementById('green').addEventListener('click', function() {
    checkAnswer('green');
});

document.getElementById('blue').addEventListener('click', function() {
    checkAnswer('blue');
});

document.getElementById('orange').addEventListener('click', function() {
    checkAnswer('orange');
});

document.getElementById('yellow').addEventListener('click', function() {
    checkAnswer('yellow');
});

document.getElementById('pink').addEventListener('click', function() {
    checkAnswer('pink');
});

function checkAnswer(clickedColor) {
    const reactionTime = new Date().getTime() - startTime;
    if (count >= 20) {
        document.getElementById('word').innerHTML = 'Тест завершен!';
        document.getElementById('start').style.display = 'block';
        const avgCorrectReactionTime = correctReactionTime / correctAnswers;
        const avgIncorrectReactionTime = incorrectReactionTime / (count - correctAnswers);
        document.getElementById('score').innerHTML = `Среднее время реакции на правильные ответы: ${avgCorrectReactionTime.toFixed(2)} мс, на неправильные ответы: ${avgIncorrectReactionTime.toFixed(2)} мс`;
        document.getElementById('red').disabled = true;
        document.getElementById('green').disabled = true;
        document.getElementById('blue').disabled = true;
        document.getElementById('orange').disabled = true;
        document.getElementById('yellow').disabled = true;
        document.getElementById('pink').disabled = true;
        document.getElementById('submit').disabled = true;
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
}

