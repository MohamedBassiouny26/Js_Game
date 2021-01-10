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
        idle: ["./img/dog/idle (1).png", "./img/dog/idle (2).png"],
        idleLeft: ["./img/monkey_idle_left.png", "./img/monkey_idle_left.png"],
        walkRight: ["./img/dog/jump (1).png", "./img/dog/run (2).png", "./img/dog/run (3).png", "./img/dog/run (4).png", "./img/dog/run (5).png", "./img/dog/run (6).png", "./img/dog/run (7).png", "./img/dog/run (8).png", ],
        walkLeft: ["./img/dog/run (1).png", "./img/dog/run (2).png", "./img/dog/run (3).png", "./img/dog/run (4).png", "./img/dog/run (5).png", "./img/dog/run (6).png", "./img/dog/run (7).png", "./img/dog/run (8).png", ],
        jumpRight: ["./img/dog/jump (1).png", "./img/dog/jump (2).png", "./img/dog/jump (3).png", "./img/dog/jump (4).png", "./img/dog/jump (5).png", "./img/dog/jump (6).png", "./img/dog/jump (7).png", "./img/dog/jump (8).png", ],
        jumpLeft: ["./img/monkey_jumpleft_1.png", "./img/monkey_jumpleft_2.png", "./img/monkey_jumpleft_3.png", "./img/monkey_jumpleft_4.png"],
    }
}
let player1 = new Character("player1", 30, 380, 70, 70, Frame_set.player1, ArrowController); //da al character henzl mnen
let player2 = new Character("player2", 90, 380, 70, 70, Frame_set.player2, lettersController); //da al character henzl mnen
var score = 0
var Banana_x = [],
    Banana_y = [],
    first_time = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////esraa
let tileImage = new Image();
tileImage.src = "Tiles_32x32.png";
const tileWidth = 32,
    tileHeight = 32;
const mapHeight = 21,
    mapColumns = 37;
let tiles = [
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , 0, 0, 0, 0, 0, , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , 0, 0, 0, 0, , , , , , , , , , 0, 0, 0, 0, 0, 0, 0, , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , 0, 4, 4, 4, 4, 4, 4, 4, , , , , , , 4,
    4, , , , , , , 0, 0, , , , , , , , , , , , , 0, 4, 4, 4, 4, 4, 4, 6, 4, 0, 0, , , , , 4,
    4, , , , , , , 6, 4, 0, , , , , , , , , , 0, 0, 4, 4, 4, 4, 4, 4, 6, 6, 4, , , , , , , 4,
    4, 0, 0, 0, 0, 0, 0, 4, 47, , , , , , , , , , , 4, 4, 4, 4, 4, 6, 6, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4,
    4, 4, 4, 4, 6, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6,
    4, 4, 4, 6, 4, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 6
];
tileImage.addEventListener('load', drawTile);
let display = document.getElementById("myCanvas");
display.style.width = window.innerWidth;
display.style.height = window.innerHeight;
display.width = 1170;
display.height = 670;
let ctx = display.getContext("2d");
tileImage.addEventListener('load', drawTile);

function drawTile() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (let i = 0; i < mapColumns * mapHeight; i++) {
        let tile = tiles[i];
        let sourceX = (tile % (mapColumns + 10)) * tileWidth;
        let sourceY = Math.floor(tile / (mapColumns + 10)) * tileHeight;
        let targetX = (i % mapColumns) * tileWidth;
        let targetY = Math.floor(i / mapColumns) * tileHeight;
        ctx.drawImage(tileImage, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, tileWidth, tileHeight);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////end esraa


function showScore_Reset() {
    ctx.fillStyle = "#58391c";
    ctx.font = "italic bold 20pt Tahoma";
    ctx.fillText("Score : " + (10 - Banana_x.length) + " /10", 200, 60);
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
    DrawBanana();
    player1.drawCharacter();
    player2.drawCharacter();
    showScore_Reset();
    player1.Colliston();
    player2.Colliston();
    window.requestAnimationFrame(loop);
}

function DrawBanana() {
    let currentRow = 0,
        currentCol = 0,
        index = 0,
        skip = false,
        count_fire = 0;
    if (first_time === true) {
        for (var x = 0; x < mapColumns * mapHeight; x++) {

            if (tiles[x] === 0 && tiles[x + 1] === 0 && tiles[x + 2] === 0) {
                if (skip == false) {
                    index = x
                    while (index > 36) {
                        index = index - 37
                        currentRow++;
                    }
                    x = x + 2;
                    currentCol = index
                    let BananaImage = new Image();
                    BananaImage.src = "Banana.png"
                    ctx.drawImage(BananaImage, (currentCol + 2) * tileWidth, (currentRow - 2) * tileHeight, 32, 32);
                    Banana_x.push((currentCol + 2) * tileWidth)
                    Banana_y.push((currentRow - 2) * tileHeight)
                    //current Row :to put banana above stage
                    //current col+w: w is to put in which col 
                    currentRow = 0
                    skip = true
                } else {
                    skip = false
                }
            }
        }
        first_time = false
    } else {
        for (let j = 0; j < Banana_y.length; j++) {
            let BananaImage = new Image();
            BananaImage.src = "Banana.png"
            ctx.drawImage(BananaImage, Banana_x[j], Banana_y[j], 32, 32);
        }
    }

}

function ClickonResetFn(event) {
    console.log(event.x + "+" + event.y)
    if ((event.x >= 933 && event.x <= 1018) && (event.y >= 40 && event.y <= 75)) {
        window.location.reload()
    }
}

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
        ctx.drawImage(tileImage, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, tileWidth, tileHeight);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////end esraa



//end of creation of variables..............

//create all eventlisteners here
window.addEventListener("load", (event) => {
    window.requestAnimationFrame(loop);
})
window.addEventListener("keydown", player1.controller.keyUpDown)
window.addEventListener("keyup", player1.controller.keyUpDown)
window.addEventListener("keydown", player2.controller.keyUpDown)
window.addEventListener("keyup", player2.controller.keyUpDown)
display.addEventListener("click", ClickonResetFn)
// end of eventlisteners creation