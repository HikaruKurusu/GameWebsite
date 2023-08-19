//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;
//square
let squareWidth = 88;
let squareHeight = 94;
let squareX = 50;
let squareY = boardHeight - squareHeight;
let squareImg

let square = {
    x : squareX,
    y : squareY,
    width : squareWidth,
    height : squareHeight

}

let triangleArray = [];
let triangle1Width = 34;
let triangle2Width = 69;
let triangle3Width = 102;

let triangleHeight = 70;
let triangleX = 700;
let triangleY = boardHeight - triangleHeight;

let triangle1IMG;
let triangle2IMG;
let triangle3IMG;

let velocityX = -8; //left speed
let velocityY = 0; // jumping
let gravity = .4;
let gameOver = false;
let score = 0;
let message = "GAME OVER";



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");
    // context.fillStyle = "green";
    // context.fillRect(square.x,square.y,square.width,square.height);

    squareImg = new Image();
    squareImg.src = "./SquarePics/BLUE.png";

    squareImg.onload = function() {//use this to load image
        context.drawImage(squareImg, square.x, square.y, square.width, square.height); //draws square
    }
    triangle1IMG = new Image();
    triangle1IMG.src = "./SquarePics/Triangle.png";

    triangle2IMG = new Image();
    triangle2IMG.src = "./SquarePics/Triangle.png";

    triangle3IMG = new Image();
    triangle3IMG.src = "./SquarePics/Triangle.png";

    requestAnimationFrame(update);
    setInterval(placeTriangle,1000);
    document.addEventListener("keydown",moveSquare);
    
}

function update() {
    requestAnimationFrame(update);
    if(gameOver) {
        return;
    }
    context.clearRect(0,0,board.width,board.height);
    velocityY += gravity;
    square.y = Math.min(square.y + velocityY, squareY);//updates gravity
    context.drawImage(squareImg, square.x, square.y, square.width, square.height);//for square

    for(let i = 0; i < triangleArray.length; i++) {//for triangle
        let triangle = triangleArray[i];
        triangle.x += velocityX; 
        context.drawImage(triangle.img, triangle.x, triangle.y, triangle.width, triangle.height);
        if(detectCollision(square,triangle)) {
            gameOver= true;
            squareImg.src = "./SquarePics/RED.png";
            squareImg.onload = function() {
                context.drawImage(squareImg,square.x,square.y,square.width,square.height);
            }
        }

    }
    context.fillStyle = "black";
    context.font ="20px courier";
    score++;
    context.fillText(score,5,20);

}

function moveSquare(e) {
    if(gameOver) {
        return;
    }
    if((e.code ==  "Space" || e.code == "ArrowUp") && square.y == squareY) {
        //jump
        velocityY = -10;

    }
}

function placeTriangle() {
    if(gameOver) {
        return;
    }
    let triangle = {
        img : null,
        x : triangleX,
        y : triangleY,
        width : null,
        height : triangleHeight
    }
    let cChance = Math.random();

    if(cChance > .90) {
        triangle.img = triangle3IMG;
        triangle.width = triangle3Width;
        triangleArray.push(triangle);

    } else if(cChance > .70) {
        triangle.img = triangle2IMG;
        triangle.width = triangle2Width;
        triangleArray.push(triangle);

    } else if(cChance > .50) {
        triangle.img = triangle1IMG;
        triangle.width = triangle1Width;
        triangleArray.push(triangle);
    } 

    if(triangleArray.length > 5) {
        triangleArray.shift(); //clears the array behind square
    }
}

function detectCollision(a,b) {
    return a.x <b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y // dosent reach any corners
}