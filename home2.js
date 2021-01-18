//create all variables here:................
$(document).ready(function () {
    $("#levelOneBeginModal").show(350)

    $('#okLevel1').click(function () {
        $("#levelOneBeginModal").slideUp(350)
    })
});
let player1 = new Character("player1", 15, 510, 70, 70, Frame_set.player1, lettersController, 0);
let player2 = new Character("player2", 40, 510, 70, 70, Frame_set.player2, ArrowController, 1);
let banana = new targetItems("banana.png", 32, 32)
var mySound = new SoundClass("bounce.mp3")
var backgroundSound = new SoundClass("melodyloops.mp3")
var score = 0,
    music_imag, mute = true;
var lifes = 3;
let tileImage = new Image();
tileImage.src = "Tiles_32x32.png";
let imagefire = new Image();
imagefire.src = "Fire.png";
let imagewave = new Image();
imagewave.src = "waves.png";
const tileWidth = 32,
    tileHeight = 32;
const mapHeight = 21,
    mapColumns = 37;
let tiles = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , 0, 0, 0, 0, 0, 0, 0, 0, , , , 80, 80, , , , , , , , , , , , , , , , , 4,
    4, , , , 0, 0, 0, 4, 47, , , , , , , , , 0, 0, 0, 0, , , , , , , , , , , , , , , , 4,
    4, , , , 51, 4, 4, 4, , , , , , , , , , 51, 4, 4, 47, , , , , , , , , , , 0, 0, 0, 0, 0, 4,
    4, , , , , 51, 4, 47, , , , , , , , , , , , , , , 0, 0, 0, , , , , , , , , , 51, 4, 4,
    4, , , , , , 4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, 0, 0, 0, 0, 0, 4, , , , , , , , , , , , , , , , , , , 0, 60, 60, 60, 60, 0, , , , , , 4,
    4, 4, 4, 4, 4, 4, 4, , , , , , , , , , , , , , , , , , , 51, 0, 0, 0, 0, 47, , , , , , 4,
    4, 4, 4, 47, , , , , , , , , , , , , , , , , 0, 0, 0, , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 0, 0, 0, , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , 0, 0, 0, 0, , , , , , , , , , 4,
    4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 80, 80, 80, 80, 80, 80, 4,
    4, , , , , , 0, 0, , , , , , 0, 0, , , , , , , , , , , , , , , 0, 0, 0, 0, 0, 0, 0, 4,
    4, , , , , , 4, 4, 60, 60, 60, 60, 60, 4, 4, 0, , , , , , , , , , , , , , 4, 4, 4, 4, 4, 4, 50, 4,
    4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 4, 50, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 50, 6, 4, 4,
    4, 4, 6, 6, 4, 6, 4, 4, 4, 4, 4, 50, 4, 50, 4, 50, 4, 4, 4, 50, 4, 4, 50, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 4
];
let Maps = new tileMap(tileWidth, tileHeight, mapHeight, mapColumns, tiles, 2)

//image.addEventListener('load', drawTile);
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
    player2.spirit();
    player2.animate.update();
    Maps.draw();
    drawcave();
    banana.DrawTargetItem();
    player1.drawCharacter();
    player2.drawCharacter();
    Maps.showExtensions();
    player2.Colliston();
    player1.Colliston();
    drawTrap();
    window.requestAnimationFrame(loop);
}

function ClickonFn(event) {
    console.log(event.x + "+" + event.y + "+" + display.style.width + "+" + display.style.height)
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

function drawcave() {
    let cave = new Image();
    cave.src = "cave2.png";
    ctx.drawImage(cave, 1070, 130, 100, 100)
    // ctx.drawImage(cave,1070, 480, 100, 100)
    if ((banana.maxNumber - banana.ArrayOfXpos.length) < banana.maxNumber) {
        let door = new Image();
        door.src = "stones2.png";
        ctx.drawImage(door, 1092, 180, 35, 45)
    } else if ((banana.maxNumber - banana.ArrayOfXpos.length) == banana.maxNumber) {
        if ((player1.xPosition >= 1070 && player1.xPosition <= 1170) && (player1.yPosition >= 130 && player1.yPosition <= 230)) {
            if ((player2.xPosition >= 1070 && player2.xPosition <= 1170) && (player2.yPosition >= 130 && player2.yPosition <= 230)) {
                $("p").text("Congratulations! You've reached the Hard Level with Score : " + (14 - banana.ArrayOfXpos.length))
                console.log(banana.ArrayOfXpos.length);
                $("#levelOneWinModal").show(350)

                $('#nextLevel1Btn').click(function () {
                    window.location.href = './level3.html';
                })
            }
        }
    }
}

function drawTrap() {
    let player1Tilex = player1.getColomn();
    let player1Tiley = player1.getRow();
    let Player1trap = tiles[(player1Tiley * mapColumns) + player1Tilex - 38];
    let player2Tilex = player2.getColomn();
    let player2Tiley = player2.getRow();
    let player2trap = tiles[(player2Tiley * mapColumns) + player2Tilex - 38];
    if (Player1trap == 60) {
        player1.currentRow = player1Tiley;
        player1.touchWaterFire = true;
    } else if (Player1trap == 80 && (player2.touchWaterFire == false || player2Tiley != player1Tiley)) {
        player1 = new Character("player1", 15, 510, 70, 70, Frame_set.player1, lettersController, 0);
        player2 = new Character("player2", 40, 510, 70, 70, Frame_set.player2, ArrowController, 1);

        player1.touchWaterFire = false;
        lifes--;
    } else {
        player1.currentRow = 0;
        player1.touchWaterFire = false;
    }
    if (player2trap == 80) {
        player2.currentRow = player2Tiley;
        player2.touchWaterFire = true;

    } else if (player2trap == 60 && (player1.touchWaterFire == false || player2Tiley != player1Tiley)) {
        player1 = new Character("player1", 15, 510, 70, 70, Frame_set.player1, lettersController, 0);
        player2 = new Character("player2", 40, 510, 70, 70, Frame_set.player2, ArrowController, 1);
        player2.touchWaterFire = false;
        lifes--;
    } else {
        player2.currentRow = 0;
        player2.touchWaterFire = false;
    }
    if (lifes === 0) {
        $("#levelOneLoseModal").show(350)

        $('#level1Btn').click(function () {
            window.location.href = 'level2.html';
        })
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