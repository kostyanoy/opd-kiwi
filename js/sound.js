const delay = 1500;
let timerId;
let attempts = 0;
const maxAttempts = 30;
let totalReactionTime = 0;
let averageReactionTime;
name= "Оценка скорости реакции на звук"
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
        document.querySelector(".start").style.display = "block";-
        clearTimeout(timerId);
        totalReactionTime += reactionTime;
        averageReactionTime = totalReactionTime / attempts;
    });
    if (attempts === maxAttempts) {
        average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;

        //sendForm
        document.getElementById("test_name").value = name;
        document.getElementById("total_time").value = totalReactionTime.toFixed(2);
        document.getElementById("avg_time").value = averageReactionTime.toFixed(2);
        document.getElementById("sendForm").submit();
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