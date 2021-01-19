$(".done").hover(function () {
    $('.one').attr("src", "./images/mon.gif");
})

$(".dtwo").hover(function () {
    $('.two').attr("src", "./images/mon2.gif");
})

$(".dthree").hover(function () {
    $('.three').attr("src", "./images/Monster_left.gif");
})

$(".done").mouseleave(function () {
    $('.one').attr("src", "./images/monkey_idle.png");
})

$(".dtwo").mouseleave(function () {
    $('.two').attr("src", "./images/monkey_idle1.png");
})

$(".dthree").mouseleave(function () {
    $('.three').attr("src", "./images/walking_Left_01.png");
})