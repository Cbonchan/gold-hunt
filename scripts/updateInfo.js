import { gameState, gameAchievements } from './variables.js';
import { showAchievementNotification } from './script.js';

export function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = "Score:" + gameState.totalPoints;
}

export function verifyObtainedAchievements(){
    if (gameState.bombsShooted >= gameAchievements.minimunBombs){
        if (!gameAchievements.bomberMan){
            gameAchievements.bomberMan = true;
            showAchievementNotification("Bomber Man", "¿Are you stupid?");
        }
    }
}
