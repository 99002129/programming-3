class Mard extends LivingCreater{

    move(x, y) {            // have and diff
        super.move()
        console.log(matrix[0].length, x);
        if ((x >= 0 && x <= matrix[0].length) && (y >= 0 && y <= matrix.length)) {
            console.log(this.x, this.y);
            console.log(x, y);
            const exChar = matrix[y][x]
            this.killAll(exChar, x, y)
            matrix[y][x] = 9;
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
            if (this.x > matrix.length) {
                x++
            }
        }
    }

   
}
