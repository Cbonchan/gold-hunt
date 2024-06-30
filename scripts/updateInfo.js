import { gameState, gameAchievements } from './variables.js';
import { showAchievementNotification, startBonusMode } from './script.js';


export function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = "Score:" + gameState.totalPoints;

    if (gameState.bonusModeIndex >= gameState.bonusModeMinToActivate && !gameState.inBonusMode){
        gameState.inBonusMode = true;
        ingameMusic.pause();
        ingameMusic.src = "./sounds/bonusModeMusic.mp3";
        ingameMusic.play();
        gameState.bonusModeMinToActivate = Math.ceil(gameState.bonusModeMinToActivate * 1.5);
        startBonusMode();
    }
}

export async function checkObtainedAchievements(){
    if (!gameAchievements.bomberMan && gameState.bombsShooted >= gameAchievements.minimunBombs ){
        gameAchievements.bomberMan = true;
        saveObtainedAchievements("Bomber Man", 2);
    }
    if (!gameAchievements.blueGold && gameState.blueCoinsShooted >= gameAchievements.minimunBlueGold){
        gameAchievements.blueGold = true;
        saveObtainedAchievements("Blue Gold?!", 4);
    }
    if (!gameAchievements.duckHunt && gameState.ducksShooted >= 1){
        gameAchievements.duckHunt = true;
        saveObtainedAchievements("Duck-Hunt", 1);
    }

    if (!gameAchievements.millionare && gameState.totalPoints >= 100){
        gameAchievements.millionare = true;
        saveObtainedAchievements("Millionaire", 3);
    }
}


export async function saveObtainedAchievements(achievementName, achievementId){

    gameState.obtainedAchievements.push(achievementId);

    console.log("Logros obtenidos hasta ahora:", gameState.obtainedAchievements);
    
    // Este fetch es para updatear el achievement seleccionado
    fetch(`http://localhost:5000/achievements/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: achievementName})
    })
    .then (response => {
        if (!response.ok){
            throw error ("Error in network response: "+ response.statusText);
        }
        return response.json()
    })

    // Este fetch se encarga de mostrar en pantalla la notificacion de logro
    fetch (`http://localhost:5000/achievements/${encodeURIComponent(achievementName)}`)
    .then (response => {
        if (!response.ok){
            throw new Error ("Error in network response: "+ response.statusText);
        }
        return response.json();
    })
    .then (data => {
        if (data.error){
            console.error("Error:", data.error);
        } else{
            showAchievementNotification(data.name, data.description, data.logo)
            const achievementAudio = new Audio ("./sounds/achievementSound.mp3");
            achievementAudio.play();
        }
    })
}
