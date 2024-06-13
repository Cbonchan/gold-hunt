import { HARD, NORMAL, EASY } from './constants.js';
import { gameState } from './variables.js';
import { createCoin, createEspecialCoin } from './coinInteractions.js';
import { createBomb } from './bombInteractions.js';
import { spawnGun, moveGun} from './gunInteractions.js';


function createIngameScore(){
    let score = document.createElement("span");
    score.id = "score";
    score.textContent = "0";
    let game = document.getElementById("game");
    game.appendChild(score);
}

function createPropContainer(){
    // Empece creando el contenedor y aplicando propiedades en JS, en un proximo update lo cambio al .css
    let game = document.getElementById("game");
    let propContainer = document.createElement("div");
    propContainer.id = "propContainer";

    propContainer.style.width = "80%"; 
    propContainer.style.height = "500px"; 
    propContainer.style.position = "absolute";
    propContainer.style.backgroundImage = "url('images/backgroundGame.jpg')";
    propContainer.style.backgroundSize = "cover";
    propContainer.style.marginTop = "100px";
    propContainer.style.border = "8px solid";
    propContainer.style.borderImage = "linear-gradient(to right, #bdc3c7 0%, #2c3e50 100%)"; // Esto es para simular efecto metalico
    propContainer.style.borderImageSlice = "5"; 
    
    game.appendChild(propContainer);
}

function playPauseMenuTheme(){
    let menuTheme = document.getElementById("menuTheme");
    let menuMusicButton = document.getElementById("menuMusicImage");
    if (gameState.count == 0){
        menuMusicImage.src = "images/volumeOn.png";
        gameState.count = 1;
        menuTheme.play();
    } else {
        gameState.count = 0;
        menuMusicImage.src = "images/volumeOff.png";
        menuTheme.pause();

    }
}

function startGame(){
    createIngameScore();
    createPropContainer();
    spawnGun();
    setInterval(()=>{
        createCoin();
        createBomb();
    }, HARD);  
    setInterval(() => {
        createEspecialCoin();
    }, 5000);
    document.getElementById("botonJugar").style.display = "none";
    document.getElementById("volumeContainer").style.display = "none";
    menuTheme.pause();
    ingameMusic.play();
}


window.startGame = startGame;
window.playPauseMenuTheme = playPauseMenuTheme;
window.moveGun = moveGun;
window.spawnGun = spawnGun;


