class PosionedGrass extends LivingCreater {
    
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let emptyCell = this.rand(emptyCells)
        if (this.multiply >= 4 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 4
            let toxic = new PosionedGrass(newX, newY)
            PosionedGrassArr.push(toxic)
            this.multiply = 0

        }

    }
    posion() {
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
}
