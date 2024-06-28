import { HARD, NORMAL, EASY } from './constants.js';
import { gameState, gameAchievements} from './variables.js';
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

    let submitDiv = document.createElement("div");
    submitDiv.id = "submitDiv";
    submitDiv.className = "swirl-in-bck";
    submitDiv.innerHTML = `
        <form id="scoreForm">
            <label for="playerName">Name:</label>
            <input type="text" id="playerName" name="name" required><br><br>
            <input type="hidden" id="playerScore" name="score" value="${gameState.totalPoints}">
            <input type="submit" value="Submit score">
        </form>
    `;


    document.getElementById("game").appendChild(submitDiv);

    document.getElementById("scoreForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let formData = new FormData(this);
        
        let data = {
            name: formData.get("name"),
            score: gameState.totalPoints,
            
        };

        sendScore(data.name, data.score);
        gameState.totalPoints = 0;

        submitDiv.remove();
        document.getElementById("menuContainer").style.display = "inline-block";
    });

    gameAchievements.bomberMan = false;
    gameAchievements.blueGold = false;
    gameAchievements.duckHunt = false;
    gameAchievements.d
    gameState.blueCoinsShooted = 0;
    gameState.bombsShooted = 0;
    gameState.ducksShooted = 0;
  
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
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("volumeContainer").style.display = "none";
    
    menuTheme.pause();
    ingameMusic.play();
}

function sendScore(name, score){

    let achievementsString  = gameState.obtainedAchievements.join(";");
    fetch('http://localhost:5000/scoreboard/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, score: score , achievementId: achievementsString})
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
    })
}

export function showAchievementNotification(title, description, logo){
    let notification = document.createElement("div");
    notification.classList.add("achievement-notification");
    notification.innerHTML = `
    <h2>NEW ACHIEVEMENT</h2>
    <p>${title}</p>
    <small>${description}</small>`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);
}


window.startGame = startGame;
window.playPauseMenuTheme = playPauseMenuTheme;
window.moveGun = moveGun;
window.spawnGun = spawnGun;


