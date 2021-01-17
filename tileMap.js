class tileMap{
    constructor(tiWidth,tiHeight,mapeigh,mapColum,til,level){
        this.tileWidth=tiWidth;
        this.tileHeight=tiHeight;
        this.mapColumns=mapColum;
        this.mapHeight=mapeigh;
        this.tiles=til; 
        this.level = level
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
            if(this.level== 2 || this.level == 3){
                if (tile !== 60 & tile !== 80) {
                    ctx.drawImage(image, sourceX, sourceY, this.tileWidth, this.tileHeight, targetX, targetY, this.tileWidth, this.tileHeight);
                } else if (tile === 80 && (Math.floor(i / mapColumns)+1 != player2.currentRow) ) {
                    ctx.drawImage(imagefire, 225, 313, 1452, 1472, targetX, targetY, this.tileWidth, this.tileHeight);
                } else if (tile === 60 && (Math.floor(i / mapColumns)+1 != player1.currentRow) ) {
                    ctx.drawImage(imagewave, 5, 33, 595, 297, targetX, targetY, this.tileWidth, this.tileHeight);
                }}
        }}
       
        showExtensions() {
            ctx.fillStyle = "#58391c";
            ctx.font = "italic bold 20pt Tahoma";
            let score_imag = new Image()
            score_imag.src = "banana.png"
            ctx.drawImage(score_imag, 170, 35, 32, 32)
            ctx.fillText(":" + (banana.maxNumber - banana.ArrayOfXpos.length) + " /" + banana.maxNumber, 200, 60);
            
            if(this.level != 1){
                ctx.fillText("lifes:", 400, 60);
                for(let i=0;i<lifes;i++){
                    let heart = new Image()
                    heart.src = "heart.png"
                    ctx.drawImage(heart,480+(50*i),40,30,30) }}
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