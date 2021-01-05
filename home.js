let image = new Image();
image.src = "Tiles_32x32.png";
const tileWidth = 32,
  tileHeight = 32;
const mapHeight = 8,
  mapColumns = 36;
  let tiles = [,,,,,,,,,,,,,,,,,,,,,,,4,4,4,4,4,4,4,4,4,4,4,4,4,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
               ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];
image.addEventListener('load', draw);
let canvas = document.getElementById("myCanvas");
canvas.width=1500;
canvas.height=670;
let context = canvas.getContext("2d");
image.addEventListener('load', draw);
function draw() {
  for(let i=0;i<mapColumns*mapHeight;i++) {
    let tile = tiles[i];
    let sourceX = (tile % mapColumns) * tileWidth;
    let sourceY = Math.floor (tile/mapColumns)* tileHeight;
    let targetX = (i % mapColumns) * tileWidth;
    let targetY = Math.floor (i/mapColumns)* tileHeight;
    context.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, tileWidth, tileHeight);
  }
}