class Grass extends LivingCreater {
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let emptyCell = this.rand(emptyCells)
        if (this.multiply >= 8 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 1
            let gr = new Grass(newX, newY)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
}