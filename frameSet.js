let idleBrown = [];
CreateImage(idleBrown, 1, 'img', 'monkey_idle');
let idleLeftBrown = [];
CreateImage(idleLeftBrown, 1, 'img', 'monkey_idle_left');
let walkRightBrown = [];
CreateImage(walkRightBrown, 8, 'img', 'monkey_run');
let walkLeftBrown = [];
CreateImage(walkLeftBrown, 8, 'img', 'monkey_runleft');
let jumpRightBrown = [];
CreateImage(jumpRightBrown, 4, 'img', 'monkey_jump');
let jumpLeftBrown = [];
CreateImage(jumpLeftBrown, 4, 'img', 'monkey_jumpleft');
let idleBlue = [];
CreateImage(idleBlue, 1, 'img_blue', 'monkey_idle');
let idleLeftBlue = [];
CreateImage(idleLeftBlue, 1, 'img_blue', 'monkey_idle_left');
let walkRightBlue = [];
CreateImage(walkRightBlue, 8, 'img_blue', 'monkey_run');
let walkLeftBlue = [];
CreateImage(walkLeftBlue, 8, 'img_blue', 'monkey_runleft');
let jumpRightBlue = [];
CreateImage(jumpRightBlue, 4, 'img_blue', 'monkey_jump');
let jumpLeftBlue = [];
CreateImage(jumpLeftBlue, 4, 'img_blue', 'monkey_jumpleft');

let walkLeft = [new Image, new Image, new Image, new Image]
let idle = [new Image, new Image]
idle[0].src = "./img/monkey_idle.png";
idle[1].src = "./img/monkey_idle.png";
let idleLeft = [new Image, new Image]
idleLeft[0].src = "./img/monkey_idle_left.png";
idleLeft[1].src = "./img/monkey_idle_left.png";

let Frame_set = {
    player2: {
        idle: idleBrown,
        idleLeft: idleLeftBrown,
        walkRight: walkRightBrown,
        walkLeft: walkLeftBrown,
        jumpRight: jumpRightBrown,
        jumpLeft: jumpLeftBrown,
    },
    player1: {
        idle: idleBlue,
        idleLeft: idleLeftBlue,
        walkRight: walkRightBlue,
        walkLeft: walkLeftBlue,
        jumpRight: jumpRightBlue,
        jumpLeft: jumpLeftBlue,
    },
}

function CreateImage(nameOfimages, numberofImages, imageFolder, imageName) {
    for (let i = 0; i < numberofImages; i++) {
        nameOfimages.push(new Image)
    }
    for (let i = 1; i <= numberofImages; i++) {
        nameOfimages[i - 1].src = `./${imageFolder}/${imageName}_${i}.png`;
    }
}