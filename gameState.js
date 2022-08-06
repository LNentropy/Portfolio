export class GameState {
    constructor(ctx){
        this.ctx = ctx;
        this.score = 0;
        this.life = 3;
        this.gameOver = false;
        this.ctx.font = '9vmin Impact';
        this.gameWidth = window.screen.width;
        this.gameHeight = window.screen.height;
        if(window.screen.orientation.type === 'portrait-primary'){
            this.gameHeight = 1.5*(this.gameWidth/window.screen.height)* this.gameWidth;
            this.ctx.font = '6vmin Impact';
        }
        if(window.screen.orientation.type === 'landscape-primary'){
            this.gameHeight = window.screen.height;
        }
    }
    drawScore(){
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Score: ' + this.score,
                          this.gameWidth*0.01, this.gameHeight*0.08);
    }
    riseScore(score){
        this.score += score;
    }
    lowerScore(score){
        this.score -= score;
    }
    drawLife(){
        if(this.life == 3){
            this.ctx.fillStyle = 'lightgreen';
            this.ctx.fillText('Life: ' + this.life,
                              this.gameWidth*0.01, this.gameHeight*0.18);
        }
        if(this.life == 2){
            this.ctx.fillStyle = 'yellow';
            this.ctx.fillText('Life: ' + this.life,
                              this.gameWidth*0.01, this.gameHeight*0.18);
        }
        if(this.life == 1){
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('Life: ' + this.life,
                              this.gameWidth*0.01, this.gameHeight*0.18);
        }
        if(this.life <= 0){
            this.ctx.fillStyle = 'white';
            this.ctx.fillText('Life: ' + this.life,
                              this.gameWidth*0.01, this.gameHeight*0.18);
        }
        
    }
    lowerLife(){
        this.life--;
    }
    checkGameOver(){
        if(this.life <= 0){
            this.gameOver = true;
            this.drawGameOver();
        }
    }
    drawGameOver(){
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER... Your score was: ' + this.score,
                          this.gameWidth*0.5, this.gameHeight*0.3);
    }
    gameWon(){
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('You beat the game! Your score was: ' + this.score,
                          this.gameWidth*0.5, this.gameHeight*0.3);
    }
}