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
let banana = new targetItems("banana.png", 32, 32)
var mySound = new SoundClass("bounce.mp3")
var backgroundSound = new SoundClass("melodyloops.mp3")
var score = 0,music_imag,mute=true;
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
let Maps=new tileMap(tileWidth,tileHeight,mapHeight,mapColumns,tiles)
let display = document.getElementById("myCanvas");
display.style.width = window.innerWidth + 'px';
display.style.height = window.innerHeight + 'px';
display.width = 1170;
display.height = 670;
let ctx = display.getContext("2d");
function showScore_Reset() {
    ctx.fillStyle = "#58391c";
    ctx.font = "italic bold 20pt Tahoma";
    let score_imag = new Image()
    score_imag.src ="banana.png"
    ctx.drawImage(score_imag,170,35,32,32)
    ctx.fillText(":"+(banana.maxNumber - banana.ArrayOfXpos.length) + " /"+ banana.maxNumber, 200, 60);
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
    
    if((banana.maxNumber - banana.ArrayOfXpos.length)===10){
        let dooro=new Image();
    dooro.src="opendoor.png";
    ctx.drawImage(dooro, 1010, 435, 200, 150)
    }
    else{
        let doorc=new Image();
        doorc.src="closedoor.png";
        ctx.drawImage(doorc, 1010, 435, 200, 150)
    }
}
//end of creation of variables..............
//main loop function
function loop() {
    player1.spirit();
    player1.animate.update();
    ////draw Tile maps;
    Maps.draw();
    banana.DrawTargetItem();
    player1.drawCharacter();
    
    showScore_Reset();
    player1.Colliston();
    
    window.requestAnimationFrame(loop);
}

function ClickonResetFn(event) {
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
        



/////////////////////////////////////////////////////////////////////////////////////////////////////////end esraa

//end of creation of variables..............

//create all eventlisteners here
window.addEventListener("load", (event) => {
  
    window.requestAnimationFrame(loop);
});


window.addEventListener("keydown", player1.controller.keyUpDown)
window.addEventListener("keyup", player1.controller.keyUpDown)
window.addEventListener("click", ClickonResetFn)
