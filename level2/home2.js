document.getElementById("divv").style.boxShadow = "10px 0px 20px 30px darkgreen"
let image = new Image();
image.src = "Tiles_32x32.png";
let imagefire = new Image();
imagefire.src = "Fire.png";
let imagewave = new Image();
imagewave.src = "waves.png";
const tileWidth = 32,
    tileHeight = 32;
const mapHeight = 21,
    mapColumns = 37;
let tiles = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,,
    , , , , , , , ,0 ,0 ,6 ,6 ,6 ,0 , , , , , , , , , , , , , , , , , , , , , , , ,
    , , , , , , 0,0 ,4 ,47 , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    , , , , 0, 0, 4, 4,47 , , , , , , , , ,2 , 0,0 ,1 , , , , , , , , , , , , 2, 0, 0, 0, 0,
    , , , , 51, 4, 4, 47, , , , , , , , , , 51, 4,4,47 , , , , , , , , , , , , , ,51 , 4,4 ,
    , , , , , 51, 4, , , , , , , , , , , , , , , ,2 ,0 ,1 , , , , , , , , , , , , ,
    , , , , , ,4 , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    0, 0, 0, 0,0 , 0,4,80,80 , , , , , , , , , , , , , , , , ,2 ,0 ,0 ,6 ,6 ,1 , , , , , , ,
    4,4 ,4 ,4 , 4, 4, 4, 0,0 , , , , , 2, 0, 1, , , , , , , , , , 51,4 ,47 , , , , , , , , , ,
    4,4 , 4,47 , , , , , , , , , , , , , , , , , , 2, 0, 1, , , , , , , , , , , , , ,
    47, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 2,0 ,1 , , , ,
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    , , , , , , , , , , , , , , , , 2, 6, 6, 1, , , , 2, 6, 6, 1, , , , , , , , , , ,
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 80, 80, 80,80 , 80, 80, ,
    , , , , , ,0 ,0 , , , , , ,0 ,1 , , , , , , , , , , , , , , , 2, 0, 0, 0, 0, 0, 0,0 ,
    , , , , , , 4,4 ,60 ,60 ,60 ,60 ,60 ,4 ,4 ,1 , , , , , , , , , , , , , , 4,4 ,4 , 4, 4, 4, 50,4 ,
    0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 50, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 50, 6, 4, 50,
    4, 4, 6, 6, 4, 6, 4, 4, 4, 4, 4, 50, 4, 50, 4, 50, 4, 4, 4, 50, 4, 4, 50, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 6];

image.addEventListener('load', draw);
let canvas = document.getElementById("myCanvas");
canvas.style.width = document.getElementById("divv").innerWidth;
canvas.style.height = window.innerHeight;
canvas.width = 1183;
canvas.height = 670;
let context = canvas.getContext("2d");
image.addEventListener('load', draw);
imagefire.addEventListener('load', draw);
imagewave.addEventListener('load', draw);
function draw() {
    for (let i = 0; i < mapColumns * mapHeight; i++) {
        let tile = tiles[i];
        let sourceX = (tile % (mapColumns + 10)) * tileWidth;

        //console.log(sourceX);
        let sourceY = Math.floor(tile / (mapColumns + 10)) * tileHeight;

        //console.log(sourceY);
        let targetX = (i % mapColumns) * tileWidth;
        //console.log("x=")
        //console.log("x= "+targetX,i);
        let targetY = Math.floor(i / mapColumns) * tileHeight;
        //console.log("y= "+targetY,i);
        if(tile!==60&tile!==80){
        context.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, tileWidth, tileHeight);
        }
        else if(tile===80){
             context.drawImage(imagefire, 225, 313, 1452, 1472, targetX, targetY, tileWidth, tileHeight);
            
         }  
        else if(tile===60){
           // context.drawImage(imagefire, 17, 2329, 1960, 904, targetX, targetY, tileWidth, tileHeight);
           context.drawImage(imagewave, 5, 33, 595, 297, targetX, targetY, tileWidth, tileHeight);
        }    
    }
}