class Character {
    static counter=0;
    constructor(name, x, y, height, width, frame_set, controller,doublejumping , x_velocity = 0, y_velocity = 0, jumping = false,countJumps=0) {
        this.constructor.counter++; 
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
        this.currentRow = 0;
        this.touchWaterFire = false
        this.doublejumping = doublejumping
        this.countJumps = countJumps
    }
    drawCharacter() {
        this.characterImage = this.animate.frame;
        ctx.drawImage(this.characterImage, this.xPosition, this.yPosition, this.width, this.height);
    }
    spirit() {
        if ((this.controller.upActive && !this.jumping && !this.falling)||
        (this.controller.upActive&&this.doublejumping===1&&this.countJumps===1&&this.y_velocity>=-1)) {
            this.jumping = true;
            if(this.countJumps>=1)
                this.countJumps=0;
            else 
                this.countJumps=1;
            this.y_velocity -= 13;
            if (this.face == "right")
                this.animate.change(this.Frame_set.jumpRight, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.jumpLeft, 15);
            this.isCarried = false
        }
        if (this.controller.leftActive && !this.falling) {
            this.face = "left"
            this.x_velocity -= 0.07;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkLeft, 15);
            }  
        }
        if (this.controller.rightActive && !this.falling) {
            this.face = "right"
            this.x_velocity += 0.07;
            if (!this.jumping) {
                this.animate.change(this.Frame_set.walkRight, 15);
            }
        }
        if (!this.controller.rightActive && !this.controller.leftActive) {
            if (this.face == "right")
                this.animate.change(this.Frame_set.idle, 15);
            else if (this.face == "left")
                this.animate.change(this.Frame_set.idleLeft, 15);
        }
        if(this.carry||this.isCarried)
        {
            this.carriedMovement()
        }   
        this.y_velocity += 0.25; //used as a graphity
        this.xPosition += this.x_velocity;
        this.yPosition += this.y_velocity;
        this.x_velocity *= 0.96;
        this.y_velocity *= 0.9;
        if (this.xPosition < -5) {
            this.xPosition = -5;
        } else if (this.xPosition + (this.width) / 1.4 > myCanvas.width) {
            this.xPosition = myCanvas.width - (this.width) / 1.4;
        }
    }
    getColomn(){
        return Math.floor((this.xPosition + this.width + 2) / tileWidth);
    }
    getRow(){
         return Math.floor((this.yPosition + this.height + 2) / tileHeight);
    }
    Colliston() {
        let currentTile = tiles[(this.getRow() * mapColumns) + this.getColomn() - 1],
        upTile = tiles[((this.getRow()) * mapColumns) + this.getColomn() - (37 * 2) - 1],
        previousTile = tiles[(this.getRow() * mapColumns) + this.getColomn() - 2],
        nextTile = tiles[(this.getRow() * mapColumns) + this.getColomn()],
        previousTile_upper = tiles[(this.getRow() * mapColumns) + this.getColomn() -2-(37*2 )],
        previousTile_lower = tiles[(this.getRow() * mapColumns) + this.getColomn() -2-(37 )],
        nextTile_upper = tiles[(this.getRow() * mapColumns) + this.getColomn() - (37*2 )],
        nextTile_lower = tiles[(this.getRow() * mapColumns) + this.getColomn() - (37 )], 
        currentY = (Math.floor(this.yPosition)+3),
        currentX = Math.floor(this.xPosition) + (this.width / 1.5);
        if (currentTile == undefined &&this.falling) {
        }
        if ((nextTile === 51 || nextTile === 4 || nextTile === 6||nextTile===47)||(nextTile_upper===0 && nextTile_lower == undefined)) {
            if (this.xPosition > this.getColomn() * tileWidth - this.width + 12 && this.x_velocity > 0) {
                this.xPosition = this.getColomn() * tileWidth - this.width + 12;
                this.x_velocity = 0;
            }
        }
        if ((previousTile === 51 || previousTile === 4 || previousTile === 6)||(previousTile_upper===0 && previousTile_lower == undefined && !this.jumping))
            if (this.xPosition < this.getColomn() * tileWidth - this.width + 12 && this.x_velocity < 0) {
                this.xPosition = this.getColomn() * tileWidth - this.width + 12;
                this.x_velocity = 0;
            }
        if (upTile === 0 || upTile === 4 || upTile === 51 || upTile === 47) {
            if (this.y_velocity < 0)
                this.y_velocity += 0.8;
                this.countJumps=2;
        }
        if (currentTile === 0 || currentTile === 6||currentTile==4) {
            if(this.isCarried)
            this.jumping=true;                  
            if (this.height + this.yPosition > this.getRow() * tileHeight + 3) {
                this.jumping = false;
                this.yPosition = this.getRow() * tileHeight - this.height + 3;
                this.y_velocity = 0;
            }
        }
        if(this.constructor.counter>=2){
            if(!this.checkIfCarry(player2,player1)){
                this.checkIfCarry(player1,player2);
            }
        }
        banana.collistionOfTarget(currentX, currentY)    
    }
    carriedMovement()
    {
        if (this.isCarried && this.name === "player1") {
            this.yPosition = player2.yPosition - player2.height + 15;
            if(this.y_velocity>=0)
                this.jumping = false
        }
        if (Math.abs(this.xPosition - player1.xPosition) > 20|| Math.abs((player1.yPosition + player1.height) - player2.yPosition) > 30) {
            player1.isCarried = false;
            player2.carry = false;
        }
        if (this.isCarried && this.name === "player2") {
            this.yPosition = player1.yPosition - player1.height + 15;
            if(this.y_velocity>=0)
                this.jumping = false
        }
        if (Math.abs(this.xPosition - player2.xPosition) > 20||Math.abs((player2.yPosition + player2.height) - player1.yPosition) <10) {
             player2.isCarried = false;
             player1.carry = false;
         }
         if ((this.controller.rightActive || this.controller.leftActive)&&this.carry) {
            if(this.name=="player2")
                player1.x_velocity = player2.x_velocity;
            else
                player2.x_velocity = player1.x_velocity;
        }           
    }
    checkIfCarry(carry,carried){
        if ((carry.yPosition - (carried.yPosition + 11.75) >= 0 && carry.yPosition - (carried.yPosition + 11.75) <= 20) && (Math.abs(carry.xPosition - carried.xPosition) <= 20 && Math.abs(carry.xPosition - carried.xPosition) >= 0)) {
            if (carry != undefined) {
                carry.carry = true
                carried.isCarried = true
                carried.jumping = true
                carried.falling = false;
                return true
            }
        }
    }
}
class Enimy extends Character{
    constructor(name, x, y, height, width, frame_set,controller){
        super(name, x, y, height, width, frame_set,controller)
        this.moveCounter=0;
    }
    constantMove(){
        this.moveCounter++;
        if(this.moveCounter>200){
            if(this.moveCounter===400)
                this.moveCounter=0;
            this.x_velocity-=1;
        }        
        else
            this.x_velocity+=1;
        this.y_velocity += 0.25; //used as a graphity
        this.xPosition += this.x_velocity;
        this.yPosition += this.y_velocity;
        this.x_velocity = 0;
    }
}

