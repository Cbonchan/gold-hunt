import { gameState } from './variables.js';

import { playGunShot } from './soundInteractions.js';

import { updateScore } from './updateInfo.js';

export function createCoin() {
    console.log("Entraste a la funcion createCoin"); // Debug
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.classList.add("coin");

    coin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    coin.onclick = () => shootCoin(coin);
    propContainer.appendChild(coin);

    // Aca esta animada la caida de la moneda
    setTimeout(() => {
        coin.style.transform = 'translateY(400px)';
        propContainer.removeChild(coin);
    }, 1300); // Duración de la animación de caída (1.3s en este caso)

    console.log("createCoin finalizada con exito");
}

export function createEspecialCoin(){
    console.log("Entraste a la funcion createCoin"); // Debug
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.classList.add("especialCoin");

    coin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    coin.onclick = () => shootCoin(coin);
    propContainer.appendChild(coin);

    // Aca esta animada la caida de la moneda
    setTimeout(() => {
        coin.style.transform = 'translateY(400px)';
        propContainer.removeChild(coin);
    }, 1300); // Duración de la animación de caída (1.3s en este caso)

    console.log("createCoin finalizada con exito");
}

function shootCoin(coin) {

    if (gameState.isShooting){
        return;
    }

    let gun = document.querySelector(".gun");
    gun.src = "images/gun2.png"
    gameState.isShooting = true;
    playGunShot();
    if (coin.classList.contains("especialCoin")){
        gameState.totalPoints += 5;
    }
    else if (coin.classList.contains("coin")){
        gameState.totalPoints++;
    }
    updateScore();
    coin.remove();
    setTimeout(() => {
        gun.src = "images/gun.png";
        gameState.isShooting = false;
    }, 100);

    return;
    
}