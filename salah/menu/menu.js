
var btnPlay = document.getElementsByClassName('game-button')[0]
var btnAbout = document.getElementsByClassName('game-button')[1]
var btnHow = document.getElementsByClassName('game-button')[2]

btnPlay.addEventListener('click',playFunction)
btnAbout.addEventListener('click',aboutFunction)
btnScore.addEventListener('click',HowFunction)


function playFunction()
{
    window.location.href = "../levels/levels.html"
}
function aboutFunction()
{
    window.location.href = "../about/text.html"
}
function HowFunction()
{
    window.location.href = "../how/how.html"
}