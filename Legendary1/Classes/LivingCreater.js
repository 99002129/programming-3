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
        document.onkeydown = this.checkKey;         //mard
    }

    killAll(character, x, y) {      //mard
        if (character == 0) {
            return
        }
        else if (character == 1) {
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }
        }
        else if (character == 2) {
            for (let i = 0; i < grassArr.length; i++) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
        }
        else if (character == 3) {
            for (let i = 0; i < predatorArr.length; i++) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                }
            }
        }
        else if (character == 4) {
            for (let i = 0; i < PosionedGrassArr.length; i++) {
                if (this.x == PosionedGrassArr[i].x && this.y == PosionedGrassArr[i].y) {
                    PosionedGrassArr.splice(i, 1)
                }
            }
        }
        else if (character == 5) {
            for (let i = 0; i < vochxarArr.length; i++) {
                if (this.x == vochxarArr[i].x && this.y == vochxarArr[i].y) {
                    vochxarArr.splice(i, 1)
                }
            }
        }



    }

    checkKey = (e) => {             //mard
        console.log(e);
        e = e || window.event;
        if (e.keyCode == '38') {
            this.move(this.x, this.y - 1)
        }
        else if (e.keyCode == '40') {
            this.move(this.x, this.y + 1)
        }
        else if (e.keyCode == '37') {
            this.move(this.x - 1, this.y)
        }
        else if (e.keyCode == '39') {
            this.move(this.x + 1, this.y)
        }
    }

    posion() {              //  PosionedGrass
        let predatorCells = this.chooseCell(3)
        let predatorCell = this.rand(predatorCells)
        if (predatorCell) {
            let newX = predatorCell[0]
            let newY = predatorCell[1]
            if (matrix[newX][newY] == 3) {
                matrix[newX][newY] = 4
                for (var i = 0; i < predatorArr.length; i++) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1)
                        break
                    }
                }
            }
        }
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
    
    move() {                        //grasseater        predator
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
   
    getNewCoordinates() {           //grasseater  , predator
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

    die() {             //          grasseater
        matrix[this.x][this.y] = 0
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                break
            }
        }
    }

    boom() {                //vochxar
        let cells = this.chooseCell(1, 2, 3, 4, 5)
        let cell = this.rand(cells)
        if (cell) {
            let newX = cell[0]
            let newY = cell[1]
            matrix[newX][newY] = 0
            matrix[this.x][this.y] = 0
            for (var i = 0; i < vochxarArr.length; i++) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }

                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                }
                if (newX == PosionedGrassArr[i].x && newY == PosionedGrassArr[i].y) {
                    PosionedGrassArr.splice(i, 1)
                }

            }
            this.x = newX
            this.y = newY
        }
    }
}


