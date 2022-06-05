class GrassEater extends LivingCreater{
    constructor(x, y) {
        super(x,y)                          //WHat i do ???
        this.energy = 8                            //dif
        this.directions = []                       //dif
    }

    
    chooseCell(char) {
        super.getNewCoordinates()                    //dif
    }  
   
    eat() {
        this.mul()
        let grassCells = this.chooseCell(1)
        let grassCell = this.rand(grassCells)
        let posionedGrassCells = this.chooseCell(4)
        let posionedGrassCell = this.rand(posionedGrassCells)
        if (grassCell && this.energy > 0) {
            this.energy++
            let newX = grassCell[0]
            let newY = grassCell[1]
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0
            for (var i = 0; i < grassArr.length; i++) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else if (posionedGrassCell && this.energy > 0) {
            this.energy++
            let newX = posionedGrassCell[0]
            let newY = posionedGrassCell[1]
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0
            for (var i = 0; i < PosionedGrassArr.length; i++) {
                if (newX == PosionedGrassArr[i].x && newY == PosionedGrassArr[i].y) {
                    PosionedGrassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else this.move()


    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = this.rand(emptyCells)
        if (this.energy >= 12 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            let great = new GrassEater(newX, newY)
            grassEaterArr.push(great)
            this.energy -= 8
        }
    }
    
}