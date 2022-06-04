class LivingCreater {
    constructor(x, y) {             //graass
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1]
        ]
    }

    chooseCell(char) {              //grass

        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[x][y] == char) {
                found.push(this.directions[i])
            }
        }
        return found
    }
    
    move() {                        //grasseater
        let emptyCells = this.chooseCell(0)
        let emptyCell = this.rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY
        } else if (this.energy <= 0) {
            this.die()
        }
    }
   
    getNewCoordinates() {           //grasseater
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }
    
    rand(arr) {                     //function
        return arr[Math.floor(Math.random() * arr.length)]
    }
}


