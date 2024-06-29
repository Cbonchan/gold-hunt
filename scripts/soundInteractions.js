import { gameState } from './variables.js';

export function playGunShot() {
    let audio = document.getElementById('fireSound');
    let audio2 = document.getElementById('fireSoundLastBullet');
    if (gameState.bulletsShooted < gameState.bulletsOfMag){
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        gameState.bulletsShooted++;
    }else{
        audio2.play();
        gameState.bulletsShooted = 0;
    }
}

export function playBombSound(){
    let audio = document.getElementById('bombSound');
        audio.pause();
        audio.currentTime = 0;
        audio.play();
}