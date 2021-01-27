const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "images/dino.png";
dinoWidth = img.width/5;
dinoHeight = img.height/5;

let x = 10;
let y = canvas.height/2;
const xChange = 2;
const yChange = 2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;


// function to draw moving dino sprite:
function drawImage() {
    ctx.drawImage(img, x, y, dinoWidth, dinoHeight);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();
    if(rightPressed) {
        x += 5;
        if (x + dinoWidth > canvas.width) {
            x = canvas.width - dinoWidth;
        }
    }
    if(leftPressed) {
        x -= 5;
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
        if (y + dinoHeight > canvas.height) {
            y = canvas.height - dinoHeight;
        }
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