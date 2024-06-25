import { HARD, NORMAL, EASY } from './constants.js';
import { gameState } from './variables.js';
import { createCoin, createEspecialCoin, createBird } from './coinInteractions.js';
import { createBomb } from './bombInteractions.js';
import { spawnGun, moveGun} from './gunInteractions.js';

let coinInterval;
let especialCoinInterval;
let bombInterval;
let birdInterval;


function createIngameScore(){
    let score = document.createElement("span");
    score.id = "score";
    score.textContent = "Score:" + gameState.totalPoints;
    let infoContainer = document.getElementById("infoContainer");
    infoContainer.appendChild(score);
}

function createIngameTimer(){
    let timer = document.createElement("span");
    timer.id = "timer";

    timer.textContent = "Time:" + gameState.gameDuration;
    const infoContainer = document.getElementById("infoContainer");
    infoContainer.appendChild(timer);

}

function startTimer(){
    let timer = document.getElementById("timer");
    let duration = gameState.gameDuration;

    let countdown = setInterval(() => {
        
        let seconds = duration % 60;
        timer.textContent = "Time:" + seconds;
        if (--duration < 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

function endGame(){
    ingameMusic.pause();
   
    clearInterval(coinInterval);
    clearInterval(especialCoinInterval);
    clearInterval(bombInterval);
    clearInterval(birdInterval);
    
    let propContainer = document.getElementById("propContainer");
    while (propContainer.firstChild){
        propContainer.removeChild(propContainer.firstChild);
    }
    propContainer.remove();

    document.getElementById("score").remove();
    document.getElementById("timer").remove();
    document.getElementById("gameGun").remove();
    document.getElementById("botonJugar").style.display = "inline-block";
    document.getElementById("volumeContainer").style.display = "inline-block";

    let playerName = prompt("Juego terminado. Ingresa tu nombre:");

    if (!playerName){
        return;
    }

    enviarPuntaje(playerName, gameState.totalPoints);
    gameState.totalPoints = 0;

    
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
    createPropContainer();
    createIngameScore();
    createIngameTimer();
    startTimer();
    spawnGun();
    coinInterval = setInterval(()=>{
        createCoin();
    }, HARD);  

    bombInterval = setInterval(() =>{
        createBomb();
    }, HARD)
    
    especialCoinInterval = setInterval(() => {
        createEspecialCoin();
    }, 5000);
    birdInterval = setInterval(() =>{
        createBird();
    }, 9000);
    document.getElementById("botonJugar").style.display = "none";
    document.getElementById("volumeContainer").style.display = "none";
    menuTheme.pause();
    ingameMusic.play();
}

function enviarPuntaje(name, score){
    fetch('http://localhost:5000/scoreboard/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, score: score })
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
    })
}


window.startGame = startGame;
window.playPauseMenuTheme = playPauseMenuTheme;
window.moveGun = moveGun;
window.spawnGun = spawnGun;


