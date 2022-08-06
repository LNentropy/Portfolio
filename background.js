export class Background {
    constructor(game, backgroundImg, velBackground){
        this.game = game;
        this.backgroundImg = backgroundImg;
        this.velBackground = velBackground;
        this.width = 1920;
        this.height = 1080;
        this.screenWidth = game.width;
        this.screenHeight = game.height;
        this.x = 0;
        this.y = 0;
        this.frameY = 0;
        this.maxFrame = 7;
        this.timer = 0;
        this.frameTime = 100;
    }

    resizeBck(){
        this.width = 15360;
    }

    animateBackground(deltaTime){
        if(this.timer > this.frameTime){
            if(this.frameY >= this.maxFrame) this.frameY = 0;
            else this.frameY++;
            this.timer = 0;
        }
        this.timer += deltaTime
        
    }

    update(deltaTime){
        this.x -= 1*this.velBackground;
        if(this.x <= -this.screenWidth){
            this.x = 0;
        }
    }

    draw(ctx){
        ctx.drawImage(this.backgroundImg, 0,
            this.height * this.frameY, this.width, this.height,
            this.x, this.y, this.screenWidth, this.screenHeight);
        
        ctx.drawImage(this.backgroundImg, 0,
            this.height * this.frameY, this.width, this.height,
            this.x + this.screenWidth, this.y, this.screenWidth, this.screenHeight);
    }
}