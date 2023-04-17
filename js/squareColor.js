class ColorReaction extends SquareBase {
	constructor(squares, startButton, resultLabel, progressBar, amount = 10) {
		super(squares, startButton, resultLabel, progressBar, amount)
		this.results = [
			new Result(9, 1000, "У вас отличная сложная реакция!"),
			new Result(7, 9, "У вас хорошая сложная реакция!"),
			new Result(5, 7, "У вас удовлетворительная сложная реакция!"),
			new Result(0, 5, "У вас неудовлетворительная сложная реакция!"),
		]

		this.codes = ["Digit1", "Digit2", "Digit3"]

		this.attachTest(this.start.bind(this))
		this.setMessage(this.getMessage)
		this.setEndMessage(this.getEndMessage)
		this.listener = (event) => {
			if (!(this.codes.includes(event.code))) {
				return;
			}
			this.clickHandler(event.code)
		}
	}

	start() {
		this.reset()

		let time = 1000

		for (let i = 0; i < this.amount; i++) {
			let index = getRandomInt(0, this.squares.length)
			time += getRandomInt(1000, 2000)
			this.step(this.colors[index], time, index)
		}

		document.addEventListener("keydown", this.listener)
		this.end(time + 2000)
	}

	clickHandler(code) {
		if (!this.checkCurrentSquare()) {
			this.setLabel("Вы нажали слишком рано!")
			this.incorrect++
			return
		}

		if (this.codes.indexOf(code) == this.curSquare) {
			this.correct++
		} else {
			this.incorrect++
		}
		this.updateTime()
		this.changeCurrentSquareColor(this.baseColor)
	}

	getMessage() {
		return `Пройдено: ${this.num}/${this.amount}. Правильно: ${this.correct}. Неправильно: ${this.incorrect}. Среднее время реакции: ${this.getAverageTime()} мс`
	}

	getEndMessage() {
		return `Поздравляем: ${this.chooseResult(this.results, this.correct)} (${this.getAverageTime()} мс). Правильных ответов: ${this.correct}`
	}
}

const t = new ColorReaction(
	document.querySelectorAll("#test .field .square"),
	document.querySelector("#test .btn"),
	document.querySelector("#test .result"),
	document.getElementById("progress")
)