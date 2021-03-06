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
        console.log(this.count)
        console.log(this.frame)
        // console.log(this.count)
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
    }
    spirit() {
        if (controller.upActive && !this.jumping) {
            this.jumping = true;
            this.y_velocity -= 10;
            controller.upActive = false;
            if (this.face == "right")
                this.animate.change(this.Frame_set.jumpRight, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.jumpLeft, 15);

        }
        if (controller.dActive) {
            this.jumping = false;
            this.y_velocity += 7;
            controller.dActive = false;
        }
        if (controller.leftActive) {
            this.face = "left"
            this.x_velocity -= 0.05;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkLeft, 15);
            }
        }
        if (controller.rightActive) {
            this.face = "right"
            this.x_velocity += 0.05;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkRight, 15);
            }
        }
        if (!controller.rightActive && !controller.leftActive) {
            if (this.face == "right")
                this.animate.change(this.Frame_set.idle, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.idleLeft, 15);
        }
        this.y_velocity += 0.05; //used as a graphity
        this.xPosition += this.x_velocity;
        if(this.yPosition <= 110){
        this.yPosition += this.y_velocity;}
        this.x_velocity *= 0.96;
        this.y_velocity *= 0.9;
        if (this.height + this.yPosition > ctx.canvas.height) {
            this.jumping = false;
            this.yPosition = ctx.canvas.height - player1.height;
            this.y_velocity = 0;
        }
        if(this.xPosition<-5){
            this.xPosition = -5;
        }else if(this.xPosition + (this.width)/1.4 > canvas.width){
            this.xPosition = canvas.width - (this.width)/1.4 ;
        }
       
    }
}


//end of class creation.....................
//create all variables here:................
let display = document.getElementsByTagName("canvas")[0];
let ctx = display.getContext("2d");
let image = new Image();
let image_stone= new Image();
let image_gift =new Image();
let controller = new Controller;
let player1 = new Character(-5,100, 30, 30);//da al character henzl mnen 
console.log(ctx.canvas.height);
console.log(player1.height);
let counter = 0;
image_stone.src = "stone.jpg";
image_gift.src = "Picture2.png";
image_stone.addEventListener('load', drawTileMap);
const tileWidth = 15,
tileHeight = 15;
const mapRow = 10,
mapColumns = 20;
  let tiles = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,
               0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
               0,0,0,0,0,0,0,1,3,1,0,4,0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,4,
               0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1, 
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,
               1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,2,2,2
            ];
            function drawTileMap() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for(let i=0;i<mapColumns*mapRow;i++) {
                    let tile = tiles[i];
                    let targetX = (i % mapColumns) * tileWidth; 
                    let targetY = Math.floor (i/mapColumns)* tileHeight;
                    switch (tile) {
                       case 0:
                           break;
                        case 1:
                    ctx.drawImage(image_stone, 248, 15, 100, 100, targetX, targetY, tileWidth, tileHeight);
                    
                    
                         break;
                        case 2: 
                    ctx.drawImage(image_stone, 248, 131, 100, 80, targetX, targetY, tileWidth, tileHeight);
                       break;
                       case 3://fire
                        ctx.drawImage(image_stone, 240, 360, 120, 115, targetX, targetY, tileWidth, tileHeight);
                        break; 
                        case 4: //gift
                        ctx.drawImage(image_gift, 30, 8, 30, 40, targetX, targetY, tileWidth, tileHeight);
                    }
                  //  let sourceX = (tile % mapColumns) * tileWidth;
                   // let sourceY = Math.floor(tile/mapColumns)*tileHeight;
                        }
                        }
function drawCharacter() {
    console.log(player1.animate.frame)
    image.src = player1.animate.frame;
    ctx.drawImage(image, player1.xPosition, player1.yPosition, player1.width, player1.height);
}
//end of creation of variables..............
//main loop function
function loop() {
  player1.spirit();
   player1.animate.update();
   drawTileMap();
   drawCharacter();
    window.requestAnimationFrame(loop);
}
//create all eventlisteners here
window.addEventListener("load", (event) => {
    window.requestAnimationFrame(loop);
})
window.addEventListener("keydown", controller.keyUpDown)
window.addEventListener("keyup", controller.keyUpDown)
// end of eventlisteners creation