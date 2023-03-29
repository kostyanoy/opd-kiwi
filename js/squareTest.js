const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//средне квадратичное отклонение
const sampleStandartDeviation = (numbers) => {
	const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
	const s = numbers.reduce((acc, curr) => acc + (avg - curr) ** 2, 0);
	return Math.sqrt(s / (numbers.length - 1));
}

const isActive = (elements) => {
	for (let i = 0; i < elements.length; i++) {
		if (elements[i] === document.activeElement) {
			return true;
		}
	}
	return false;
}

class Result {
	constructor(min, max, message) {
		this.min = min
		this.max = max
		this.message = message
	}

	checkValue(value) {
		return value >= this.min && value < this.max
	}
}

class TestContainer {
	constructor(squares, startButton, resultLabel, baseColor, amount) {
		this.squares = squares
		this.startButton = startButton
		this.resultLabel = resultLabel
		this.baseColor = baseColor
		this.amount = amount

		this.reactionTime = []
		this.colors = ["red", "yellow", "green"]

		this.reset()
	}

	reset() {
		this.totalTime = 0
		this.curSquare = 0
		this.correct = 0
		this.incorrect = 0
		this.num = 0
		this.isActive = false
		this.time = performance.now()
		this.reactionTime = []

		this.resetColors()
	}

	setLabel(text) {
		this.resultLabel.innerHTML = text
	}

	chooseResult(results, value) {
		for (let i = 0; i < results.length; i++) {
			if (results[i].checkValue(value)) {
				return results[i].message;
			}
		}
	}

	getAverageTime() {
		return Math.round(this.totalTime / this.num)
	}

	addReactionTime(time) {
		this.reactionTime.push(time)
		this.totalTime += Math.round(time)
	}


	//square methods
	resetColors() {
		for (let i = 0; i < this.squares.length; i++) {
			this.changeSquareColor(i, this.baseColor)
		}
	}

	changeCurrentSquareColor(color) {
		this.changeSquareColor(this.curSquare, color)
	}

	changeSquareColor(index, color) {
		this.squares[index].style.backgroundColor = color
	}

	checkCurrentSquare() {
		return this.checkSquare(this.curSquare)
	}

	checkSquare(index) {
		return this.squares[index].style.backgroundColor !== this.baseColor
	}
}


class Test1 extends TestContainer {
	constructor(squares, startButton, resultLabel, baseColor = "lightgrey", amount = 10) {
		super(squares, startButton, resultLabel, baseColor, amount)
		this.results = [
			new Result(0, 300, "У вас отличная простая реакция!"),
			new Result(300, 400, "У вас хорошая простая реакция!"),
			new Result(400, 500, "У вас удовлетворительная простая реакция!"),
			new Result(500, 10000, "У вас неудовлетворительная простая реакция!"),
		]

		this.init()
	}

	init() {
		this.startButton.onclick = () => {
			this.setLabel("Тест начался!")
			this.test()
			this.startButton.style.display = "none"
		}

		this.listener = (event) => {
			if (event.code !== "Space") {
				return;
			}
			this.clickHandler()
		}
	}

	test() {
		this.reset()

		let time = 1000

		for (let i = 0; i < this.amount; i++) {
			time += getRandomInt(1000, 4000)
			this.step(this.colors[getRandomInt(0, 3)], time)
		}

		document.addEventListener("keydown", this.listener)
		this.end(time + 2000)
	}

	clickHandler() {
		if (!this.checkCurrentSquare()) {
			//this.addReactionTime(1000)
			return
		}
		this.correct++
		this.updateTime()
		this.changeCurrentSquareColor(this.baseColor)
	}

	step(color, time) {
		setTimeout(() => {
			this.updateTime()
			this.changeCurrentSquareColor(this.baseColor)
			this.curSquare = (this.curSquare + 1) % 3
			this.changeCurrentSquareColor(color)
			this.num++
			this.time = performance.now()
		}, time)
	}

	updateTime() {
		if (this.checkCurrentSquare()) {
			this.addReactionTime(performance.now() - this.time)
		}
		this.setLabel(`Всего: ${this.totalTime}. Среднее: ${this.getAverageTime()}`)
	}

	end(time) {
		setTimeout(() => {
			this.updateTime()
			this.resetColors()

			const ssd = Math.round(sampleStandartDeviation(this.reactionTime))
			const res = this.getAverageTime() + 2 * ssd

			this.setLabel(`Поздравляем: ваш результат ${res} мс. ${this.chooseResult(this.results, res)} ssd: ${ssd}, avg = ${this.getAverageTime()}`)
			document.removeEventListener("keydown", this.listener)

			this.startButton.style.display = "block"
			send(this.getAverageTime(), this.totalTime, this.correct, this.incorrect)
		}, time)
	}
}




class Test2 extends TestContainer {
	constructor(squares, startButton, resultLabel, baseColor = "lightgrey", amount = 10) {
		super(squares, startButton, resultLabel, baseColor, amount)
		this.results = [
			new Result(0, amount * 0.68, "У вас неудовлетворительная сложная реакция!"),
			new Result(amount * 0.68, amount * 0.8, "У вас удовлитворительная сложная реакция!"),
			new Result(amount * 0.8, amount * 0.94, "У вас хорошая сложная реакция!"),
			new Result(amount * 0.94, amount + 1, "У вас отличная сложная реакция!"),
		]

		this.init()
	}

