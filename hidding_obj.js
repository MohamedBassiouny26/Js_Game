var imag = document.getElementById("santa");


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
   
}
  /*  console.log(imag.x+ imag.width)
    console.log("gift "+gift.x)*/
   
    

    
