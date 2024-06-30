import { gameState } from './variables.js';
import { playGunShot, playBombSound } from './soundInteractions.js';
import { updateScore, checkObtainedAchievements } from './updateInfo.js';


export function createBomb(){
    let propContainer = document.getElementById("propContainer");
    let bomb = document.createElement("div");
    bomb.classList.add("bomb");

    bomb.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    bomb.onclick = () => shootBomb(bomb);
    propContainer.appendChild(bomb);

    // Aca esta animada la caida de la moneda
    setTimeout(() => {
        bomb.style.transform = 'translateY(400px)';
        propContainer.removeChild(bomb);
    }, 1300); // Duración de la animación de caída (1.3s en este caso)

}

function shootBomb(bomb){
    if (gameState.isShooting){
        return;
    }

    let gun = document.querySelector(".gun");
    gun.src = "images/gun2.png"
    gameState.isShooting = true;
    playGunShot();
    playBombSound();
    if (gameState.totalPoints < 10){
        gameState.totalPoints = 0;
    }else{
        gameState.totalPoints-=10;
        gameState.bonusModeIndex-=10;
    }
    
    gameState.bombsShooted++;
    checkObtainedAchievements();
    updateScore();
    bomb.remove();
    setTimeout(() => {
        gun.src = "images/gun.png";
        gameState.isShooting = false;
    }, 100);

    return;
}
