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
            ctx.drawImage(tileImage, sourceX, sourceY, this.tileWidth, this.tileHeight, targetX, targetY, this.tileWidth, this.tileHeight);
            
        }}
};