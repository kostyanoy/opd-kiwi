const delay = 1500;
let timerId;
let attempts = 0;
const maxAttempts = 10;
let totalReactionTime = 0;
let averageReactionTime;
let averagePercent;

function startTest() {
    document.querySelector(".start").style.display = "none";
    if (attempts === maxAttempts) {
        attempts = 0;
        totalReactionTime = 0;
        averageReactionTime = 0;
        average.innerText = "";
    }
    attempts++;
    document.getElementById('progress').value = ((attempts / 10).toFixed(2) * 100).toFixed(0);
    if (attempts > maxAttempts) {
        return;
    }
    timerId = setTimeout(playSound, delay);
}


function playSound() {
    const audio = new Audio('audio/sound1.mp3');
    audio.play();
    const reactionStartTime = Date.now();
    const listener = function () {
        const reactionTime = Date.now() - reactionStartTime;
        document.getElementById("reactionTime").innerHTML = `Ваше время реакции: ${reactionTime} миллисекунд`;
        totalReactionTime += reactionTime;
        averageReactionTime = totalReactionTime / attempts;
        document.removeEventListener('keydown', listener);
    }
    document.addEventListener('keydown', listener);
    if (attempts === maxAttempts) {
        average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;
        averagePercent = ((averageReactionTime / delay) * 100).toFixed(2);

        document.querySelector(".start").style.display = "block";

        //sendForm
        document.getElementById("total_time").value = totalReactionTime.toFixed(2);
        document.getElementById("avg_time").value = averageReactionTime.toFixed(2);
        document.getElementById("score").value = averagePercent;
        document.getElementById("submit-button").click();
        //sendForm
    }
    else {
        setTimeout(startTest, 2000);
    }
}
