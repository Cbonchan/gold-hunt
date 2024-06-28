import { gameState, gameAchievements } from './variables.js';
import { showAchievementNotification } from './script.js';


export function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = "Score:" + gameState.totalPoints;
}

export async function checkObtainedAchievements(){
    if (!gameAchievements.bomberMan && gameState.bombsShooted >= gameAchievements.minimunBombs ){
        gameAchievements.bomberMan = true;
        saveObtainedAchievements("Bomber Man");
    }
    if (!gameAchievements.blueGold && gameState.blueCoinsShooted >= gameAchievements.minimunBlueGold){
        gameAchievements.blueGold = true;
        saveObtainedAchievements("Blue Gold?!");
    }
    if (!gameAchievements.duckHunt && gameState.ducksShooted >= 1){
        gameAchievements.duckHunt = true;
        saveObtainedAchievements("Duck-Hunt");
    }
}


export async function saveObtainedAchievements(achievementName){

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

/*

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
                    showAchievementNotification(data.name, data.description, data.logo);
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

    if (gameState.blueCoinsShooted >= gameAchievements.minimunBlueGold){
        if (!gameAchievements.blueGold){
            gameAchievements.blueGold = true;

            fetch("http://localhost:5000/achievements/Blue%20Gold%3F%21",)
                .then (response => {
                    if (!response.ok){
                        throw Error ("Error in network response" + response.statusText)
                    }
                    return response.json();
                })
                .then (data => {
                    if (data.error){
                        console.error("Error:", data.error);
                    } else{
                        showAchievementNotification(data.name, data.description, data.logo);
                        const achievementAudio = new Audio("./sounds/achievementSound.mp3");
                        achievementAudio.play();
                    }
                })

        
        }
    }

    if (gameState.ducksShooted >= 1){
        if (!gameAchievements.duckHunt){
            gameAchievements.duckHunt = true;
            fetch("http://localhost:5000/achievements/Duck-Hunt",)
                .then (response => {
                    if (!response.ok){
                        throw Error ("Error in network response" + response.status);
                    }
                    return response.json()
                })
                .then (data => {
                    if (data.error){
                        console.error("Error:", data.error);
                    } else{
                        showAchievementNotification(data.name, data.description, data.logo);
                        const achievementAudio = new Audio("./sounds/achievementSound.mp3");
                        achievementAudio.play();
                    }
                })
        }
    }
}


*/