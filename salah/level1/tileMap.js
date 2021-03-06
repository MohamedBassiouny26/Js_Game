class tileMap{
    constructor(tiWidth,tiHeight,mapeigh,mapColum,til){
        this.tileWidth=tiWidth;
        this.tileHeight=tiHeight;
        this.mapColumns=mapColum;
        this.mapHeight=mapeigh;
        this.tiles=til; 
    }
    draw() {
        display.style.width = window.innerWidth + 'px';
        display.style.height = window.innerHeight + 'px';
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        for (let i = 0; i < this.mapColumns * this.mapHeight; i++) {
            let tile = tiles[i];
            let sourceX = (tile % (this.mapColumns + 10)) * this.tileWidth;
            let sourceY = Math.floor(tile / (Maps.mapColumns + 10)) * this.tileHeight;
            let targetX = (i % this.mapColumns) * this.tileWidth;
            let targetY = Math.floor(i / this.mapColumns) * this.tileHeight;
            ctx.drawImage(tileImage, sourceX, sourceY, this.tileWidth, this.tileHeight, targetX, targetY, this.tileWidth, this.tileHeight);
            
        }}
        showExtensions() {
            ctx.fillStyle = "#58391c";
            ctx.font = "italic bold 20pt Tahoma";
            let score_imag = new Image()
            score_imag.src = "banana.png"
            ctx.drawImage(score_imag, 170, 35, 32, 32)
            ctx.fillText(":" + (banana.maxNumber - banana.ArrayOfXpos.length) + " /" + banana.maxNumber, 200, 60);
            let reset_imag = new Image()
            reset_imag.src = "reset.png"
            ctx.drawImage(reset_imag, 800, 40, 80, 50)
            music_imag = new Image()
            music_imag.src = (mute == true)? "NoMusic.png" : "music.png";
            ctx.drawImage(music_imag, 900, 42, 50, 45)
            let exit_imag = new Image()
            exit_imag.src = "exit.png"
            ctx.drawImage(exit_imag, 970, 42, 50, 45)
        }
};

class SoundClass {
    constructor(source) {
        this.soundElement = document.createElement("audio")
        this.soundElement.src = source;
        this.soundElement.setAttribute("preload", "auto");
        this.soundElement.setAttribute("controls", "none");
        this.soundElement.style.display = "none";
        document.body.appendChild(this.soundElement);
    }
    playmusic() {
        this.soundElement.play()
    }
    stopmusic() {
        this.soundElement.pause();
    }
}