var imag = document.getElementById("santa");
var gift = document.getElementsByClassName("gift");
var fire = document.getElementsByClassName("fire");
var heart=document.getElementsByClassName("heart")
var score_text = document.getElementsByTagName("p")[1];
var score = 0,lifes=0,dead=false;
for(let i=0;i<gift.length;i++){
    gift[i].style.bottom = '150px';
    gift[i].style.right = (300 * (i+1))+'px'
}
for(let i=0;i<fire.length;i++){
    fire[i].style.bottom = '0px';
    fire[i].style.left = (300 * (i+1))+'px'
}
for(let i=0;i<heart.length;i++){
    heart[i].style.top = '0px';
    heart[i].style.left = (55* (i+1))+'px'
}
window.addEventListener("keydown",keyDownFunc);

imag.style.left =0,imag.style.bottom=0;
function keyDownFunc(event){
     console.log(event.keyCode)
     if(dead===false){
    if(event.keyCode === 39 && parseInt(imag.style.left)<= 1180 ){
     imag.style.left = parseInt(imag.style.left)+10 +'px';
      // console.log(imag.style.left)
    }else if(event.keyCode === 37 &&  parseInt(imag.style.left)>=0){
        imag.style.left = parseInt(imag.style.left)-10 +'px';
    }}
    for(let i=0;i<gift.length;i++){
        if(gift[i].x === imag.x + imag.width){
            gift[i].style.display = "none"
           score_text.textContent ="Score :" + ++score;
        }
    }
    for(let i=0;i<heart.length;i++){
        if((fire[i].x + (fire[i].width)/2 )=== (imag.x + imag.width)){
         heart[heart.length-i-1].style.display ="none"
         lifes++;
        }
    }
    if(lifes=== heart.length){
       imag.style.transform = "rotate(90deg)"
        imag.style.bottom= '-60px'

         dead=true;
    }
}
  /*  console.log(imag.x+ imag.width)
    console.log("gift "+gift.x)*/
   
    

    
