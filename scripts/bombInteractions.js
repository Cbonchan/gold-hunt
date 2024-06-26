import { gameState } from './variables.js';
import { playGunShot } from './soundInteractions.js';
import { updateScore, verifyObtainedAchievements } from './updateInfo.js';


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

    console.log("createCoin finalizada con exito");
    
}

function shootBomb(bomb){
    if (gameState.isShooting){
        return;
    }

    let gun = document.querySelector(".gun");
    gun.src = "images/gun2.png"
    gameState.isShooting = true;
    playGunShot();
    if (gameState.totalPoints > 0){
        gameState.totalPoints--;
    }
    
    gameState.bombsShooted++;
    verifyObtainedAchievements();
    updateScore();
    bomb.remove();
    setTimeout(() => {
        gun.src = "images/gun.png";
        gameState.isShooting = false;
    }, 100);

    return;
}
