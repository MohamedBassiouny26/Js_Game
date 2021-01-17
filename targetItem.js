class targetItems {
    constructor(imag_src, tar_width, tar_height) {
        this.SourceOfImag = imag_src;
        this.targetWidth = tar_width;
        this.targetHeight = tar_height;
        this.ArrayOfXpos = [];
        this.ArrayOfYpos = [];
        this.firstTime = true;
        this.maxNumber = 0

    }
    DrawTargetItem() {

        let currentRow = 0,
            currentCol = 0,
            index = 0,
            skip = false,
            upLow =false;
        if (this.firstTime === true) {
            for (var x = 0; x < mapColumns * mapHeight; x++) {
                if (tiles[x] === 0 && tiles[x + 1] === 0 && tiles[x + 2] === 0) {
                    if (skip == false) {
                        index = x
                        while (index > 36) {
                            index = index - 37
                            currentRow++;
                        }
                        x = x + 2;
                        currentCol = index
                        let BananaImage = new Image();
                        BananaImage.src = this.SourceOfImag
                        if(upLow === false){
                        ctx.drawImage(BananaImage, (currentCol + 2) * tileWidth, (currentRow - 2) * tileHeight, this.targetWidth, this.targetHeight);
                        this.ArrayOfXpos.push((currentCol + 2) * tileWidth)
                        this.ArrayOfYpos.push((currentRow - 2) * tileHeight)
                        upLow=true }
                        else{
                            ctx.drawImage(BananaImage, (currentCol + 2) * tileWidth, (currentRow - 3) * tileHeight, this.targetWidth, this.targetHeight);
                        this.ArrayOfXpos.push((currentCol + 2) * tileWidth)
                        this.ArrayOfYpos.push((currentRow - 3) * tileHeight) 
                        upLow=false
                        }
                        currentRow = 0
                        skip = true } else {skip = false}
                }
            }
            this.maxNumber = this.ArrayOfXpos.length;
            this.firstTime = false
        } else {
            for (let j = 0; j < this.ArrayOfYpos.length; j++) {
                let BananaImage = new Image();
                BananaImage.src = this.SourceOfImag
                ctx.drawImage(BananaImage, this.ArrayOfXpos[j], this.ArrayOfYpos[j], this.targetWidth, this.targetHeight);
            }
        }
    }
    collistionOfTarget(cur_x, cur_y) {
       
        for (var l = 0; l < this.ArrayOfYpos.length; l++) {
<<<<<<< HEAD
            // console.log(this.ArrayOfXpos[l]+"+"+this.ArrayOfYpos[l])
=======
>>>>>>> 2cf87cd6151bc83e04dd3a7b9ce64adb69a93853
            if ((cur_x >= this.ArrayOfXpos[l] + 2 && cur_x <= this.ArrayOfXpos[l] + this.targetWidth) && (cur_y >= this.ArrayOfYpos[l] && cur_y <= (this.ArrayOfYpos[l] + this.targetHeight)-3)) {
                
                this.ArrayOfXpos.splice(l, 1)
                this.ArrayOfYpos.splice(l, 1)
                if(mute==false){
                    mySound.playmusic()}
                    else{
                        mySound.stopmusic();
                    }
            }
        }
    }
}