
var btnPlay = document.getElementsByClassName('game-button')[0]
var btnAbout = document.getElementsByClassName('game-button')[1]
var btnScore = document.getElementsByClassName('game-button')[3]

btnPlay.addEventListener('click',playFunction)
btnAbout.addEventListener('click',aboutFunction)
btnScore.addEventListener('click',scoreFunction)


function playFunction()
{
    console.log('m')
    window.location.href = "../levels/levels.html"
}
function aboutFunction()
{
    console.log('about')
    window.location.href = "../about/text.html"
}
function scoreFunction()
{
    console.log('score')
    alert("Highest Score : 0")
}
