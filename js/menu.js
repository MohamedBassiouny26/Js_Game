var btnPlay = document.getElementsByClassName('game-button')[0]
var btnAbout = document.getElementsByClassName('game-button')[1]
var btnHow = document.getElementsByClassName('game-button')[2]

btnPlay.addEventListener('click', playFunction)
btnAbout.addEventListener('click', aboutFunction)
btnHow.addEventListener('click', HowFunction)


function playFunction() {
    window.location.href = "./levels.html"
}

function aboutFunction() {
    window.location.href = "./text.html"
}

function HowFunction() {
    window.location.href = "./how.html"
}