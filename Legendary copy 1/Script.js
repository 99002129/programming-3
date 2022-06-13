
var socket = io();

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

let side = 25

function setup() {

    createCanvas(matrix[0].length * side, matrix.length * side)
    frameRate(60)

    background("#2e4057")
    



    setInterval(() => {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)
        new Vochxar(x, y)
    }, 300);
}

socket.on("send matrix", paint)


function paint() {
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 0) {
                fill("#acacac")
            }
            else if (matrix[x][y] == 1) {
                fill("green")
            }
            else if (matrix[x][y] == 2) {
                fill("yellow")
            }
            else if (matrix[x][y] == 3) {
                fill("red")
            }
            else if (matrix[x][y] == 4) {
                fill("brown")
            }
            else if (matrix[x][y] == 5) {
                fill("black")
            }
            else if (matrix[x][y] == 9) {
                fill("black")
            }
            rect(x * side, y * side, side, side);
        }
    }

    
}

setInterval(() => {
    socket.on("send matrix", paint)
}, 100);



