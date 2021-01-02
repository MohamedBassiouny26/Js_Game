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

    keyUpDown() {
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
            walkRight: ["./img/monkey_walk_1.png", "./img/monkey_walk_2.png", "./img/monkey_walk_3.png", "./img/monkey_walk_4.png"],
            jump: ["./img/monkey_jump_1.png", "./img/monkey_jump_2.png", "./img/monkey_jump_3.png", "./img/monkey_jump_4.png"],
            walkleft: ["./img/monkey_walk_1.png", "./img/monkey_walk_3.png"],
        }
        this.animate = new Animate(this.Frame_set.idle, 15);
    }
    spirit() {
        if (controller.upActive && !this.jumping) {
            this.jumping = true;
            this.y_velocity -= 7;
            controller.upActive = false;
            this.animate.change(this.Frame_set.jump, 15);
        } else if (controller.rightActive) {
            this.x_velocity += 0.05;
            controller.rithtActive = false;
            if (!this.jumping)
                this.animate.change(this.Frame_set.walkRight, 15);
        } else if (!controller.rightActive && !controller.leftActive) {
            this.animate.change(this.Frame_set.idle, 15);
        }
        this.y_velocity += 0.05;
        this.xPosition += this.x_velocity;
        this.yPosition += this.y_velocity;
        this.x_velocity *= 0.9;
        this.y_velocity *= 0.9;
        if (this.height + this.yPosition > ctx.canvas.height) {
            this.jumping = false;
            this.yPosition = ctx.canvas.height - player1.height;
            this.y_velocity = 0;
        }
    }

}
//end of class creation.....................
//create all variables here:................
let display = document.getElementsByTagName("canvas")[0];
let ctx = display.getContext("2d");
let image = new Image();
let controller = new Controller;
let player1 = new Character(0, 122, 30, 30);
console.log(ctx.canvas.height);
console.log(player1.height);
let counter = 0;

function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    image.src = player1.animate.frame;
    ctx.drawImage(image, player1.xPosition, player1.yPosition, player1.width, player1.height);
}

//end of creation of variables..............
//main loop function
function loop() {
    player1.spirit();
    player1.animate.update();
    drawCharacter();
    window.requestAnimationFrame(loop)
}

//create all eventlisteners here
window.addEventListener("load", (event) => {
    window.requestAnimationFrame(loop);
})
window.addEventListener("keydown", controller.keyUpDown)
window.addEventListener("keyup", controller.keyUpDown)
// end of eventlisteners creation