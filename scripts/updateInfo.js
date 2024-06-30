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

    fetch(`http://localhost:5000/achievements`)
    .then(response => response.json())
    .then(data => {
        const achievements = data;
        if (!gameAchievements.bomberMan && gameState.bombsShooted >= gameAchievements.minimunBombs ){
            const bomberManAchievement = achievements.find(achievement => achievement.name === "Bomber Man");
            gameAchievements.bomberMan = true;
            saveObtainedAchievements("Bomber Man", bomberManAchievement.id);
        }
        if (!gameAchievements.blueGold && gameState.blueCoinsShooted >= gameAchievements.minimunBlueGold){
            const blueGoldAchievement = achievements.find(achievement => achievement.name === "Blue Gold?!");
            gameAchievements.blueGold = true;
            saveObtainedAchievements("Blue Gold?!", blueGoldAchievement.id);
        }
        if (!gameAchievements.duckHunt && gameState.ducksShooted >= 1){
            const duckHuntAchievement = achievements.find(achievement => achievement.name === "Duck-Hunt");
            gameAchievements.duckHunt = true;
            saveObtainedAchievements("Duck-Hunt", duckHuntAchievement.id);
        }
        if (!gameAchievements.millionare && gameState.totalPoints >= 100){
            const millionareAchievement = achievements.find(achievement => achievement.name === "Millionaire");
            if(!gameAchievements.millionare){
                gameAchievements.millionare = true;
                saveObtainedAchievements("Millionaire", millionareAchievement.id); 
            }
        }
        if (!gameAchievements.timeTraveler && gameState.timeCoinShooted >= 2){
            const timeTravelerAchievement = achievements.find(achievement => achievement.name === "Time Traveler");
            gameAchievements.timeTraveler = true;
            saveObtainedAchievements("Time traveler", timeTravelerAchievement.id);
        }  
    })
    .catch(error => {
        console.error("Error:", error);
    });
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
