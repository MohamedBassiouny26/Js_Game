var mySound;
mySound = new sound("bounce.mp3")

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


//create all variables here:................
let Frame_set = {
    player1: {
        idle: ["./img/monkey_idle.png", "./img/monkey_idle.png"],
        idleLeft: ["./img/monkey_idle_left.png", "./img/monkey_idle_left.png"],
        walkRight: ["./img/monkey_walk_1.png", "./img/monkey_walk_2.png", "./img/monkey_walk_3.png", "./img/monkey_walk_4.png"],
        walkLeft: ["./img/monkey_walkleft_1.png", "./img/monkey_walkleft_2.png", "./img/monkey_walkleft_3.png", "./img/monkey_walkleft_4.png"],
        jumpRight: ["./img/monkey_jump_1.png", "./img/monkey_jump_2.png", "./img/monkey_jump_3.png", "./img/monkey_jump_4.png"],
        jumpLeft: ["./img/monkey_jumpleft_1.png", "./img/monkey_jumpleft_2.png", "./img/monkey_jumpleft_3.png", "./img/monkey_jumpleft_4.png"],
    },
    player2: {
        idle: ["./img_blue/monkey_idle.png", "./img_blue/monkey_idle.png"],
        idleLeft: ["./img_blue/monkey_idle_left.png", "./img_blue/monkey_idle_left.png"],
        walkRight: ["./img_blue/monkey_walk_1.png", "./img_blue/monkey_walk_2.png", "./img_blue/monkey_walk_3.png", "./img_blue/monkey_walk_4.png"],
        walkLeft: ["./img_blue/monkey_walkleft_1.png", "./img_blue/monkey_walkleft_2.png", "./img_blue/monkey_walkleft_3.png", "./img_blue/monkey_walkleft_4.png"],
        jumpRight: ["./img_blue/monkey_jump_1.png", "./img_blue/monkey_jump_2.png", "./img_blue/monkey_jump_3.png", "./img_blue/monkey_jump_4.png"],
        jumpLeft: ["./img_blue/monkey_jumpleft_1.png", "./img_blue/monkey_jumpleft_2.png", "./img_blue/monkey_jumpleft_3.png", "./img_blue/monkey_jumpleft_4.png"],
    },
}
let player1 = new Character("player1", 30, 380, 70, 70, Frame_set.player1, ArrowController); //da al character henzl mnen
let player2 = new Character("player2", 90, 380, 70, 70, Frame_set.player2, lettersController); //da al character henzl mnen
let banana = new targetItems("banana.png", 32, 32)
var score = 0;
document.getElementById("divv").style.boxShadow = "10px 0px 20px 30px darkgreen"
let image = new Image();
image.src = "Tiles_32x32.png";
let imagefire = new Image();
imagefire.src = "Fire.png";
let imagewave = new Image();
imagewave.src = "waves.png";
const tileWidth = 32,
    tileHeight = 32;
const mapHeight = 21,
    mapColumns = 37;
let tiles = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 0, 0, 6, 6, 6, 0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 0, 0, 4, 47, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 0, 0, 4, 4, 47, , , , , , , , , 2, 0, 0, 1, , , , , , , , , , , , 2, 0, 0, 0, 0, , , , , 51, 4, 4, 47, , , , , , , , , , 51, 4, 4, 47, , , , , , , , , , , , , , 51, 4, 4, , , , , , 51, 4, , , , , , , , , , , , , , , , 2, 0, 1, , , , , , , , , , , , , , , , , , , 4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    0, 0, 0, 0, 0, 0, 4, 80, 80, , , , , , , , , , , , , , , , , 2, 0, 0, 6, 6, 1, , , , , , ,
    4, 4, 4, 4, 4, 4, 4, 0, 0, , , , , 2, 0, 1, , , , , , , , , , 51, 4, 47, , , , , , , , , ,
    4, 4, 4, 47, , , , , , , , , , , , , , , , , , 2, 0, 1, , , , , , , , , , , , , ,
    47, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 2, 0, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 2, 6, 6, 1, , , , 2, 6, 6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 80, 80, 80, 80, 80, 80, , , , , , , , 0, 0, , , , , , 0, 1, , , , , , , , , , , , , , , 2, 0, 0, 0, 0, 0, 0, 0, , , , , , , 4, 4, 60, 60, 60, 60, 60, 4, 4, 1, , , , , , , , , , , , , , 4, 4, 4, 4, 4, 4, 50, 4,
    0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 50, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 50, 6, 4, 50,
    4, 4, 6, 6, 4, 6, 4, 4, 4, 4, 4, 50, 4, 50, 4, 50, 4, 4, 4, 50, 4, 4, 50, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 6
];

