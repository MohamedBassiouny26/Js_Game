window.onload = function(){
  
var modal = document.getElementById("myModal");

var btnC = document.getElementById("c");
var span = document.getElementsByClassName("close")[0];

$("#myModal").show(400)

btnC.onclick = function() {
  $("#myModal").hide(500)
}

span.onclick = function() {
  $("#myModal").hide(500)
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }}
}
