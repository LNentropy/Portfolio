export class BombEnemy {
    constructor(game, enemyImg, kaboomImg){
        this.game = game;
        this.enemyImg = enemyImg;
        this.kaboomImg = kaboomImg;
        this.frameX = 0;
        this.bombMaxFrame = 4;
        this.spriteWidth = 100;
        this.spriteHeight = 128;
        this.width = Math.floor(Math.random() * (game.width*0.025)) +
                               (game.width*0.045);
        this.height = (this.spriteHeight/this.spriteWidth) * this.width;
        this.enemySpawnInterval = Math.floor(Math.random() * (6000)) + 5000;//milliseconds
        this.timeToNextEnemy = 0;
        this.enemyArray = [];
        this.numberOfEnemies = 150;
        this.counterOfEnemies = 0;//not used
        this.x = game.width;
        this.y = Math.floor(Math.random() * (-game.height*0.8)) + game.height*0.8;
        //Collision Circle
        this.circleX = 0;
        this.circleY = 0;
        this.circleRadius = 0;

        this.enemySpeed = Math.floor(Math.random() * (this.game.width*0.0018)) +
        (this.game.width*0.001);
        this.angle = (Math.random() * (0.003*game.height));
        this.curveVariation = (Math.random() * (0.002*game.height)) + (0.0005*game.height);
        this.angleSpeed = (Math.random() * (0.00015*game.height));
        this.randomFrameSpeed = Math.floor(Math.random() * 40);
        this.animationInterval = 120 + this.randomFrameSpeed;
        this.lastAnimationTime = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime){
        //Updates the frame
        this.lastAnimationTime += deltaTime;
        if(this.lastAnimationTime > this.animationInterval) {
            if(this.frameX >= this.bombMaxFrame) this.frameX = 0;
            else this.frameX++;
            this.lastAnimationTime = 0;
        }
        //Updates the position
        this.x -= this.enemySpeed * this.game.speedMod;
        this.y += this.curveVariation * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if(this.x < (-this.width)) {
            this.markedForDeletion = true;
        }
        this.enemyArray = this.enemyArray.filter(object =>
            !object.markedForDeletion);
        //Circle collision update
        this.circleX = this.x + this.width/2 - this.width*0.01;
        this.circleY = this.y + this.height/2 + this.height*0.05;
        this.circleRadius = (this.width + this.height)/4.8;

    }

    draw(ctx){
        ctx.drawImage(this.enemyImg, this.frameX * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight, this.x, this.y,
            this.width, this.height);
        
        /*
        //Used for debug
        //Circle Collision
        ctx.beginPath();
        ctx.arc(this.circleX, this.circleY,
                this.circleRadius, 0, 2*Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
        */

    }
}