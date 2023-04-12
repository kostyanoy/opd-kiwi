class LightReaction extends SquareBase {
	constructor(squares, startButton, resultLabel, progressBar, amount = 10) {
		super(squares, startButton, resultLabel, progressBar, amount)
		this.results = [
			new Result(0, 300, "У вас отличная простая реакция!"),
			new Result(300, 400, "У вас хорошая простая реакция!"),
			new Result(400, 600, "У вас удовлетворительная простая реакция!"),
			new Result(800, 10000, "У вас неудовлетворительная простая реакция!"),
		]
		
		this.attachTest(this.start.bind(this))
		this.setMessage(this.getMessage)
		this.setEndMessage(this.getEndMessage)
        this.listener = (event) => {
			if (event.code !== "Space") {
				return;
			}
			this.clickHandler()
		}
	}

	start() {
		this.reset()

        const color = this.colors[getRandomInt(0, this.colors.length)]
		let time = 1000

		for (let i = 0; i < this.amount; i++) {
			time += getRandomInt(1000, 2000)
			this.step(color, time)
		}

		document.addEventListener("keydown", this.listener)
		this.end(time + 2000)
	}

	clickHandler() {
		if (!this.checkCurrentSquare()) {
            this.setLabel("Вы нажали слишком рано!")
            this.incorrect++
			return
		}
		this.correct++
		this.updateTime()
		this.changeCurrentSquareColor(this.baseColor)
	}

	getMessage() {
		return `Пройдено: ${this.num}/${this.amount}. Среднее время реакции: ${this.getAverageTime()} мс`
	}

	getEndMessage() {
		return `Поздравляем: ${this.chooseResult(this.results, this.getAverageTime())} (${this.getAverageTime()} мс)`
	}
}

const t = new LightReaction(
    document.querySelectorAll("#test .field .square"),
    document.querySelector("#test .btn"),
    document.querySelector("#test .result"),
	document.getElementById("progress")
)