const min = 10;
const max = 99;
const averageGood = document.getElementById("averageGood");
const averageBad = document.getElementById("averageBad");
const resultDiv = document.getElementById("result");
let startTime;
let a, b, answers;
let attempts, totalReactionTime, totalReactionTimeBad = 0;
const maxAttempts = 10;
let averageReactionTimeGood;
let averageReactionTimeBad;
let percentageReactionTimeGood;

function generateNumbers() {
    a = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;
    return [a, b];
}
function startTest() {
    document.querySelector(".start").style.display = "none";
    document.getElementById("progress").value = attempts;
    if (attempts === maxAttempts) {
        attempts = 0;
        totalReactionTime = 0;
        averageReactionTimeGood.innerText = "";
        averageReactionTimeBad.innerText = "";
    }
    attempts++;
    document.getElementById('progress').value = ((attempts / 10).toFixed(2) * 100).toFixed(0);
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
    if ((answer === "четное" && (a + b) % 2 === 0) || (answer === "нечетное" && (a + b) % 2 !== 0)) {
        resultDiv.innerText = `Ваше время реакции: ${(time).toFixed(2)} миллисекунд.`;
        totalReactionTime += time;
    } else {
        resultDiv.innerText = "Ошибочка(";
        wrong++;
        totalReactionTimeBad += time;
    }
    answers++
    averageReactionTimeBad = totalReactionTimeBad / wrong;
    averageReactionTimeGood = totalReactionTime / (attempts - wrong);
    if (attempts === maxAttempts) {
        averageGood.innerText += ` Среднее время реакции(правильные ответы): ${averageReactionTimeGood.toFixed(2)} миллисекунд.`;
        averageBad.innerText += ` Среднее время реакции(неправильные ответы): ${averageReactionTimeBad.toFixed(2)} миллисекунд.`;
        percentageReactionTimeGood = (averageReactionTimeGood / (averageReactionTimeGood + averageReactionTimeBad)) * 100;
        document.querySelector(".start").style.display = "block";
        //sendForm
        document.getElementById("avg_time").value = averageReactionTime.toFixed(2);
        document.getElementById("total_time").value = totalReactionTime.toFixed(2);
        document.getElementById("correct").value = maxAttempts - wrong;
        document.getElementById("misses").value = wrong;
        document.getElementById("score").value = percentageReactionTimeGood;
        document.getElementById("submit-button").click();
        //sendForm
    } else {
        setTimeout(startTest, 2000);
    }
}

