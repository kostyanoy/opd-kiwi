const min = 10;
const max = 99;
const questionDiv = document.getElementById("question");
const resultDiv = document.getElementById("result");
const audioElement = document.getElementById("audio");
let startTime;
let a;
let b;

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
  const [a, b] = generateNumbers();
  playAudio(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${a}+плюс+${b}&tl=ru`);
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
    }} else {
    if ((time - 2800).toFixed(2) < 0){
        resultDiv.innerText = "А вот так вот не надо...";
    }else{
        resultDiv.innerText = "Ошибочка(";
    }
  }
}


