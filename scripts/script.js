import { HARD, NORMAL, EASY } from './constants.js';
import { gameState, gameAchievements} from './variables.js';
import { createCoin, createBird, createSpecialCoin } from './coinInteractions.js';
import { createBomb } from './bombInteractions.js';
import { spawnGun, moveGun} from './gunInteractions.js';

let coinInterval;
let specialCoinInterval;
let bombInterval;
let birdInterval;


function createIngameScore(){
    let score = document.createElement("span");
    score.id = "score";
    score.textContent = "Score:" + gameState.totalPoints;
    score.classList.add("slide-in-blurred-right");
    let infoContainer = document.getElementById("infoContainer");
    infoContainer.appendChild(score);

}

function createIngameTimer(){
    let timer = document.createElement("span");
    timer.id = "timer";
    timer.classList.add("slide-in-blurred-left");
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
    showTopScoreboard();
    ingameMusic.pause();
    let victoryMusic = new Audio("./sounds/victoryMusic.mp3");
    victoryMusic.play(); 
    clearInterval(coinInterval);
    clearInterval(specialCoinInterval);
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
            <div id="scoreForm-Name"> 
                <label for="playerName">Name:</label>
                <input type="text" id="playerName" name="name" required>
                <input type="hidden" id="playerScore" name="score" value="${gameState.totalPoints}">
            </div>
            
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
    gameAchievements.millionare = false;
    gameState.blueCoinsShooted = 0;
    gameState.bombsShooted = 0;
    gameState.ducksShooted = 0;
    
}

function createPropContainer(){
    // Empece creando el contenedor y aplicando propiedades en JS, en un proximo update lo cambio al .css 
    // Nota: 29/6 al final no lo termine updateando XD 
    let game = document.getElementById("game");
    let propContainer = document.createElement("div");
    propContainer.id = "propContainer";
    propContainer.setAttribute("draggable", "False");
    propContainer.style.width = "80%"; 
    propContainer.style.height = "500px"; 
    propContainer.style.position = "absolute";
    propContainer.style.backgroundImage = "url('images/backgroundGame.jpg')";
    propContainer.style.backgroundSize = "cover";
    propContainer.style.marginTop = "100px";
    propContainer.style.border = "8px solid";
    propContainer.style.borderImage = "linear-gradient(to right, #bdc3c7 0%, #2c3e50 100%)"; // Esto es para simular efecto metalico
    propContainer.style.borderImageSlice = "5"; 
    propContainer.classList.add("slide-in-blurred-bottom");
    
    game.appendChild(propContainer);
}

function showTopScoreboard(){
    fetch('http://localhost:5000/scoreboard/top')
    .then (response => response.json()) // Transformamos primero a json
    .then(data =>{
        createTopScoreboard(data);
    })
    .catch((error) => {console.error('Error:', error); });
}

function createTopScoreboard(data){
    let topScoreboardContainer = document.createElement('div');
    topScoreboardContainer.id = 'topScoreboard';

    let table = document.createElement('table');
    table.classList.add('topScoreboardTable');

    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let headers = ['Name', 'Score'];

    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    })

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    data.forEach(player => {
        let row = document.createElement('tr');

        let nameCell = document.createElement('td');
        nameCell.textContent = player.name;
        row.appendChild(nameCell);

        let scoreCell = document.createElement('td');
        scoreCell.textContent = player.score;
        row.appendChild(scoreCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    topScoreboardContainer.appendChild(table);

    // agregamos la nueva tabla al contenedor del juego
    let gameContainer = document.getElementById('game');
    gameContainer.appendChild(topScoreboardContainer);
    
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

function clickOnStartButton(){
    let clickSound = new Audio("./sounds/clickSound.mp3");
    let startButton = document.getElementById("botonJugar");
    let mainTitle = document.getElementById("mainTitle");
    

    startButton.disabled = true;
    startButton.style.cursor = 'not-allowed';
    startButton.classList.add("puff-out-center");

    mainTitle.classList.add('slide-out-blurred-top');

    clickSound.play()
    setTimeout( () =>{
        startGame();
    }, 1400);
}

function startGame(){

    setTimeout(() =>{
        createIngameScore();
    }, 0)

    setTimeout(() => {
        createIngameTimer();
    }, 600)


    setTimeout(() => {
        createPropContainer();
    }, 1200)


    setTimeout(() => {
        startTimer();
        spawnGun();
        coinInterval = setInterval(()=>{
            createCoin();
        }, 300);  
    
        bombInterval = setInterval(() =>{
            createBomb();
        }, 300)
        specialCoinInterval = setInterval(() => {
            createSpecialCoin();
        }, 5000);
        birdInterval = setInterval(() =>{
            createBird();
        }, 9000);
        menuTheme.pause();
        ingameMusic.play();
    },1800)
    
    
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("volumeContainer").style.display = "none";
    
    
}

async function sendScore(name, score){

    let achievementsString  = gameState.obtainedAchievements.join(";");
    document.getElementById("topScoreboard").classList.toggle("desaparecida");
    try{
        await fetch ('http://localhost:5000/scoreboard/add',{
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name, score: score , achievementId: achievementsString})
        })
        
        .then (response => response.json())
        .then (data => {
            console.log(data.message);
        })
        
        .catch(error => {
            console.error("Error:", error);   
        })
    }
    catch{
        console.log(error);
    }
    location.reload();
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


window.clickOnStartButton = clickOnStartButton;
window.startGame = startGame;
window.playPauseMenuTheme = playPauseMenuTheme;
window.moveGun = moveGun;
window.spawnGun = spawnGun;


