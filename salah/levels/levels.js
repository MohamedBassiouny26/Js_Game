
assetLoader.finished = function() {
 mainMenu();
}

function mainMenu() {
 $('#main').show();
}

$('.play').click(function() {
 $('#menu').hide();
 startGame();
});

