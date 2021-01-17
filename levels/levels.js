$(".done").hover(function() {
    $('.one').attr("src","mon.gif");
})

$(".dtwo").hover(function() {
    $('.two').attr("src","mon2.gif");
})

$(".dthree").hover(function() {
    $('.three').attr("src","Monster_left.gif");
})

$(".done").mouseleave(function() {
    $('.one').attr("src","monkey_idle.png");
})

$(".dtwo").mouseleave(function() {
    $('.two').attr("src","monkey_idle1.png");
})

$(".dthree").mouseleave(function() {
    $('.three').attr("src","walking_Left_01.png");
})
