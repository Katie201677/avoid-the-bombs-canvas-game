// To do: collision detection with where apples / bombs are drawn

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const bot = new Image();
bot.src = "images/green-bot-sprites-transparent.png";

let sprite = 1;
let frameNum = 0;
const botWidth = 40;
const botHeight = 40;

const apple = new Image();
apple.src = "images/apple.png";

const bomb = new Image();
bomb.src = "images/bomb.png";

let x = 0;
let y = canvas.height/2;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let ballX;
let ballY;
let balls = [];
const ballWidth = 30;
const ballHeight = 30;
const increment = -1;
const maxX = (canvas.width / 2) - 50;
let score = 0;
let lives = 5;
let ballSpeed = 0.5;

let gameOver = false;

// function to generate random coordinate to draw apple or bomb:
function generateRandomX(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

// function to randomly determine whether an apple or bomb is drawn, with bomb more likely:
function generateAppleOrBomb() {
    let num = Math.random();
    if(num >= 0.8) {
        return apple;
    } else {
        return bomb;
    }
}

// function to populate an array or apples / bombs, up to a maximum and with randomly generated x and y coordinates (with y starting above the canvas to create effect of dropping in at different times) - itially called to generate 5:
function populateBalls(ballMax) {
    for (let i=0; i < ballMax; i++) {
        ballX =  generateRandomX(0, 1440);
        ballY = generateRandomX(0, 100);
        appleOrBomb = generateAppleOrBomb(); 
        balls.push({ appleOrBomb: appleOrBomb, x: ballX, y: -ballY, status: true });
    }
}
populateBalls(5);

// function to draw an apple or bomb:
function drawBall(appbom, xCoord, yCoord) {
    ctx.drawImage(appbom, xCoord, yCoord, 30, 30);
}

// function to draw the bot sprite:
function drawBot() {
    ctx.drawImage(bot, (sprite*16), 32, 16, 16, x, y, 40, 40);
}

// function to print the score on the canvas:
function drawScore() {
    const text = `Score: ${score}`;
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillStyle = "black";
    ctx.fillText(text, 8, 20);
}

// function to print the lives on the canvas:
function drawLives() {
    const text = `Lives: ${lives}`;
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillStyle = "black"; 
    ctx.fillText(text, canvas.width - (ctx.measureText(text).width + 20), 20);
}

// function to print game over message on screen:
function drawGameOver() {
    const text = "Game Over";
    ctx.font = "60px 'Press Start 2P'";
    ctx.fillStyle = "black";
    ctx.fillText(text, canvas.width / 2 - (ctx.measureText(text).width / 2), canvas.height / 2);
}

// function to print win message on screen:
function drawYouWin() {
    const text = "You Win!"
    ctx.font = "60px 'Press Start 2P'";
    ctx.fillStyle = "black";
    ctx.fillText(text, canvas.width / 2 - (ctx.measureText(text).width / 2), canvas.height / 2);
}

//functions to move background left / right as sprite is moved:
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

// function to loop through each ball and check for collision
function collisionDetection() {
    const tolerance = 5;
    for (let i=0; i<balls.length; i++) {
        if (
            (x + tolerance) < balls[i].x + ballWidth
            && x + botWidth - tolerance > balls[i].x
            && y + tolerance < balls[i].y + ballHeight
            && y + botHeight - tolerance > balls[i].y
        ) {
            if (!balls[i].status) {
                continue;
            }
            balls[i].status = false;
            if (balls[i].appleOrBomb === apple) {
                score ++;
                if (score < 10) {
                    ballSpeed += 0.5; 
                }
                else if(score === 10) {
                    drawYouWin();
                    gameOver = true;
                }   
            } else {
                if(balls[i].appleOrBomb === bomb) {
                    if (lives > 0) {
                        lives --;
                    } else {
                        drawGameOver();
                        gameOver = true;
                    }
                    
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // add new ball to array every 13 frames
    if (frameNum % 13 === 0) {
        populateBalls(2);
    }

    // draw the apples/bombs:
    for (let i=0; i<balls.length; i++) {
        if (balls[i].status) {
            drawBall(balls[i].appleOrBomb, balls[i].x, balls[i].y);
        } 
    }

    // make the balls fall. Ball speed increases with each point won:
    for (let i=0; i<balls.length; i++) {
        balls[i].y += ballSpeed;
    }

    drawBot();
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
    collisionDetection();
    drawScore();
    drawLives();
    
    if (!gameOver) {
        requestAnimationFrame(draw);
    } 
}
// event listeners and handlers for keyboard controls:
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) { // IE and edge 16 and earlier use 'Left' instead of 'ArrowLeft' etc
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

requestAnimationFrame(draw);
