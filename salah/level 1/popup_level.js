var score = 12;
window.onload = function(){
  
var modal = document.getElementById("myModal");

var btnC = document.getElementById("c");

$("#myModal").show(400)

btnC.onclick = function() {
  $("#myModal").slideUp(500)
}

$("p").append(score)

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }}
}
