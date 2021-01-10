//create class here
//object frame set to add all photos
//class animate to control the animation of character
var mySound;
mySound=new sound("bounce.mp3")
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
class Animate {
    constructor(frame_set, delay) {
        this.count = 0;
        this.delay = delay;
        this.frame_set = frame_set;
        this.frame_index = 0;
        this.frame = this.frame_set[this.frame_index];
    }
    change(frame_set, delay) {
        if (this.frame_set != frame_set) {
            this.count = 0;
            this.frame_index = 0;
            this.delay = delay;
            this.frame_set = frame_set;
            this.frame = this.frame_set[this.frame_index]
        }
    }
    update() {
        this.count++;
        // console.log(this.count)
        // console.log(this.frame)
        // // console.log(this.count)
        if (this.count >= this.delay) {
            this.count = 0;
            this.frame_index = (this.frame_index >= this.frame_set.length - 1) ? 0 : this.frame_index + 1;
            this.frame = this.frame_set[this.frame_index];
        }
    }
}
//controller class to specify the state of every controller in the game
class Controller {
    leftActive = false;
    rightActive = false;
    upActive = false;
    dActive = false;

    keyUpDown(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.key) {
            case "ArrowUp":
                if (controller.upActive != key_state)
                    controller.upActive = key_state
                break;
            case "ArrowLeft":
                if (controller.leftActive != key_state)
                    controller.leftActive = key_state;
                break;
            case "ArrowRight":
                if (controller.rightActive != key_state)
                    controller.rightActive = key_state;
                break;
            case "ArrowDown":
                if (controller.dActive != key_state)
                    controller.dActive = key_state;
                break;
        }
    }
}
//create character class.......................................
class Character {
    constructor(x, y, height, width, x_velocity = 0, y_velocity = 0, jumping = false) {
        this.xPosition = x;
        this.yPosition = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.jumping = jumping;
        this.height = height;
        this.width = width
        this.Frame_set = {
            idle: ["./img/monkey_idle.png", "./img/monkey_idle.png"],
            idleLeft: ["./img/monkey_idle_left.png", "./img/monkey_idle_left.png"],
            walkRight: ["./img/monkey_walk_1.png", "./img/monkey_walk_2.png", "./img/monkey_walk_3.png", "./img/monkey_walk_4.png"],
            walkLeft: ["./img/monkey_walkleft_1.png", "./img/monkey_walkleft_2.png", "./img/monkey_walkleft_3.png", "./img/monkey_walkleft_4.png"],
            jumpRight: ["./img/monkey_jump_1.png", "./img/monkey_jump_2.png", "./img/monkey_jump_3.png", "./img/monkey_jump_4.png"],
            jumpLeft: ["./img/monkey_jumpleft_1.png", "./img/monkey_jumpleft_2.png", "./img/monkey_jumpleft_3.png", "./img/monkey_jumpleft_4.png"],
        }
        this.animate = new Animate(this.Frame_set.idle, 15);
        this.face = "right";
        this.falling = false
    }
    spirit() {
        if (controller.upActive && !this.jumping && !this.falling) {
            this.jumping = true;
            this.y_velocity -= 12;
            if (this.face == "right")
                this.animate.change(this.Frame_set.jumpRight, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.jumpLeft, 15);
        }
        if (controller.leftActive && !this.falling) {
            this.face = "left"
            this.x_velocity -= 0.06;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkLeft, 15);
            }
            //else {
            //     this.y_velocity += 0.15;
            // }
        }
        if (controller.rightActive && !this.falling) {
            this.face = "right"
            this.x_velocity += 0.06;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkRight, 15);
            }
            // else {
            //     this.y_velocity += 0.15;
            // }
        }
        if (!controller.rightActive && !controller.leftActive) {
            if (this.face == "right")
                this.animate.change(this.Frame_set.idle, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.idleLeft, 15);
        }
        this.y_velocity += 0.25; //used as a graphity
        this.xPosition += this.x_velocity;
        this.yPosition += this.y_velocity;
        this.x_velocity *= 0.96;
        this.y_velocity *= 0.9;
        if (this.xPosition < -5) {
            this.xPosition = -5;
        } else if (this.xPosition + (this.width) / 1.4 > myCanvas.width) {
            this.xPosition = myCanvas.width - (this.width) / 1.4;
        }
    }
}

class targetItems{
    constructor(imag_src,tar_width,tar_height){
        this.SourceOfImag = imag_src;
        this.targetWidth = tar_width;
        this.targetHeight = tar_height;
        this.ArrayOfXpos = [];
        this.ArrayOfYpos = [];
        this.firstTime = true;
    }
    
