//create class here
//object frame set to add all photos
let Frame_set = {
    idle: ["./img/monkey_idle.png"],
    walkRight: ["./img/monkey_walk_1.png", "./img/monkey_walk_2.png", "./img/monkey_walk_3.png", "./img/monkey_walk_4.png"],
    walkleft: ["./img/monkey_walk_1.png", "./img/monkey_walk_3.png"],
}
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
        this.count = 0;
        this.frame_index = 0;
        this.delay = delay;
        this.frame_set = frame_set;
        this.frame = this.frame_set[this.frame_index]
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

//end of class creation
//create all variables here:
let display = document.getElementsByTagName("canvas")[0];
let ctx = display.getContext("2d");
// let image = document.getElementsByTagName("img")[0];
let image = new Image();

function drawCharacter() {
    image.src = animate.frame;
    ctx.drawImage(image, 0, 122, 30, 30);
}

let controller = new Controller;
let animate = new Animate(Frame_set.idle, 15);
// animate.change(Frame_set.walkRight, 15);
//end of creation of variables
//main loop function
function loop() {
    animate.update();
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