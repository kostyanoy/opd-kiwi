const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Result {
	constructor(min, max, message) {
		this.min = min;
		this.max = max;
		this.message = message;
	}

	checkValue(value) {
		return value >= this.min && value < this.max;
	}
}

class TestContainer {
	constructor(squares, startButton, resultLabel, baseColor, amount) {
		this.squares = squares;
		this.startButton = startButton;
		this.resultLabel = resultLabel;
		this.baseColor = baseColor;
		this.amount = amount;

		this.reactionTime = [];
		this.colors = ["red", "yellow", "green"];

		this.reset();
	}

	reset() {
		this.totalTime = 0;
		this.curSquare = 0;
		this.correct = 0;
		this.incorrect = 0;
		this.num = 0;
		this.isActive = false;
		this.time = performance.now();
		this.reactionTime = [];

		this.resetColors();
	}

	setLabel(text) {
		this.resultLabel.textContent = text; // изменен innerHTML на textContent
	}

	chooseResult(results, value) {
		for (let i = 0; i < results.length; i++) {
			if (results[i].checkValue(value)) {
				return results[i].message;
			}
		}
	}

	getAverageTime() {
		return Math.round(this.totalTime / this.num);
	}

	addReactionTime(time) {
		this.reactionTime.push(time);
		this.totalTime += time;
	}

	//square methods
	resetColors() {
		for (let i = 0; i < this.squares.length; i++) {
			this.changeSquareColor(i, this.baseColor);
		}
	}

	changeCurrentSquareColor(color) {
		this.changeSquareColor(this.curSquare, color);
	}

	changeSquareColor(index, color) {
		this.squares[index].style.backgroundColor = color;
	}

	checkCurrentSquare() {
		return this.checkSquare(this.curSquare);
	}

	checkSquare(index) {
		return this.squares[index].style.backgroundColor !== this.baseColor;
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

			this.setLabel(`Поздравляем: ваш результат ${res} мс. ${this.chooseResult(this.results, res)} ssd: ${ssd}`)
			this.startButton.disabled = false
			document.removeEventListener("keydown", this.listener)
		}, time)
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