 DrawTargetItem() {
   
    let currentRow = 0,
        currentCol = 0,
        index = 0,
        skip = false,
        count_fire = 0;
    if (this.firstTime === true) {
        
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
                    BananaImage.src = this.SourceOfImag
                    ctx.drawImage(BananaImage, (currentCol + 2) * tileWidth, (currentRow - 2) * tileHeight, this.targetWidth, this.targetHeight);
                   this.ArrayOfXpos.push((currentCol + 2) * tileWidth)
                   this.ArrayOfYpos.push((currentRow - 2) * tileHeight)
                    //current Row :to put banana above stage
                    //current col+w: w is to put in which col 
                    currentRow = 0
                    skip = true
                } else {
                    skip = false
                }


            }
        }
        this.firstTime = false
    } else {
        for (let j = 0; j < this.ArrayOfYpos.length; j++) {
            let BananaImage = new Image();
            BananaImage.src = this.SourceOfImag
            ctx.drawImage(BananaImage, this.ArrayOfXpos[j], this.ArrayOfYpos[j],this.targetWidth, this.targetHeight);
        }
    }

}
collistionOfTarget(cur_x,cur_y){
    for (var l = 0; l < this.ArrayOfYpos.length; l++) {
        if ((cur_x >= this.ArrayOfXpos[l]+2 && cur_x <= this.ArrayOfXpos[l] + this.targetWidth) && (cur_y >= this.ArrayOfYpos[l] && cur_y <= this.ArrayOfYpos[l] +this.targetHeight)) {
            this.ArrayOfXpos.splice(l, 1)
            this.ArrayOfYpos.splice(l, 1)
            mySound.play();
        }
    }
}

}
//end of class creation.....................
//create all variables here:................
let characterImage = new Image();
let controller = new Controller;
let player1 = new Character(30, 380, 70, 70); //da al character henzl mnen
let banana = new targetItems("banana.png",32,32)

var score =0;


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
function drawCharacter() {
    characterImage.src = player1.animate.frame;
    ctx.drawImage(characterImage, player1.xPosition, player1.yPosition, player1.width, player1.height);
}

function showScore_Reset() {
    ctx.fillStyle = "#58391c";
    ctx.font = "italic bold 20pt Tahoma";
    //syntax : .fillText("text", x, y)
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
    drawTile();
    banana.DrawTargetItem();
    drawCharacter();
    showScore_Reset();
    Colliston();
    window.requestAnimationFrame(loop);
}

function Colliston() {
    let tilex = Math.floor((player1.xPosition + player1.width + 2) / tileWidth);
    let tiley = Math.floor((player1.yPosition + player1.height + 2) / tileHeight);
    let currentTile = tiles[(tiley * mapColumns) + tilex - 1]
    let upTile = tiles[((tiley) * mapColumns) + tilex - (37 * 2) - 1]
    let midTile = tiles[((tiley) * mapColumns) + tilex - 38]
    let previousTile = tiles[(tiley * mapColumns) + tilex - 2]
    let nextTile = tiles[(tiley * mapColumns) + tilex];
    if (currentTile === 0 || currentTile === 6) {
        if (player1.height + player1.yPosition > tiley * tileHeight + 3) {
            player1.jumping = false;
            player1.yPosition = tiley * tileHeight - player1.height + 3;
            player1.y_velocity = 0;

        }
    }
    if (currentTile == undefined && !player1.jumping) {}
    if (nextTile === 51 || nextTile === 4 || nextTile === 6) {
        if (player1.xPosition > tilex * tileWidth - player1.width + 12 && player1.x_velocity > 0) {
            player1.xPosition = tilex * tileWidth - player1.width + 12;
            player1.x_velocity = 0;

        }
    }
    if (previousTile === 51 || previousTile === 4 || previousTile === 6)
        if (player1.xPosition < tilex * tileWidth - player1.width + 12 && player1.x_velocity < 0) {
            player1.xPosition = tilex * tileWidth - player1.width + 12;
            player1.x_velocity = 0;

        }
    if (upTile === 0 || upTile === 4 || upTile === 51 || upTile === 47 || midTile === 0 || midTile === 4 || midTile === 51 || midTile === 47) {
        if (player1.y_velocity < 0)
            player1.y_velocity += 0.8;
    }

    //////////////when touching banana /////////////////
    //console.log(Banana_y[0]+"+"+(Math.floor(player1.yPosition)+3)+player1.width+2)+"+"+Banana_x[0]);
    let currentY = (Math.floor(player1.yPosition) + 3),
        currentX = Math.floor(player1.xPosition) + (player1.width / 1.5);
       banana.collistionOfTarget(currentX,currentY)

}


function ClickonResetFn(event) {
    console.log(event.x + "+" + event.y)
    if ((event.x >= 933 && event.x <= 1018) && (event.y >= 40 && event.y <= 75)) {
        window.location.reload()

    }

}

//create all eventlisteners here
window.addEventListener("load", (event) => {
    window.requestAnimationFrame(loop);
})
window.addEventListener("keydown", controller.keyUpDown)
window.addEventListener("keyup", controller.keyUpDown)
display.addEventListener("click", ClickonResetFn)
// end of eventlisteners creation