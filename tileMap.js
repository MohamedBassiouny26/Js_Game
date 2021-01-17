class tileMap{
    constructor(tiWidth,tiHeight,mapeigh,mapColum,til){
        this.tileWidth=tiWidth;
        this.tileHeight=tiHeight;
        this.mapColumns=mapColum;
        this.mapHeight=mapeigh;
        this.tiles=til; 
    }
    draw() {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        for (let i = 0; i < this.mapColumns * this.mapHeight; i++) {
            let tile = tiles[i];
            let sourceX = (tile % (this.mapColumns + 10)) * this.tileWidth;
            let sourceY = Math.floor(tile / (Maps.mapColumns + 10)) * this.tileHeight;
            let targetX = (i % this.mapColumns) * this.tileWidth;
            let targetY = Math.floor(i / this.mapColumns) * this.tileHeight;
            if (tile !== 60 & tile !== 80) {
                ctx.drawImage(image, sourceX, sourceY, this.tileWidth, this.tileHeight, targetX, targetY, this.tileWidth, this.tileHeight);
            } else if (tile === 80 && (Math.floor(i / mapColumns)+1 != player2.currentRow) ) {
                ctx.drawImage(imagefire, 225, 313, 1452, 1472, targetX, targetY, this.tileWidth, this.tileHeight);
            } else if (tile === 60 && (Math.floor(i / mapColumns)+1 != player1.currentRow) ) {
                ctx.drawImage(imagewave, 5, 33, 595, 297, targetX, targetY, this.tileWidth, this.tileHeight);
            }
            
        }}
};