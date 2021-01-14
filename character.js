class Character {
    constructor(name, x, y, height, width, frame_set, controller,doublejumping , x_velocity = 0, y_velocity = 0, jumping = false,countJumps=0) {
        this.name = name;
        this.xPosition = x;
        this.yPosition = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.jumping = jumping;
        this.height = height;
        this.width = width
        this.Frame_set = frame_set
        this.animate = new Animate(this.Frame_set.idle, 15);
        this.face = "right";
        this.falling = false
        this.characterImage = new Image();
        this.controller = controller;
        this.carry = false;
        this.isCarried = false;
        this.dead = false;
        this.currentRow = 0;
        this.touchWaterFire = false
        this.doublejumping = doublejumping
        this.countJumps = countJumps

    }
    drawCharacter() {
        this.characterImage.src = this.animate.frame;
        ctx.drawImage(this.characterImage, this.xPosition, this.yPosition, this.width, this.height);
    }
    spirit() {
        if ((this.controller.upActive && !this.jumping && !this.falling)||(this.controller.upActive &&this.countJumps===1 &&this.doublejumping===1)) {
          if(this.doublejumping == this.countJumps){
            this.jumping = true;
            this.countJumps =0;
          }else{
           this.countJumps++;
           this.controller.upActive =false
          }
            this.y_velocity -= 12;
            if (this.face == "right")
                this.animate.change(this.Frame_set.jumpRight, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.jumpLeft, 15);
            if (this.carry)
                player1.jumping = true;
            this.isCarried = false
        }
        if (this.controller.leftActive && !this.falling) {
            this.face = "left"
            this.x_velocity -= 0.07;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkLeft, 15);
            }
            if (this.carry&&this.name=="player2") {
                player1.x_velocity = player2.x_velocity;
            }
            if (this.carry&&this.name=="player1") {
                player2.x_velocity = player1.x_velocity;
            }
        }
        if (this.controller.rightActive && !this.falling) {
            this.face = "right"
            this.x_velocity += 0.07;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkRight, 15);
            }
            if (this.carry&&this.name=="player2") {
                player1.x_velocity = player2.x_velocity;
            }
            if (this.carry&&this.name=="player1") {
                player2.x_velocity = player1.x_velocity;
            }
        }
        if (!this.controller.rightActive && !this.controller.leftActive) {
            if (this.face == "right")
                this.animate.change(this.Frame_set.idle, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.idleLeft, 15);
        }
        this.y_velocity += 0.20; //used as a graphity
        this.xPosition += this.x_velocity;
        this.yPosition += this.y_velocity;
        this.x_velocity *= 0.96;
        this.y_velocity *= 0.9;
        if (this.xPosition < -5) {
            this.xPosition = -5;
        } else if (this.xPosition + (this.width) / 1.4 > myCanvas.width) {
            this.xPosition = myCanvas.width - (this.width) / 1.4;
        }
        if (this.isCarried && this.name === "player1") {
            this.yPosition = player2.yPosition - player2.height + 15;
            this.jumping = false
        }
        if (Math.abs(this.xPosition - player1.xPosition) > 20 || Math.abs((player1.yPosition + player1.height) - player2.yPosition) > 20) {
            player1.isCarried = false;
            player2.carry = false;
        }
        if (this.isCarried && this.name === "player2") {
            this.yPosition = player1.yPosition - player1.height + 15;
            this.jumping = false;
        }
        if (Math.abs(this.xPosition - player2.xPosition) > 20) {
             player2.isCarried = false;
             player1.carry = false;
         }
    }
    Colliston() {
        let tilex = Math.floor((this.xPosition + this.width + 2) / tileWidth);
        let tiley = Math.floor((this.yPosition + this.height + 2) / tileHeight);
        let currentTile = tiles[(tiley * mapColumns) + tilex - 1]
        let trap = tiles[(tiley * mapColumns) + tilex - 38]
        let upTile = tiles[((tiley) * mapColumns) + tilex - (37 * 2) - 1]
        let previousTile = tiles[(tiley * mapColumns) + tilex - 2]
        let nextTile = tiles[(tiley * mapColumns) + tilex];
        let previousTile_upper = tiles[(tiley * mapColumns) + tilex -2-(37*2 )]
        let previousTile_lower = tiles[(tiley * mapColumns) + tilex -2-(37 )]
        let nextTile_upper = tiles[(tiley * mapColumns) + tilex - (37*2 )]
        let nextTile_lower = tiles[(tiley * mapColumns) + tilex - (37 )]
        
      
            
        if (currentTile === 0 || currentTile === 6 || currentTile === 4) {
            if (this.height + this.yPosition > tiley * tileHeight + 3) {
                this.jumping = false;
                this.yPosition = tiley * tileHeight - this.height + 3;
                this.y_velocity = 0;
            }
        }
        if (currentTile == undefined && !this.jumping) {}
        if ((nextTile === 51 || nextTile === 4 || nextTile === 6)||(nextTile_upper===0 && nextTile_lower == undefined)  ) {
           
            if (this.xPosition > tilex * tileWidth - this.width + 12 && this.x_velocity > 0) {
                this.xPosition = tilex * tileWidth - this.width + 12;
                this.x_velocity = 0;
            }
        }
        if ((previousTile === 51 || previousTile === 4 || previousTile === 6)||(previousTile_upper===0 && previousTile_lower == undefined && !this.jumping))
        
            if (this.xPosition < tilex * tileWidth - this.width + 12 && this.x_velocity < 0) {
                this.xPosition = tilex * tileWidth - this.width + 12;
                this.x_velocity = 0;
            }
        if (upTile === 0 || upTile === 4 || upTile === 51 || upTile === 47) {
            if (this.y_velocity < 0)
                this.y_velocity += 0.8;
        }

        //////////////when touching banana /////////////////
        //console.log(Banana_y[0]+"+"+(Math.floor(player1.yPosition)+3)+player1.width+2)+"+"+Banana_x[0]);
        let currentY = (Math.floor(this.yPosition)+3),
            currentX = Math.floor(this.xPosition) + (this.width / 1.5);
            console.log(currentX+"+"+currentY)
        banana.collistionOfTarget(currentX, currentY)

        if ((this.yPosition - (player1.yPosition + 11.75) >= 0 && this.yPosition - (player1.yPosition + 11.75) <= 20) && (Math.abs(this.xPosition - player1.xPosition) <= 20 && Math.abs(this.xPosition - player1.xPosition) >= 0)) {
            if (player2 != undefined) {
                player2.carry = true
                player1.isCarried = true
                player1.jumping = false
                player1.falling = false;
            }
        }
        if ((this.yPosition - (player2.yPosition + 11.75) >= 0 && this.yPosition - (player2.yPosition + 11.75) <= 20) && (Math.abs(this.xPosition - player2.xPosition) <= 20 && Math.abs(this.xPosition - player2.xPosition) >= 0)) {
            player1.carry = true
            player2.isCarried = true
            player2.jumping = false
            player2.falling = false;
       }
    }
}


