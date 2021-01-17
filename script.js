
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
var player1 = new Character("player1", 30, 380, 70, 70, Frame_set.player1, ArrowController); //da al character henzl mnen
let banana = new targetItems("banana.png", 32, 32)
var mySound = new SoundClass("bounce.mp3")
var backgroundSound = new SoundClass("melodyloops.mp3")
var score = 0, music_imag, mute = true;
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
    4, , , , , , , , , , , , , , , , , , , , , 0, 0, 0, 0, 0, , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , 0, 0, 0, 0, 0, , , , , 4,
    4, , , , , , , , , , , , , , , 0, 0, 0, 0, 0, , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , 0, 0, 0, 0, , , , , , , , , , 0, 0, 0, 0, 0, 0, 0, , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , 0, 4, 4, 4, 4, 4, 4, 4, , , , , , , 4,
    4, , , , , , , 0, 0, , , , , , , , , , , , , 0, 4, 4, 4, 4, 4, 4, 6, 4, 0, 0, , , , , 4,
    4, , , , , , , 6, 4, 0, , , , , , , , , , 0, 0, 4, 4, 4, 4, 4, 4, 6, 6, 4, , , , , , , 4,
    4, 0, 0, 0, 0, 0, 0, 4, 47, , , , , , , , , , , 4, 4, 4, 4, 4, 6, 6, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4,
    4, 4, 4, 4, 6, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6,
    4, 4, 4, 6, 4, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 6
];
let Maps = new tileMap(tileWidth, tileHeight, mapHeight, mapColumns, tiles)
let display = document.getElementById("myCanvas");
display.style.width = window.innerWidth + 'px';
display.style.height = window.innerHeight + 'px';
display.width = 1170;
display.height = 670;
let ctx = display.getContext("2d");

//end of creation of variables..............
//main loop function
function loop() {
    player1.spirit();
    player1.animate.update();
    ////draw Tile maps;
    Maps.draw();        
    drawcave();
    banana.DrawTargetItem();
    player1.drawCharacter();     
    Maps.showExtensions();
    player1.Colliston();    
    window.requestAnimationFrame(loop);
}
function drawcave(){
    let cave = new Image();
        cave.src = "cave2.png";
        ctx.drawImage(cave,1070, 480, 100, 100)
    if ((banana.maxNumber - banana.ArrayOfXpos.length) < banana.maxNumber) {
        let door = new Image();
        door.src = "stones2.png";
        ctx.drawImage(door, 1092, 530, 35, 45)
    }else if((banana.maxNumber - banana.ArrayOfXpos.length) == banana.maxNumber){
    if ((player1.xPosition >=1070 && player1.xPosition <= 1170) && (player1.yPosition >= 480 && player1.yPosition <= 580)){
       // win level 
        
    }}
    
}

function ClickonResetFn(event) {
    console.log(event.y);
    console.log(parseInt(display.style.width))
    let Xpercent = event.x / parseInt(display.style.width);
    let Ypercent = event.y / parseInt(display.style.height);
    if ((Xpercent >= 768 / 1119 && Xpercent <= 838 / 1119) && (Ypercent >= 43 / 657 && Ypercent <= 83 / 657)) {
        window.location.reload()
    } else if ((Xpercent >= 861 / 1119 && Xpercent <= 907 / 1119) && (Ypercent >= 41 / 657 && Ypercent <= 83 / 657)) {
        if (mute == true) {
            backgroundSound.playmusic()
            mute = false;
        } else {
            backgroundSound.stopmusic()
            mute = true;
        }

    }
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////end esraa

//end of creation of variables..............

//create all eventlisteners here
window.addEventListener("load", (event) => {

    window.requestAnimationFrame(loop);
});


window.addEventListener("keydown", player1.controller.keyUpDown)
window.addEventListener("keyup", player1.controller.keyUpDown)
window.addEventListener("click", ClickonResetFn)
