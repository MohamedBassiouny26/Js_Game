//create class here
//object frame set to add all photos
//class animate to control the animation of character
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
        if (this.count >= this.delay) {
            this.count = 0;
            this.frame_index = (this.frame_index >= this.frame_set.length - 1) ? 0 : this.frame_index + 1;
            this.frame = this.frame_set[this.frame_index];
        }
    }
}
//controller class to specify the state of every controller in the game
let ArrowController = {
    leftActive: false,
    rightActive: false,
    upActive: false,
    dActive: false,
    keyUpDown(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.key) {
            case "ArrowUp":
                if (ArrowController.upActive != key_state)
                    ArrowController.upActive = key_state
                break;
            case "ArrowLeft":
                if (ArrowController.leftActive != key_state)
                    ArrowController.leftActive = key_state;
                break;
            case "ArrowRight":
                if (ArrowController.rightActive != key_state)
                    ArrowController.rightActive = key_state;
                break;
            case "ArrowDown":
                if (ArrowController.dActive != key_state)
                    ArrowController.dActive = key_state;
                break;
        }
    }
}
let lettersController = {
    leftActive: false,
    rightActive: false,
    upActive: false,
    dActive: false,
    keyUpDown(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.key) {
            case 'w':
                if (lettersController.upActive != key_state)
                    lettersController.upActive = key_state
                break;
            case "a":
                if (lettersController.leftActive != key_state)
                    lettersController.leftActive = key_state;
                break;
            case "d":
                if (lettersController.rightActive != key_state)
                    lettersController.rightActive = key_state;
                break;
            case "s":
                if (lettersController.dActive != key_state)
                    lettersController.dActive = key_state;
                break;
        }
    }
}
//create character class.......................................
class Character {
    constructor(name, x, y, height, width, frame_set, controller, x_velocity = 0, y_velocity = 0, jumping = false, ) {
        this.name = name;
        this.xPosition = x;
        this.yPosition = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.jumping = jumping;
        this.height = height;
        this.width = width
        this.Frame_set = frame_set
        this.animate = new Animate(this.Frame_set.idle, 15);
        this.face = "right";
        this.falling = false
        this.characterImage = new Image();
        this.controller = controller;
        this.carry = false;
        this.isCarried = false;
    }
    drawCharacter() {
        this.characterImage.src = this.animate.frame;
        ctx.drawImage(this.characterImage, this.xPosition, this.yPosition, this.width, this.height);
    }
    spirit() {
        if (this.controller.upActive && !this.jumping && !this.falling) {
            this.jumping = true;
            this.y_velocity -= 12;
            if (this.face == "right")
                this.animate.change(this.Frame_set.jumpRight, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.jumpLeft, 15);
            if (this.carry)
                player2.jumping = true;
            this.isCarried = false
        }
        if (this.controller.leftActive && !this.falling) {
            this.face = "left"
            this.x_velocity -= 0.06;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkLeft, 15);
            }
            if (this.carry) {
                player2.x_velocity = player1.x_velocity;
            }
        }
        if (this.controller.rightActive && !this.falling) {
            this.face = "right"
            this.x_velocity += 0.06;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkRight, 15);
            }
            if (this.carry) {
                player2.x_velocity = player1.x_velocity;
            }

        }
        if (!this.controller.rightActive && !this.controller.leftActive) {
            if (this.face == "right")
                this.animate.change(this.Frame_set.idle, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.idleLeft, 15);
        }

        this.y_velocity += 0.2; //used as a graphity
        this.xPosition += this.x_velocity;
        this.yPosition += this.y_velocity;
        this.x_velocity *= 0.96;
        this.y_velocity *= 0.9;
        if (this.xPosition < -5) {
            this.xPosition = -5;
        } else if (this.xPosition + (this.width) / 1.4 > myCanvas.width) {
            this.xPosition = myCanvas.width - (this.width) / 1.4;
        }
        if (this.isCarried && this.name === "player2") {
            this.yPosition = player1.yPosition - player1.height + 15;
            this.jumping = false
        }
        if (Math.abs(this.xPosition - player2.xPosition) > 20) {
            player2.isCarried = false;
            player1.carry = false;
        }
    }

    Colliston() {
        let tilex = Math.floor((this.xPosition + this.width + 2) / tileWidth);
        let tiley = Math.floor((this.yPosition + this.height + 2) / tileHeight);
        let currentTile = tiles[(tiley * mapColumns) + tilex - 1]
        let upTile = tiles[((tiley) * mapColumns) + tilex - (37 * 2) - 1]
        let previousTile = tiles[(tiley * mapColumns) + tilex - 2]
        let nextTile = tiles[(tiley * mapColumns) + tilex];
        if (currentTile === 0 || currentTile === 6) {
            if (this.height + this.yPosition > tiley * tileHeight + 3) {
                this.jumping = false;
                this.yPosition = tiley * tileHeight - this.height + 3;
                this.y_velocity = 0;
            }
        }
        if (currentTile == undefined && !this.jumping) {}
        if (nextTile === 51 || nextTile === 4 || nextTile === 6) {
            if (this.xPosition > tilex * tileWidth - this.width + 12 && this.x_velocity > 0) {
                this.xPosition = tilex * tileWidth - this.width + 12;
                this.x_velocity = 0;
            }
        }
        if (previousTile === 51 || previousTile === 4 || previousTile === 6)
            if (this.xPosition < tilex * tileWidth - this.width + 12 && this.x_velocity < 0) {
                this.xPosition = tilex * tileWidth - this.width + 12;
                this.x_velocity = 0;
            }
        if (upTile === 0 || upTile === 4 || upTile === 51 || upTile === 47) {
            if (this.y_velocity < 0)
                this.y_velocity += 0.8;
        }
        //////////////when touching banana /////////////////
        let currentY = (Math.floor(this.yPosition) + 3),
            currentX = Math.floor(this.xPosition) + (this.width / 1.5);
        for (var l = 0; l < Banana_y.length; l++) {
            if ((currentX >= Banana_x[l] && currentX <= Banana_x[l] + 32) && (currentY >= Banana_y[l] && currentY <= Banana_y[l] + 32)) {
                Banana_x.splice(l, 1)
                Banana_y.splice(l, 1)
            }
        }
        if ((this.yPosition - (player2.yPosition + 11.75) >= 0 && this.yPosition - (player2.yPosition + 11.75) <= 20) && (Math.abs(this.xPosition - player2.xPosition) <= 20 && Math.abs(this.xPosition - player2.xPosition) >= 0)) {
            player1.carry = true
            player2.isCarried = true
            player2.jumping = false
            player2.falling = false;
        }
    }
}
//end of class creation.....................
//create all variables here:................
let Frame_set = {
    player1: {
        idle: ["./img/monkey_idle.png", "./img/monkey_idle.png"],
        idleLeft: ["./img/monkey_idle_left.png", "./img/monkey_idle_left.png"],
        walkRight: ["./img/monkey_walk_1.png", "./img/monkey_walk_2.png", "./img/monkey_walk_3.png", "./img/monkey_walk_4.png"],
        walkLeft: ["./img/monkey_walkleft_1.png", "./img/monkey_walkleft_2.png", "./img/monkey_walkleft_3.png", "./img/monkey_walkleft_4.png"],
        jumpRight: ["./img/monkey_jump_1.png", "./img/monkey_jump_2.png", "./img/monkey_jump_3.png", "./img/monkey_jump_4.png"],
        jumpLeft: ["./img/monkey_jumpleft_1.png", "./img/monkey_jumpleft_2.png", "./img/monkey_jumpleft_3.png", "./img/monkey_jumpleft_4.png"],
    }
}
let player1 = new Character("player1", 30, 380, 70, 70, Frame_set.player1, ArrowController); //da al character henzl mnen
let player2 = new Character("player2", 90, 380, 70, 70, Frame_set.player1, lettersController); //da al character henzl mnen
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