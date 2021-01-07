let image = new Image();
image.src = "Tiles_32x32.png";
const tileWidth = 32,
  tileHeight = 32;
const mapHeight = 21,
    mapColumns = 37;
let tiles = [4, 4, 4, 4, 4, 4, 4,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4,4,4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , ,0 ,0 ,0 ,0 ,0 , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , 51,4 ,4 ,4 ,47 , , , , , , , , , , , , , , , , , ,4 ,
             4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , ,0 ,0 ,0 ,0 , , , , , , , , , , , , 0,0 , 0, 0, 0, , , , , , ,4 ,
             4, , , , , , , , , , , , , , , , , , , , , , , , , 51, 4, 4, 4, 47, , , , , , , 4,
             4, , , , , , , ,0 ,0 ,0 ,0 , , , 0,0 ,0 ,0 , , , , , , , , , , , , , , , , , , , 4,
             4, , , , , , , , , , , , , , , , , , , , , , , 2, 0, 0, 0, 0, 0, 0, , , , , , , 4,
             4, , , , , , ,0 ,0,0 ,0 , , , , , , , , , , , ,6 , , 51, 4, 4, 4, 4, 4, , , , , , , 4,
             4, 0,0 ,0 ,0 , 0, , 6,4,4,47 , , , , , , , , , 0, ,0 , 6, , , 51,4 , 4, 4, 4, , , , , , , 4,
             4, , , , , , , 6,4,47 , , , , , , , , 0, , 4, 0, 4, 6, , , , 51, 4, 4,4 , , , , , , , 4,
             4,0,0,0,0,0 ,0,4 ,47 , , , , , , , , , 4, , 4, 4,4 , 6, , , , , 51, 4, 4, 0, 0, 0, 0, 0, 0, 4,
             4,4 ,4 ,4 ,6 ,4 ,4,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,6 ,6 ,4 ,6 ,
             4, 4, 4, 6, 4, 6, 4, 4, 4, 4, 4, 4,4 , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 6, 6];

image.addEventListener('load', draw);
let canvas = document.getElementById("myCanvas");
canvas.style.width=document.getElementById("divv").innerWidth;
canvas.style.height=window.innerHeight;
canvas.width = 1183;
canvas.height = 670;
let context = canvas.getContext("2d");
image.addEventListener('load', draw);
function draw() {
    for (let i = 0; i < mapColumns * mapHeight; i++) {
        let tile = tiles[i];
        let sourceX = (tile % (mapColumns+10)) * tileWidth;

        //console.log(sourceX);
        let sourceY = Math.floor(tile / (mapColumns+10)) * tileHeight;

        //console.log(sourceY);
        let targetX = (i % mapColumns) * tileWidth;
        //console.log("x=")
        //console.log("x= "+targetX,i);
        let targetY = Math.floor(i / mapColumns) * tileHeight;
        //console.log("y= "+targetY,i);
        context.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, tileWidth, tileHeight);
    }
}