import { gameState } from './variables.js';

import { playGunShot } from './soundInteractions.js';

import {increaseTimer } from './script.js'

import { checkObtainedAchievements, updateScore} from './updateInfo.js';

export function createCoin() {
    
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.classList.add("coin");

    coin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    coin.onclick = () => shootCoin(coin);
    propContainer.appendChild(coin);

    
    setTimeout(() => {
        coin.style.transform = 'translateY(400px)';
        propContainer.removeChild(coin);
    }, 1300); 
}

export function createTimeCoin(){
    let propContainer = document.getElementById("propContainer");
    let timeCoin = document.createElement("div");
    timeCoin.classList.add("timeCoin");

    timeCoin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    timeCoin.onclick = () => shootCoin(timeCoin);
    propContainer.appendChild(timeCoin);

    setTimeout(() => {
        timeCoin.style.transform = 'translateY(400px)';
        propContainer.removeChild(timeCoin);
    }, 1300); 

}

export function createSpecialCoin(){
    
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.classList.add("especialCoin");

    coin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    coin.onclick = () => shootCoin(coin);
    propContainer.appendChild(coin);

    // Aca esta animamos la caida de la moneda
    setTimeout(() => {
        coin.style.transform = 'translateY(400px)';
        propContainer.removeChild(coin);
    }, 1300); 

    
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
        gameState.bonusModeIndex += 5;
        gameState.blueCoinsShooted++;
        let blueCoinSound = new Audio("./sounds/blueCoinSound.mp3");
        blueCoinSound.play();
        
    }
    else if (coin.classList.contains("coin")){
        gameState.totalPoints++;
        gameState.bonusModeIndex++;
        let coinSound = new Audio("./sounds/coinSound.mp3");
        coinSound.play();
        
    }
    if (coin.classList.contains("bird")){
        gameState.totalPoints += 10;
        gameState.bonusModeIndex += 10;
        gameState.ducksShooted++;
        let duckSound = new Audio("./sounds/duckSound.mp3");
        duckSound.play();
        
    }

    if (coin.classList.contains("timeCoin")){
        increaseTimer(5);
        gameState.timeCoinShooted++;
        let timeCoinSound = new Audio("./sounds/timeCoinSound.mp3");
        timeCoinSound.play();
    }
    checkObtainedAchievements();
    updateScore();
    coin.remove();
    setTimeout(() => {
        gun.src = "./images/gun.png";
        gameState.isShooting = false;
    }, 100);

    return;
    
}
