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
    bonusModeIndex: 0,
    bonusModeMinToActivate: 30,
    ducksShooted: 0,
    timeCoinShooted: 0,
    obtainedAchievements: [],

    inBonusMode: false
};

export const gameAchievements = {
    minimunBombs: 5,
    minimunPoints: 150,
    minimunBlueGold: 15,
    minimunTimeCoins: 2,
    minimunDucks: 1,
    
    duckHunt: false,
    bomberMan: false,
    blueGold: false,
    millionare: false,
    timeTraveler: false,
    
}