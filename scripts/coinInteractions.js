import { gameState } from './variables.js';

import { playGunShot } from './soundInteractions.js';

import { updateScore } from './updateInfo.js';

export function createCoin() {
    
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

    
}

export function createEspecialCoin(){
    
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

    
}

export function createBird(){
    
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.style.left = '0px';
    coin.classList.add("bird");

    coin.style.top = Math.random() * (propContainer.offsetHeight - 50) + 'px';
    coin.onclick = () => shootCoin(coin);
    propContainer.appendChild(coin);

   
    setTimeout(() => {
        coin.style.transform = 'translateX(400px)';
        propContainer.removeChild(coin);
    }, 1300); 

    
}

function shootCoin(coin) {

    if (gameState.isShooting){
        return;
    }

    let gun = document.querySelector(".gun");
    gun.src = "./images/gun2.png";
    gameState.isShooting = true;
    playGunShot();
    if (coin.classList.contains("especialCoin")){
        gameState.totalPoints += 5;
    }
    else if (coin.classList.contains("coin")){
        gameState.totalPoints++;
    }
    if (coin.classList.contains("bird")){
        gameState.totalPoints += 10;
    }
    updateScore();
    coin.remove();
    setTimeout(() => {
        gun.src = "./images/gun.png";
        gameState.isShooting = false;
    }, 100);

    return;
    
}