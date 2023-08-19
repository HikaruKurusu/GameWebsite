var blockSize = 35;
var rows = 20;
var col = 20;
var board;
var context;

var snakeX = blockSize*5;
var snakeY = blockSize*5;

var snackX = blockSize*10;
var snackY = blockSize*10;

var veloX = 0;
var veloY = 0; 

var gameOver = false;

var snakeB = [];


window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d");// drawing on board
    placeSnack();
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/10);

}

function update() {
    if(gameOver) {
        return;
    }
    context.fillStyle = "grey";
    context.fillRect(0,0,board.height,board.width);

    context.fillStyle = "red";
    context.fillRect(snackX,snackY,blockSize,blockSize);

    if(snakeX == snackX && snakeY == snackY) {
        snakeB.push([snackX,snackY]);
        placeSnack();
    }
    for(let i = snakeB.length-1; i > 0; i--) {
        snakeB[i] = snakeB[i-1];
    }

    if(snakeB.length) {
        snakeB[0] = [snakeX,snakeY];
    }

    context.fillStyle = "blue";
    snakeX += veloX * blockSize;
    snakeY += veloY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i = 0; i < snakeB.length; i++) {
        context.fillRect(snakeB[i][0],snakeB[i][1],blockSize,blockSize);
    }

    if(snakeX < 0 || snakeX > col*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("gameOver");
    }

    for(let i = 0; i < snakeB.length; i++) {
        if(snakeX == snakeB[i][0] && snakeY == snakeB[i][1]) {
            gameOver == true;
            alert("gameOver");
        }
    }

    

}

function changeDirection(e) {
    if(e.code == "ArrowUp" && veloY != 1) {
        veloX = 0;
        veloY = -1;
    } else if(e.code == "ArrowDown" && veloY != -1) {
        veloX = 0;
        veloY = 1;
    } else if(e.code == "ArrowLeft" && veloX != 1) {
        veloX = -1;
        veloY = 0;
    } else if(e.code == "ArrowRight" && veloX != -1) {
        veloX = 1;
        veloY = 0;
    }
}

function placeSnack() {
    //floor makes it not a decimal number becauase math.random * col or rows = 19.999
    snackX = Math.floor(Math.random() * col) * blockSize;
    snackY = Math.floor(Math.random() * rows) * blockSize;
}