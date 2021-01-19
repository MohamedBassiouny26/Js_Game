//create all variables here:................
$(document).ready(function () {
    $("#levelOneBeginModal").show(350)

    $('#okLevel1').click(function () {
        $("#levelOneBeginModal").slideUp(350)
    })
});
var player1 = new Character("player1", 30, 380, 70, 70, Frame_set.player2, ArrowController); //da al character henzl mnen
let banana = new targetItems("./images/banana.png", 32, 32)
var mySound = new SoundClass("bounce.mp3")
var backgroundSound = new SoundClass("melodyloops.mp3")
var score = 0,
    music_imag, mute = true;
let tileImage = new Image();
tileImage.src = "./images/Tiles_32x32.png";
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
let Maps = new tileMap(tileWidth, tileHeight, mapHeight, mapColumns, tiles, 1)
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

function drawcave() {
    let cave = new Image();
    cave.src = "./images/cave2.png";
    ctx.drawImage(cave, 1070, 480, 100, 100)
    if ((banana.maxNumber - banana.ArrayOfXpos.length) < banana.maxNumber) {
        let door = new Image();
        door.src = "./images/stones2.png";
        ctx.drawImage(door, 1092, 530, 35, 45)
    } else if ((banana.maxNumber - banana.ArrayOfXpos.length) == banana.maxNumber) {
        if ((player1.xPosition >= 1070 && player1.xPosition <= 1170) && (player1.yPosition >= 480 && player1.yPosition <= 580)) {
            $("p").text("Congratulations! You've reached the Intermediate Level with Score : " + (10 - banana.ArrayOfXpos.length))
            console.log(banana.ArrayOfXpos.length);
            $("#levelOneWinModal").show(350)
            $('#nextLevel1Btn').click(function () {
                window.location.href = './level2.html';
            })
        }
    }
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

    } else if ((Xpercent >= 929 / 1119 && Xpercent <= 974 / 1119) && (Ypercent >= 41 / 657 && Ypercent <= 83 / 657)) {
        window.location.href = './index.html';

    }
}
window.addEventListener("load", (event) => {

    window.requestAnimationFrame(loop);
});
window.addEventListener("keydown", player1.controller.keyUpDown)
window.addEventListener("keyup", player1.controller.keyUpDown)
window.addEventListener("click", ClickonResetFn)