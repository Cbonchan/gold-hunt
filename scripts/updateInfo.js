import { gameState, gameAchievements } from './variables.js';
import { showAchievementNotification } from './script.js';
import { playBombSound } from './soundInteractions.js';

export function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = "Score:" + gameState.totalPoints;
}

export async function verifyObtainedAchievements(){
    if (gameState.bombsShooted >= gameAchievements.minimunBombs){
        if (!gameAchievements.bomberMan){
            gameAchievements.bomberMan = true;
            fetch("http://localhost:5000/achievements/Bomber%20Man", )
            .then (response =>{
                if (!response.ok){
                    throw Error("Error in network response" + response.statusText);
                }
                return response.json();
            })
            .then(data =>{
                if (data.error){
                    console.error("Error:", data.error);
                } else{
                    showAchievementNotification(data.name, data.description);
                    const achievementAudio = new Audio ("./sounds/achievementSound.mp3");
                    achievementAudio.play();
                }
            })

            fetch("http://localhost:5000/achievements/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: "Bomber Man"})
            })
                .then(response => {
                    if (!response.ok){
                        throw error("Error in network response:" + response.statusText);
                        
                    }
                    return response.json();
                })
                .then(data =>{
                    console.log("Achievement data updated:");
                })
            
        }
    }
}

