//вернуть целое число в промежутке [min, max)
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

//блокировать нажатие на кнопку при нажатии пробела или enter
document.addEventListener('keydown', (event) => {
    console.log(event.code)
    if ((event.code === 'Space' || event.code == "Enter")) {
        event.preventDefault();
    }
});


function send(avg, total, correct, misses) {
    document.getElementById("avg_time").value = avg
    document.getElementById("total_time").value = total
    document.getElementById("correct").value = correct
    document.getElementById("misses").value = misses
    document.getElementById("submit-button").click()
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

class SquareBase {
    constructor(squares, startButton, resultLabel, amount) {
        this.squares = squares
        this.startButton = startButton
        this.resultLabel = resultLabel
        this.amount = amount
        
        this.baseColor = squares[0].style.backgroundColor
        this.colors = ["red", "yellow", "green"]

        this.reset()
    }

    attachTest(test) {
        this.startButton.onclick = () => {
            this.setLabel("Тест начался!")
            this.startButton.style.display = "none"
            test()
        }
    }

    setMessage(func){
        this.getMessage = func
    }

    setEndMessage(func) {
        this.endMessage = func
    }

    reset() {
        this.totalTime = 0
        this.curSquare = 0
        this.correct = 0
        this.incorrect = 0
        this.num = 0
        this.isActive = false
        this.time = performance.now()
        this.reactionTimes = []

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
        this.reactionTimes.push(time)
        this.totalTime += Math.round(time)
    }

    step(color, time, index) {
        if (index == undefined){
            index = this.nextRandomSquare()
        }
		setTimeout(() => {
            if (this.checkCurrentSquare()) {
				this.incorrect++
			}
			this.updateTime()
			this.changeCurrentSquareColor(this.baseColor)
			this.curSquare = index
			this.changeCurrentSquareColor(color)
			this.num++
			this.time = performance.now()
		}, time)
	}

	updateTime() {
		if (this.checkCurrentSquare()) {
			this.addReactionTime(performance.now() - this.time)
		}
        this.setLabel(this.getMessage())
	}

    end(time) {
		setTimeout(() => {
			this.updateTime()
			this.resetColors()

            const avg = this.getAverageTime()

			this.setLabel(this.endMessage())
			document.removeEventListener("keydown", this.listener)

			this.startButton.style.display = "block"
			send(this.getAverageTime(), this.totalTime, this.correct, this.incorrect)
		}, time)
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

    nextSquare() {
        return (this.curSquare + 1) % this.squares.length
    }

    nextRandomSquare() {
        return getRandomInt(0, this.squares.length)
    }
}