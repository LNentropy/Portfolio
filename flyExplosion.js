export class FlyExplosion {
    constructor(size, x, y, boomImg){
        this.width = size;
        this.height = size;
        this.x = x - (this.width*-0.32);
        this.y = y - (this.height*-0.3);
        this.boomImg = boomImg;
        this.explosionsArray = [];
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 80;
        this.markedForDeletion = false;
        this.maxFrame = 5;
    }

    update(deltaTime){
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        if(this.frame > this.maxFrame){
            this.markedForDeletion = true;
        }
    }

    draw(ctx){
        ctx.drawImage(this.boomImg, this.frame * this.spriteWidth, 0, 
                          this.spriteWidth, this.spriteHeight, this.x,
                          this.y, this.width, this.height);
    }
}