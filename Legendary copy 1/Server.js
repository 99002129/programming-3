var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = []


function matrixGen(n, gr, grEat, predator, posion) {
    for (let x = 0; x < n; x++) {
        matrix[x] = []
        for (let y = 0; y < n; y++) {
            matrix[x][y] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 1
        } else {
            i--
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 2
        } else {
            i--
        }
    }
    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 3
        } else {
            i--
        }

    }
    for (let i = 0; i < posion; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 4
        } else {
            i--
        }
    }

    // return matrix
}



 matrixGen(20, 10, 30, 3, 2)
console.log(matrix, "abgd");
io.sockets.emit("send matrix", matrix)


 grassArr = []
 grassEaterArr = []
 predatorArr = []
 PosionedGrassArr = []
 vochxarArr = []


let LivingCreature = require("./Classes/LivingCreature")
let PoisonedGrass = require("./Classes/PoisonedGrass")
let GrassEater = require("./Classes/GrassEater")
let Predator = require("./Classes/Predator")
let Vochxar = require("./Classes/Vochxar")
let Grass = require("./Classes/Grass")
let Mard = require("./Classes/Mard")

function CreateObjects(matrix) {
    
    const mard = new Mard(0, 0)
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[x][y] == 2) {
                let great = new GrassEater(x, y)
                grassEaterArr.push(great)
            }
            else if (matrix[x][y] == 3) {
                let small = new Predator(x, y)
                predatorArr.push(small)
            }
            else if (matrix[x][y] == 4) {
                let toxic = new PoisonedGrass(x, y)
                PosionedGrassArr.push(toxic)
            }
            else if (matrix[x][y] == 5) {
                let bomba = new Vochxar(x, y)
                vochxarArr.push(bomba)
            }
        }
    }
    
    
    io.sockets.emit("send matrix", matrix)

}



function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in PosionedGrassArr) {
        PosionedGrassArr[i].mul()
    }
    for (let i in PosionedGrassArr) {
        PosionedGrassArr[i].posion()
    }
    for (let i in vochxarArr) {
        vochxarArr[i].bomb()
    }
    for (let i in predatorArr) {
        predatorArr[i].die()
    }

    io.sockets.emit("send matrix", matrix)
}

setInterval(() => {
    game()
}, 100);


io.on("connection", function (socket){
    CreateObjects(matrix)
})

