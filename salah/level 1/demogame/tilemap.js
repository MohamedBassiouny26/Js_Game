
let canvas = document.getElementById("TileMapCanvas");
let context = canvas.getContext("2d");
let image_stone= new Image();
let image_gift =new Image();
image_stone.src = "stone.jpg";
image_stone.addEventListener('load', drawTileMap);
const tileWidth = 15,
tileHeight = 15;
const mapRow = 10,
mapColumns = 20;
  let tiles = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,
               0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
               0,0,0,0,0,0,0,1,3,1,0,4,0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,4,
               0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1, 
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,
               1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,2,2,2
            ];
function drawTileMap() {
    for(let i=0;i<mapColumns*mapRow;i++) {
        let tile = tiles[i];
        let targetX = (i % mapColumns) * tileWidth; 
        let targetY = Math.floor (i/mapColumns)* tileHeight;
        switch (tile) {
           case 0:
               break;
            case 1:
        context.drawImage(image_stone, 248, 15, 100, 100, targetX, targetY, tileWidth, tileHeight);
             break;
            case 2: 
        context.drawImage(image_stone, 248, 131, 100, 80, targetX, targetY, tileWidth, tileHeight);
           break;
           case 3://fire
            context.drawImage(image_stone, 240, 360, 120, 115, targetX, targetY, tileWidth, tileHeight);
            break; 
            case 4: //gift
            context.drawImage(image_gift, 30, 8, 30, 40, targetX, targetY, tileWidth, tileHeight);
        }
    }}