image.addEventListener('load', drawTile);
let display = document.getElementById("myCanvas");
display.style.width = document.getElementById("divv").innerWidth;
display.style.height = window.innerHeight;
display.width = 1183;
display.height = 670;
let ctx = display.getContext("2d");
image.addEventListener('load', drawTile);
imagefire.addEventListener('load', drawTile);
imagewave.addEventListener('load', drawTile);

function drawTile() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    for (let i = 0; i < mapColumns * mapHeight; i++) {
        let tile = tiles[i];
        let sourceX = (tile % (mapColumns + 10)) * tileWidth;

        //console.log(sourceX);
        let sourceY = Math.floor(tile / (mapColumns + 10)) * tileHeight;

        //console.log(sourceY);
        let targetX = (i % mapColumns) * tileWidth;
        //console.log("x=")
        //console.log("x= "+targetX,i);
        let targetY = Math.floor(i / mapColumns) * tileHeight;
        //console.log("y= "+targetY,i);
        if (tile !== 60 & tile !== 80) {
            ctx.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, tileWidth, tileHeight);
        } else if (tile === 80) {
            ctx.drawImage(imagefire, 225, 313, 1452, 1472, targetX, targetY, tileWidth, tileHeight);

        } else if (tile === 60) {
            // ctx.drawImage(imagefire, 17, 2329, 1960, 904, targetX, targetY, tileWidth, tileHeight);
            ctx.drawImage(imagewave, 5, 33, 595, 297, targetX, targetY, tileWidth, tileHeight);
        }
    }
}

function showScore_Reset() {
    ctx.fillStyle = "#58391c";
    ctx.font = "italic bold 20pt Tahoma";
    console.log(banana.ArrayOfXpos.length)
    ctx.fillText("Score : " + (10 - banana.ArrayOfXpos.length) + " /10", 200, 60);
    let reset_imag = new Image()
    reset_imag.id = "ResetImage"
    reset_imag.src = "reset.png"
    ctx.drawImage(reset_imag, 800, 40, 80, 50)
}
//end of creation of variables..............
//main loop function
function loop() {
    player1.spirit();
    player1.animate.update();
    player2.spirit();
    player2.animate.update();
    drawTile();
    player1.drawCharacter();
    player2.drawCharacter();
    banana.DrawTargetItem();
    showScore_Reset();
    player1.Colliston();
    player2.Colliston();
    window.requestAnimationFrame(loop);
}

function ClickonResetFn(event) {
    console.log(event.x + "+" + event.y)
    if ((event.x >= 933 && event.x <= 1018) && (event.y >= 40 && event.y <= 75)) {
        window.location.reload()
    }
}

window.addEventListener("load", (event) => {
    window.requestAnimationFrame(loop);
})
window.addEventListener("keydown", player1.controller.keyUpDown)
window.addEventListener("keyup", player1.controller.keyUpDown)
window.addEventListener("keydown", player2.controller.keyUpDown)
window.addEventListener("keyup", player2.controller.keyUpDown)
display.addEventListener("click", ClickonResetFn)
// end of eventlisteners creation