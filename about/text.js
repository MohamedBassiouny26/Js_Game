var string = "We are an ITIan Intake 41 Team, working on a JavaScript Game Project, Hope you enjoy it :)";
var string2 = `Team Names: Mohamed Salah - Mohamed Bassiuony - Phoebe Ezzat - Esraa Abo Elkassem`;
var btn = document.getElementsByTagName('button')[0];
var str = string.split("");
var strNames = string2.split("");
var el = document.getElementById('str');
var el2 = document.getElementById('names');

(function animate() {
    if (str.length > 0) {
        el.innerHTML += str.shift()
    } else {
        clearTimeout(running);
        btn.style.display = 'block'
    }
    if (strNames.length > 0) {
        el2.innerHTML += strNames.shift()
    } else {
        clearTimeout(running);
        btn.style.display = 'block'
    }
    var running = setTimeout(animate, 90);

})();

btn.addEventListener('click', testFunc);

function testFunc(e) {
    e.preventDefault();
    window.location.href = '../index.html'
}