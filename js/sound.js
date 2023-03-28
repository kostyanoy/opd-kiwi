const delay = 1500;
let timerId;
let attempts = 0;
const maxAttempts = 30;
let averageReactionTime;

function startTest() {
    document.querySelector(".start").style.display = "none"
    attempts++;
    if (attempts > maxAttempts) {
        return;
    }
    timerId = setTimeout(playSound, delay);
}

function playSound() {
    const audio = new Audio('audio/sound1.mp3');
    audio.play();
    const reactionStartTime = Date.now();
    document.addEventListener('keydown', function (event) {
        const reactionTime = Date.now() - reactionStartTime;
        document.getElementById("reactionTime").innerHTML = `Ваше время реакции: ${reactionTime} миллисекунд`;
        document.querySelector(".start").style.display = "block";
        averageReactionTime = reactionTime / attempts;
        clearTimeout(timerId);
        averageReactionTime = reactionTime / attempts;
    });
    if (attempts === maxAttempts) {
        average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;
    }
}

function openModalW() {
    document.querySelector(".start").style.display = "block";
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