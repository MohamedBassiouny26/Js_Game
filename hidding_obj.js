var imag = document.getElementById("santa");
var gift = document.getElementsByClassName("gift");
for(let i=0;i<gift.length;i++){
    gift[i].style.bottom = '150px';
    gift[i].style.right = (300 * (i+1))+'px'
}
window.addEventListener("keydown",keyDownFunc);

imag.style.left =0,imag.style.bottom=0;
function keyDownFunc(event){
     console.log(event.keyCode)
    
    if(event.keyCode === 39 && parseInt(imag.style.left)<= 1180 ){
     imag.style.left = parseInt(imag.style.left)+10 +'px';
      // console.log(imag.style.left)
    }else if(event.keyCode === 37 &&  parseInt(imag.style.left)>=0){
        imag.style.left = parseInt(imag.style.left)-10 +'px';
    }
    for(let i=0;i<gift.length;i++){
        if(gift[i].x === imag.x + imag.width){
            gift[i].style.display = "none"
           score_text.textContent ="Score :" + ++score;
        }
    }
   
}
  /*  console.log(imag.x+ imag.width)
    console.log("gift "+gift.x)*/
   
    

    
