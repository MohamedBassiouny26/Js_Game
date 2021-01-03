var string = "Welcome To Our JS Game, Let's play?";
var btn = document.getElementsByTagName('button')[0];
var str = string.split("");
var el = document.getElementById('str');
(function animate() {
if(str.length > 0)
{
    el.innerHTML += str.shift()
} 
else{
    clearTimeout(running);
    btn.style.display = 'block'
}
var running = setTimeout(animate, 90);

})();

btn.addEventListener('click',testFunc);

function testFunc(e)
{
    e.preventDefault();
    window.location.href = '../menu/menu.html'
}