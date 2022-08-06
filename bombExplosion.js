export class BombExplosion {
    constructor(size, x, y, kaboomImg){
        this.width = size*1.775;
        this.height = size;
        this.x = x - (this.width*0.4);
        this.y = y - (this.height*0.2);
        this.kaboomImg = kaboomImg;
        this.explosionsArray = [];
        this.spriteWidth = 600;
        this.spriteHeight = 338;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 20;
        this.markedForDeletion = false;
        this.maxFrame = 9;
    }

    update(deltaTime){
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        if(this.frame > 9){
            this.markedForDeletion = true;
        }
    }

    draw(ctx){
        ctx.drawImage(this.kaboomImg, this.frame * this.spriteWidth, 0, 
                          this.spriteWidth, this.spriteHeight, this.x,
                          this.y, this.width, this.height);
    }
}