const min = 10;
const max = 99;
const average = document.getElementById("average");
const resultDiv = document.getElementById("result");
const audioElement = document.getElementById("audio");
let startTime;
let a;
let b;
let attempts = 0;
const maxAttempts = 5;
let totalReactionTime = 0;
let averageReactionTime;

function generateNumbers() {
    a = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;
    return [a, b];
}

function playAudio(src) {
    audioElement.src = src;
    audioElement.play();
}

function startTest() {
    attempts++;
    if (attempts > maxAttempts) {
        return;
    }
    const [a, b] = generateNumbers();
    // закомментированное не работает на сервере
    // playAudio(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${a}+плюс+${b}&tl=ru`);
    var audio = new SpeechSynthesisUtterance(`${a} плюс ${b}`)
    window.speechSynthesis.speak(audio);

    startTime = performance.now();
    return [a, b];
}

function checkAnswer(answer) {
  const time = performance.now() - startTime;
  if (answer === "четное" && (a + b) % 2 === 0 || answer === "нечетное" && (a + b) % 2 !== 0) {
    if ((time - 2800).toFixed(2) < 0){
        resultDiv.innerText = "А вот так вот не надо...";
    }else{
        resultDiv.innerText = `Ваше время реакции: ${(time - 2700).toFixed(2)} миллисекунд.`;
        totalReactionTime += time - 2700;
        averageReactionTime = totalReactionTime / attempts;
    }} else {
    if ((time - 2800).toFixed(2) < 0){
        resultDiv.innerText = "А вот так вот не надо...";
    }else{
        resultDiv.innerText = "Ошибочка(";
    }
  }
  if (attempts === maxAttempts) {
      average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;
  }
}
