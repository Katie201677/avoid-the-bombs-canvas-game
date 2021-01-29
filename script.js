const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
img.src = "images/green-bot-sprites-transparent.png";
let sprite = 1;
let frameNum = 0;

let x = 0;
let y = canvas.height/2;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let ballX;
let ballY;
let ballRadius = 10;
let colour = 'green';
let balls = [];
let increment = -1;
let maxX = (canvas.width / 2) - 50;

function generateRandomX(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function populateBalls(ballMax) {
    for (let i=0; i < ballMax; i++) {
        ballX =  generateRandomX(0, 1440);
        ballY = generateRandomX(0, 100);
        balls.push({ x: ballX, y: -ballY, status: 0 });
    }
}
populateBalls(5);

function drawBall(xCoord, yCoord) {
    ctx.beginPath();
    ctx.arc(xCoord, yCoord, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath(); 
}

function drawImage() {
    ctx.drawImage(img, (sprite*16), 32, 16, 16, x, y, 50, 50);
}

function incrementBackground() {
    if(x > 10) {
        for(let i=0; i<balls.length; i++) {
            balls[i].x += increment;
        }
    }
}

function decrementBackground() {
    if(x < maxX) {
        for(let i=0; i<balls.length; i++) {
            balls[i].x -= increment;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();
    // rotate sprite:
    if (frameNum % 13 === 0) {
        if (sprite === 7) {
            sprite = 1;
        } else {
            sprite ++;
        }
    }
    frameNum++;
    // arrow controls:
    if(rightPressed) {
        x += 5;
        incrementBackground();
        if (x + 50 > canvas.width) {
            x = canvas.width - 50;  
        }
    }
    if(leftPressed) {
        x -= 5;
        decrementBackground();
        if(x < 0) {
            x = 0;
        }
    }
    if(upPressed) {
        y -= 5;
        if(y < 0) {
            y = 0;
        }
    }
    else if(downPressed) {
        y += 5;
        if (y + 50 > canvas.height) {
            y = canvas.height - 50;
        }
    }
    // add new ball to array every 13 frames
    if (frameNum % 13 === 0) {
        populateBalls(1);
    }

    // draw the balls:
    for (let i=0; i<balls.length; i++) {
        drawBall(balls[i].x, balls[i].y);
    }

    for (let i=0; i<balls.length; i++) {
        balls[i].y += 0.75;
    }
    
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}
draw();