	init() {
		this.startButton.onclick = () => {
			this.setLabel("Тест начался!")
			this.test()
			this.startButton.style.display = "none"
		}

		this.listener = (event) => {
			if (event.code !== "Space" && event.code !== "Enter") {
				return;
			}
			this.clickHandler(event.code)
		}
	}

	test() {
		this.reset()

		let time = 1000
		this.order = []

		for (let i = 0; i < this.amount; i++) {
			time += getRandomInt(1000, 3000)
			let color = i === 0 ? "yellow" : this.colors[getRandomInt(0, 3)]
			this.step(color, time)
			this.order.push(color)
		}

		document.addEventListener("keydown", this.listener)

		this.end(time + 2000)
	}

	clickHandler(code) {
		if (!this.checkCurrentSquare()) {
			//this.addReactionTime(1000)
			return
		}

		if (((this.num === 1 || this.order[this.num - 2] === this.order[this.num - 1]) && code === "Enter")
			|| this.order[this.num - 2] !== this.order[this.num - 1] && code == "Space") {
			this.correct++
		} else {
			this.incorrect++
		}

		this.updateTime()
		this.changeCurrentSquareColor(this.baseColor)
	}

	step(color, time) {
		setTimeout(() => {
			if (this.checkCurrentSquare()) {
				this.incorrect++
			}
			this.updateTime()
			this.changeCurrentSquareColor(this.baseColor)
			this.curSquare = (this.curSquare + 1) % 3
			this.changeCurrentSquareColor(color)
			this.num++
			this.time = performance.now()
		}, time)
	}

	updateTime() {
		if (this.checkCurrentSquare()) {
			this.addReactionTime(performance.now() - this.time)
		}
		this.setLabel(`Правильно: ${this.correct}. Неправильно: ${this.incorrect}`)
	}

	end(time) {
		setTimeout(() => {
			this.updateTime()
			this.resetColors()

			const res = this.chooseResult(this.results, this.correct)

			this.setLabel(`Поздравляем: Среднее время: ${this.getAverageTime()} мс. Правильно: ${this.correct}. Неправильно: ${this.incorrect}. ${res}`)
			document.removeEventListener("keydown", this.listener)

			this.startButton.style.display = "block"
			send(this.getAverageTime(), this.totalTime, this.correct, this.incorrect)
		}, time)
	}
}


class Test3 extends Test2 {
	constructor(squares, startButton, resultLabel, baseColor = "lightgrey", amount = 70) {
		super(squares, startButton, resultLabel, baseColor, amount)
		this.results = [
			new Result(0, amount * 0.68, "У вас неудовлетворительная сложная реакция!"),
			new Result(amount * 0.68, amount * 0.8, "У вас удовлитворительная сложная реакция!"),
			new Result(amount * 0.8, amount * 0.94, "У вас хорошая сложная реакция!"),
			new Result(amount * 0.94, amount + 1, "У вас отличная сложная реакция!"),
		]

		this.init()
	}


	test() {
		this.reset()

		let time = 1000

		let speed = 30

		this.order = []

		for (let i = 0; i < this.amount; i++) {
			if ((i + 1) % 10 === 0) {
				speed += 10
			}
			time += 60 / speed * 1000
			let color = i === 0 ? "yellow" : this.colors[getRandomInt(0, 3)]
			this.step(color, time)
			this.order.push(color)
		}

		document.addEventListener("keydown", this.listener)

		this.end(time + 2000)
	}

	end(time) {
		setTimeout(() => {
			this.updateTime()
			this.resetColors()

			const res = this.chooseResult(this.results, this.correct)

			this.setLabel(`Поздравляем: Среднее время: ${this.getAverageTime()} мс. Правильно: ${this.correct}. Неправильно: ${this.incorrect}. ${res}`)
			document.removeEventListener("keydown", this.listener)

			this.startButton.style.display = "block"
			send(this.getAverageTime(), this.totalTime, this.correct, this.incorrect)
		}, time)
	}
}




const testButtons = document.querySelectorAll(".test .btn")

//блокировать нажатие на кнопку при нажатии пробела или enter
document.addEventListener('keydown', (event) => {
	console.log(event.code)
	if ((event.code === 'Space' || event.code == "Enter")) {
		event.preventDefault();
	}
});


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

function send(avg, total, correct, misses){
	document.getElementById("avg_time").value = avg
	document.getElementById("total_time").value = total
	document.getElementById("correct").value = correct
	document.getElementById("misses").value = misses
	document.getElementById("submit-button").click()
}



if (document.querySelector("#test1 .btn")) {
	const t1 = new Test1(
		document.querySelectorAll("#test1 .field .square"),
		document.querySelector("#test1 .btn"),
		document.querySelector("#test1 .result")
	)
}

if (document.querySelector("#test2 .btn")) {
	const t2 = new Test2(
		document.querySelectorAll("#test2 .field .square"),
		document.querySelector("#test2 .btn"),
		document.querySelector("#test2 .result")
	)
}

if (document.querySelector("#test3 .btn")) {
	const t3 = new Test3(
		document.querySelectorAll("#test3 .field .square"),
		document.querySelector("#test3 .btn"),
		document.querySelector("#test3 .result")
	)
}