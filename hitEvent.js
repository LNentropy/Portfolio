import { BombExplosion } from "./bombExplosion.js";
import { FlyExplosion } from "./flyExplosion.js";

export class HitEvent {
    constructor(game){
        this.game = game;
        const slapSound = document.getElementById('slap');
        const boomSound = document.getElementById('explosion');
        window.addEventListener('click', function(clickEvent){
            let windowWidth = clickEvent.path[0].clientWidth;
            let windowHeight = clickEvent.path[0].clientHeight;
            let xConverted = (clickEvent.offsetX/windowWidth)*game.width;
            let yConverted = (clickEvent.offsetY/windowHeight)*game.height;
            //FlyEnemy Collision detection
            if(!game.gameState.gameOver){
              game.flyEnemy.enemyArray.forEach(object => {
                if(xConverted > (object.circleX - object.circleRadius) &&
                   xConverted < (object.circleX + object.circleRadius) &&
                   yConverted > (object.circleY - object.circleRadius) &&
                   yConverted < (object.circleY + object.circleRadius)){
                        object.markedForDeletion = true;
                        game.explosion.explosionsArray.push(new FlyExplosion(
                                                       object.width*0.7, object.x,
                                                       object.y, object.boomImg));
                        game.explosion.explosionsArray =
                        game.explosion.explosionsArray.filter(object =>
                                                       !object.markedForDeletion);
                        slapSound.currentTime = 0;
                        slapSound.volume = 0.3;
                        slapSound.play();
                        game.gameState.riseScore(Math.round(object.width*0.017));
                }
            });
            //BombEnemy Collision detection
            game.bombEnemy.enemyArray.forEach(object => {
                if(xConverted > (object.circleX - object.circleRadius) &&
                   xConverted < (object.circleX + object.circleRadius) &&
                   yConverted > (object.circleY - object.circleRadius) &&
                   yConverted < (object.circleY + object.circleRadius)){
                        object.markedForDeletion = true;
                        game.explosion.explosionsArray.push(new BombExplosion(
                                                       object.width*2.5, object.x,
                                                       object.y, object.kaboomImg));
                        game.explosion.explosionsArray =
                        game.explosion.explosionsArray.filter(object =>
                                                       !object.markedForDeletion);
                        boomSound.currentTime = 0;
                        boomSound.volume = 1;
                        boomSound.play();
                        game.gameState.lowerScore(Math.round(object.width*0.02));
                        game.gameState.lowerLife();
                }
            });
            }
            
        });
        
    }

}