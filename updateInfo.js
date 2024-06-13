import { gameState } from './variables.js';

export function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = gameState.totalPoints;
}