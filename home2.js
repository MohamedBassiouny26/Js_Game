class SoundClass{
    constructor(source){
        this.soundElement = document.createElement("audio")
        this.soundElement.src = source;
        this.soundElement.setAttribute("preload", "auto");
        this.soundElement.setAttribute("controls", "none");
        this.soundElement.style.display = "none";
        document.body.appendChild(this.soundElement);
    }
    playmusic(){
        this.soundElement.play()
    }
    stopmusic(){
        this.soundElement.pause();
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
var mySound = new SoundClass("bounce.mp3")
var backgroundSound = new SoundClass("melodyloops.mp3")
var score = 0,music_imag,mute=true;
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
let tiles = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  , 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  , 0, 0, 0, 4,47,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,51, 4, 4, 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,51, 4, 4,47,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0, 0, 0, 4,
             4,  ,  ,  ,  ,51, 4,47,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,51, 4, 4,
             4,  ,  ,  ,  ,  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4, 0, 0, 0, 0, 0, 4,80,80,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0, 0, 0, 0,  ,  ,  ,  ,  , 4,
             4, 4, 4, 4, 4, 4, 4, 0, 0,  ,  ,  ,  , 0, 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,51, 4,47,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4, 4, 4,47,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0, 0,  ,  ,  , 0, 0, 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,
             4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,80,80,80,80,80,80, 4,
             4,  ,  ,  ,  ,  , 0, 0,  ,  ,  ,  ,  , 0, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 0, 0, 0, 0, 0, 0, 0, 4,
             4,  ,  ,  ,  ,  , 4, 4,60,60,60,60,60, 4, 4, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4, 4, 4, 4, 4, 4,50, 4,
             4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 4,50, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4,50, 6, 4, 4,
             4, 4, 6, 6, 4, 6, 4, 4, 4, 4, 4,50, 4,50, 4,50, 4, 4, 4,50, 4, 4,50, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 4
];

image.addEventListener('load', drawTile);
let display = document.getElementById("myCanvas");
display.width = 1183;
display.height = 670;
let ctx = display.getContext("2d");
image.addEventListener('load', drawTile);
// imagefire.addEventListener('load', drawTile);
imagewave.addEventListener('load', drawTile);

function drawTile() {
    display.style.width = window.innerWidth + 'px';
    display.style.height = window.innerHeight + 'px';
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
            // context.drawImage(imagefire, 17, 2329, 1960, 904, targetX, targetY, tileWidth, tileHeight);
            ctx.drawImage(imagewave, 5, 33, 595, 297, targetX, targetY, tileWidth, tileHeight);
        }
    }
}

function showScore_Reset() {
    ctx.fillStyle = "#58391c";
    ctx.font = "italic bold 20pt Tahoma";
    let score_imag = new Image()
    score_imag.src ="banana.png"
    ctx.drawImage(score_imag,170,35,32,32)
   ctx.fillText(":"+(15 - banana.ArrayOfXpos.length) + " /15", 200, 60);
    let reset_imag = new Image()
    reset_imag.id = "ResetImage"
    reset_imag.src = "reset.png"
    ctx.drawImage(reset_imag, 800, 40, 80, 50)
     music_imag =new Image()
     console.log(mute)
     if(mute==true){
    music_imag.src = "NoMusic.png"}
    else{music_imag.src = "music.png"}
    ctx.drawImage(music_imag, 900, 42, 50, 45)
    let exit_imag = new Image()
    exit_imag.src = "exit.png"
    ctx.drawImage(exit_imag, 970, 42, 50, 45)
}
//end of creation of variables..............
//main loop function
function loop() {
    player1.spirit();
    player1.animate.update();
    player2.spirit();
    player2.animate.update();
    drawTile();
    banana.DrawTargetItem();
    player1.drawCharacter();
    player2.drawCharacter();
    showScore_Reset();
    player2.Colliston();
    player1.Colliston();
    drwaTrap();
    window.requestAnimationFrame(loop);
}

function ClickonFn(event) {
    console.log(event.y);
    console.log(parseInt(display.style.width))
      let Xpercent = event.x/parseInt(display.style.width);
      let Ypercent = event.y/parseInt(display.style.height);
    if ((Xpercent >= 768/1119 && Xpercent <= 838/1119) && (Ypercent>= 43/657 && Ypercent <= 83/657)) {
        window.location.reload()
    }else if ((Xpercent >= 861/1119 && Xpercent <= 907/1119) && (Ypercent>= 41/657 && Ypercent <= 83/657)){
      if(mute==true){
          backgroundSound.playmusic()
          mute=false;
      }else{
        backgroundSound.stopmusic()
        mute=true;
      }
    
    }
}

window.addEventListener("load", (event) => {
    window.requestAnimationFrame(loop);
})
window.addEventListener("keydown", player1.controller.keyUpDown)
window.addEventListener("keyup", player1.controller.keyUpDown)
window.addEventListener("keydown", player2.controller.keyUpDown)
window.addEventListener("keyup", player2.controller.keyUpDown)
display.addEventListener("click", ClickonFn)
// end of eventlisteners creation
function drwaTrap() {
    let player1Tilex = Math.floor((player1.xPosition + player1.width + 2) / tileWidth);
    let player1Tiley = Math.floor((player1.yPosition + player1.height + 2) / tileHeight);
    let Player1trap = tiles[(player1Tiley * mapColumns) + player1Tilex - 38];
    let player2Tilex = Math.floor((player2.xPosition + player2.width + 2) / tileWidth);
    let player2Tiley = Math.floor((player2.yPosition + player2.height + 2) / tileHeight);
    let player2trap = tiles[(player2Tiley * mapColumns) + player2Tilex - 38];
    if (Player1trap === 80) {
        if (imagefire.getAttribute('src')) {
            player1.dead = true
        }
    } else if (Player1trap === 60) {
        imagewave.src = ""
    } else {
        imagewave.src = "Waves.png"
    }
    if (player2trap === 80) {
        imagefire.src = ""
    } else if (player2trap === 60) {
        if (imagewave.getAttribute("src"))
            player2.dead = true
    } else {
        imagefire.src = "Fire.png"
    }
}