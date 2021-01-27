const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "images/dino.png";
dinoWidth = img.width/5;

let x = 10;
let y = canvas.height/2;
const xChange = 2;
const yChange = 2;

let rightPressed = false;
let leftPressed = false;


// function to draw moving dino sprite:
function drawImage() {
    ctx.drawImage(img, x, y, dinoWidth, img.height/5);
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
    else if(leftPressed) {
        x -= 5;
        if(x < 0) {
            x = 0;
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
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
draw();