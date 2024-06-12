const HARD = 300;
const NORMAL = 700;
const EASY = 1500;

let isShooting = false;

const bulletsOfMag = 7;
let bulletsShooted = 0;
let totalShotsFired = 0;
let totalPoints = 0;
let shotsMissed = 0;
let diffTimer = 800;
let count = 1;
let disTimer = 3000;



function getShotsFired() {
    return totalShotsFired;
}

function getScore() {
    return totalPoints;
}

function getShotsMissed() {
    return shotsMissed;
}

function eliminateInTime(time, id){
    setTimeout(() => {
        let removed = document.getElementById(id.toString());
        removed.classList.remove("goldenCoinBase");
        removed.innerHTML = id;
    }, time);

}

function createIngameScore(){
    let score = document.createElement("span");

    score.id = "score";

    score.textContent = "0";

    let game = document.getElementById("game");
    game.appendChild(score);

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

function createCoin() {
    console.log("Entraste a la funcion createCoin"); // Debug
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.classList.add("coin");

    coin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    coin.onclick = () => shoot(coin);
    propContainer.appendChild(coin);

    // Aca esta animada la caida de la moneda
    setTimeout(() => {
        coin.style.transform = 'translateY(400px)';
        propContainer.removeChild(coin);
    }, 1300); // Duración de la animación de caída (1.3s en este caso)

    console.log("createCoin finalizada con exito");
}

function createEspecialCoin(){
    console.log("Entraste a la funcion createCoin"); // Debug
    let propContainer = document.getElementById("propContainer");
    let coin = document.createElement("div");
    coin.classList.add("especialCoin");

    coin.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    coin.onclick = () => shoot(coin);
    propContainer.appendChild(coin);

    // Aca esta animada la caida de la moneda
    setTimeout(() => {
        coin.style.transform = 'translateY(400px)';
        propContainer.removeChild(coin);
    }, 1300); // Duración de la animación de caída (1.3s en este caso)

    console.log("createCoin finalizada con exito");
}


function createBomb(){
    let propContainer = document.getElementById("propContainer");
    let bomb = document.createElement("div");
    bomb.classList.add("bomb");

    bomb.style.left = Math.random() * (propContainer.offsetWidth - 80) + 'px';
    bomb.onclick = () => shootBomb(bomb);
    propContainer.appendChild(bomb);

    // Aca esta animada la caida de la moneda
    setTimeout(() => {
        bomb.style.transform = 'translateY(400px)';
        propContainer.removeChild(bomb);
    }, 1300); // Duración de la animación de caída (1.3s en este caso)

    console.log("createCoin finalizada con exito");
    
}

function shootBomb(bomb){
    if (isShooting){
        return;
    }

    let gun = document.querySelector(".gun");
    gun.src = "images/gun2.png"
    isShooting = true;
    playGunShot();
    totalPoints--;
    updateScore();
    bomb.remove();
    setTimeout(() => {
        gun.src = "images/gun.png";
        isShooting = false;
    }, 100);

    return;
}

function shoot(coin) {

    if (isShooting){
        return;
    }

    let gun = document.querySelector(".gun");
    gun.src = "images/gun2.png"
    isShooting = true;
    playGunShot();
    if (coin.classList.contains("especialCoin")){
        totalPoints += 5;
    }
    else if (coin.classList.contains("coin")){
        totalPoints++;
    }
    updateScore();
    coin.remove();
    setTimeout(() => {
        gun.src = "images/gun.png";
        isShooting = false;
    }, 100);

    return;
}

function playGunShot() {
    let audio = document.getElementById('fireSound');
    let audio2 = document.getElementById('fireSoundLastBullet');
    if (bulletsShooted < bulletsOfMag){
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        bulletsShooted++;
    }else{
        audio2.play();
        bulletsShooted = 0;
    }
}

function playBombSound(){
    let audio
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = getScore();
}

function spawnGun(){
    let gun = document.createElement("img");
    gun.src = "images/gun.png"
    gun.classList.add("gun");
   
    document.getElementById("game").appendChild(gun);

    // De esta manera agregamos un evento para el movimiento del mouse
    document.addEventListener("mousemove", (event) => moveGun(event, gun));

    
}

function moveGun(event, gun) {
    const game = document.getElementById("game");
    // Obtenemos el espacio que ocupa el contenedor "gun"
    const gameSpace = game.getBoundingClientRect(); 
    //
    const gunWidth = gun.offsetWidth; 

    let mousePosition = event.clientX - gameSpace.left;

    // Calcular la posición en el eje X dentro del contenedor
    let gunPosition = mousePosition - (gunWidth / 2);

    // Asegurarse de que el arma no se salga del contenedor
    let limitedGunPosition = Math.max(0, Math.min(gunPosition, gameSpace.width - gunWidth));

    // Ajustar la posición del arma
    gun.style.left = `${limitedGunPosition}px`;
}

function playPauseMenuTheme(){
    let menuTheme = document.getElementById("menuTheme");
    let menuMusicButton = document.getElementById("menuMusicImage");
    if (count == 0){
        menuMusicImage.src = "images/volumeOn.png";
        count = 1;
        menuTheme.play();
    } else {
        count = 0;
        menuMusicImage.src = "images/volumeOff.png";
        menuTheme.pause();

    }
}



function startGame(){
    createIngameScore();
    createPropContainer();
    spawnGun();
    setInterval(()=>{
        createCoin();
        createBomb();
    }, HARD);  
    setInterval(() => {
        createEspecialCoin();
    }, 5000);
    document.getElementById("botonJugar").style.display = "none";
    document.getElementById("volumeContainer").style.display = "none";
    menuTheme.pause();
    ingameMusic.play();
    
}


