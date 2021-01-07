
assetLoader.finished = function() {
 mainMenu();
}
/**
* Show the main menu after loading all assets
*/
function mainMenu() {
 $('#main').show();
}
/**
* Click handlers for the different menu screens
*/
$('.play').click(function() {
 $('#menu').hide();
 startGame();
});