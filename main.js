import { Background } from "./background.js";
import { BombEnemy } from "./bombEnemy.js";
import { FlyExplosion } from "./flyExplosion.js";
import { FlyEnemy } from "./flyEnemy.js";
import { HitEvent } from "./hitEvent.js";
import { GameState } from "./gameState.js";

window.addEventListener('load', function(){
//Canvas
const canvas = this.document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const width = this.window.screen.width;
let height = this.window.screen.height;
let aspectRatio;
//Responsive
if((width/height)>=1){
    aspectRatio = width/height;
    height = width * (1/aspectRatio);
}
if((width/height)<1){
    aspectRatio = height/width;
    height = width * (1/aspectRatio);
}
canvas.width = width;
canvas.height = height;

//Prevent right click
document.addEventListener("contextmenu", function(rClick){
    rClick.preventDefault();
});

//Background
const backgroundImg01 = this.document.getElementById('background01');
const backgroundImg02 = this.document.getElementById('background02');
const backgroundImg03 = this.document.getElementById('background03');
const backgroundImg04 = this.document.getElementById('background04');
const backgroundImg05 = this.document.getElementById('background05');

//Enemies
const flyEnemyImg = this.document.getElementById('flyEnemy');
const bombEnemyImg = this.document.getElementById('bombEnemy');

//FX
const boomImg = this.document.getElementById('boom');
const kaboomImg = this.document.getElementById('kaboom');

//Audio
const music = this.document.getElementById('music');

//Buttons
const fullScreenButton = this.document.getElementById('fullScreen');
const playAgainButton = this.document.getElementById('playAgain');

//Game Class
class Game {
    constructor(){
        this.width = width;
        this.height = height;
        this.speedMod = 1;
        this.musicOn = true;
        this.background01 = new Background(this, backgroundImg01, width*0.0005);
        this.background02 = new Background(this, backgroundImg02, width*0.0004);
        this.background03 = new Background(this, backgroundImg03, width*0.0003);
        this.background04 = new Background(this, backgroundImg04, width*0.0002);
        this.background05 = new Background(this, backgroundImg05, width*0.0001);
        this.flyEnemy = new FlyEnemy(this, flyEnemyImg, boomImg);
        this.hitEvent = new HitEvent(this);
        this.explosion = new FlyExplosion(this.flyEnemy.width, this.flyEnemy.x,
                                       this.flyEnemy.y, flyEnemy.boomImg);
        this.bombEnemy = new BombEnemy(this, bombEnemyImg, kaboomImg);
        this.gameState = new GameState(ctx);
        
    }

    update(deltaTime){
        this.background05.update(deltaTime);
        this.background04.update(deltaTime);
        this.background03.update(deltaTime);
        this.background02.update(deltaTime);
        this.background01.update(deltaTime);
        
        this.flyEnemy.update(deltaTime);
        this.explosion.update(deltaTime);
        this.bombEnemy.update(deltaTime);

        //Pushing fly enemies to the arrayOfEnemies and sorting them
        this.flyEnemy.timeToNextEnemy += deltaTime;
        if(this.flyEnemy.timeToNextEnemy > this.flyEnemy.enemySpawnInterval) {
            if(this.flyEnemy.counterOfEnemies < this.flyEnemy.numberOfEnemies){
                this.flyEnemy.counterOfEnemies++;
                this.speedMod += this.flyEnemy.enemySpeed * 0.005;
                this.flyEnemy.enemyArray.push(new FlyEnemy(
                                              game, this.flyEnemy.enemyImg, boomImg));
                this.flyEnemy.timeToNextEnemy = 0;
                this.flyEnemy.enemyArray.sort(function(a, b) {
                    return a.width - b.width;
                })
            }
        }

        //Pushing bomb enemies to the arrayOfEnemies and sorting them
        this.bombEnemy.timeToNextEnemy += deltaTime;
        if(this.bombEnemy.timeToNextEnemy > this.bombEnemy.enemySpawnInterval) {
            if(this.bombEnemy.counterOfEnemies < this.bombEnemy.numberOfEnemies){
                this.bombEnemy.counterOfEnemies++;
                this.speedMod += this.bombEnemy.enemySpeed * 0.005;
                this.bombEnemy.enemyArray.push(new BombEnemy(
                                               game, this.bombEnemy.enemyImg,
                                               kaboomImg));
                this.bombEnemy.timeToNextEnemy = 0;
                this.bombEnemy.enemyArray.sort(function(a, b) {
                    return a.width - b.width;
                })
            }
        }
        
        [...this.flyEnemy.enemyArray,
         ...this.explosion.explosionsArray,
         ...this.bombEnemy.enemyArray].forEach(object => {
            object.update(deltaTime);
            if(object.enemyPassed) this.gameState.lowerLife();
        });
        
        this.background02.animateBackground(deltaTime);
        
        //Music        
        if(this.musicOn){
            music.volume = 0.5;
            music.play();
        }        
    }  

    draw(ctx){
        this.background05.draw(ctx);
        this.background04.draw(ctx);
        this.background03.draw(ctx);
        this.background02.draw(ctx);
        this.background01.draw(ctx);

        [...this.flyEnemy.enemyArray,
         ...this.explosion.explosionsArray,
         ...this.bombEnemy.enemyArray].forEach(object => {
            object.draw(ctx);
        });

        //GameState
        if(!this.gameWon) this.gameState.drawScore();
        if(!this.gameWon) this.gameState.drawLife();
        this.gameState.checkGameOver();
        this.gameWon = (game.flyEnemy.counterOfEnemies >= game.flyEnemy.numberOfEnemies &&
            game.flyEnemy.enemyArray.length == 0);

        if((game.gameWon)){
            this.gameState.gameWon();
            game.explosion.explosionsArray.forEach(object =>{
                if(object.markedForDeletion){
                    this.animationCut = true;
                }
            });                
        }
    }
}

const game = new Game();

//PlayAgain
function playAgain(){
    location.reload();
}
playAgainButton.addEventListener('click', playAgain);

//FullScreen
function fullScreen(){
    if(!document.fullscreenElement){
        canvas.requestFullscreen().catch(err => {
            alert(`'It was not able to enter fullScreen mode: ' ${err.message}`);
        });
    } else document.exitFullscreen();
}
fullScreenButton.addEventListener('click', fullScreen);

//Animate
let lastTime = 0;
function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if(!game.gameState.gameOver && !game.animationCut){
        requestAnimationFrame(animate);
    } else {
        playAgainButton.style.display = 'block';
        if(document.fullscreenElement != null) document.exitFullscreen();
    }
}
animate(0);

});