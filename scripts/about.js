// variables.js
export const gameState = {
    isShooting: false,
    totalPoints: 0,
    count: 1,
    bulletsShooted: 0,
    bulletsOfMag: 7,
    totalShotsFired: 0,
    shotsMissed: 0,
    gameDuration: 40,

    bombsShooted: 0,
    blueCoinsShooted: 0,
    ducksShooted: 0,
    obtainedAchievements: []
};

export const gameAchievements = {
    minimunBombs: 5,
    minimunPoints: 150,
    minimunBlueGold: 1,
    
    duckHunt: false,
    bomberMan: false,
    blueGold: false,
    millionare: false,
    
}