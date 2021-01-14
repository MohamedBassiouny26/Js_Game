document.getElementById("divv").style.boxShadow = "10px 0px 20px 30px darkgreen";
var canvas = document.getElementById("myCanvas");
canvas.style.width = document.getElementById("divv").innerWidth;
canvas.style.height = window.innerHeight;
canvas.width = 1183;
canvas.height = 670;
var cont = canvas.getContext("2d");
let image = new Image();
image.src = "Tiles_32x32.png";
let imagefire = new Image();
imagefire.src = "Fire.png";
let imagewave = new Image();
imagewave.src = "waves.png";
class map{
    constructor(tiWidth,tiHeight,mapeigh,mapColum,til){
        this.tileWidth=tiWidth;
        this.tileHeight=tiHeight;
        this.mapColumns=mapColum;
        this.mapHeight=mapeigh;
        this.tiles=til; 
    }
    draw() {
        for (let i = 0; i < Maps.mapColumns * Maps.mapHeight; i++) {
            let tile = tiles[i];
            let sourceX = (tile % (Maps.mapColumns + 10)) * Maps.tileWidth;
            let sourceY = Math.floor(tile / (Maps.mapColumns + 10)) * Maps.tileHeight;
            let targetX = (i % Maps.mapColumns) * Maps.tileWidth;
            let targetY = Math.floor(i / Maps.mapColumns) * Maps.tileHeight;
            if(tile!==60&tile!==80){
                cont.drawImage(image, sourceX, sourceY, Maps.tileWidth, Maps.tileHeight, targetX, targetY, Maps.tileWidth, Maps.tileHeight);
            }
            else if(tile===80){
                cont.drawImage(imagefire, 225, 313, 1452, 1472, targetX, targetY, Maps.tileWidth, Maps.tileHeight);
             }  
            else if(tile===60){
              cont.drawImage(imagewave, 5, 33, 595, 297, targetX, targetY, Maps.tileWidth, Maps.tileHeight);
            }    
        }}
};
var tiles=
[, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,,
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
, , , , , , ,2 ,0,6 ,6 ,6 ,0 , , , , , , , , , , , , , , , , , , , , , , , , ,
, , , , 0,0 , 0, 4,47 , , , , , , , , ,2 , 0,0 ,1 , , , , , , , , , , , , , , , , ,
, , , , 51,4, 4, 4, , , , , , , , , , 51, 4,4,47 , , , , , , , , , , , , 2,0 ,0 , 0,0 ,
, , , , , 51, 4,47 , , , , , , , , , , , , , , ,2 ,0 ,1 , , , , , , , , , , 51, 4, 4,
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
Maps=new map(32,32,21,37,tiles);
console.log(Maps);
image.addEventListener('load', Maps.draw);
imagefire.addEventListener('load', Maps.draw);
imagewave.addEventListener('load', Maps.draw);