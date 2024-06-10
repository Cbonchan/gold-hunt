const bulletsOfMag = 7;
let bulletsShooted = 0;
let totalShotsFired = 0;
let totalPoints = 0;
let shotsMissed = 0;

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

function getShotsFired() {
    return totalShotsFired;
}

function getScore() {
    return totalPoints;
}

function getShotsMissed() {
    return shotsMissed;
}

function giveFireAnimation(fila, columna){
    zoneToAnimate = document.getElementById( ((7 *(fila-1))) + columna);
    zoneToAnimate.classList.add('zoneIsFired')
    setTimeout(() => {
        zoneToAnimate.classList.remove('zoneIsFired');
    }, 50);
}


function shotLandsOnAValidTarget(fila,columna){
    target = document.getElementById( ((7 *(fila-1))) + columna);
    if( target.classList.contains('goldenCoinBase'))
        return true;
    else{
        return false;
    }
    /*
    evaluar los otros tipos de moneda aquí, en caso de existir.
    */
}

//Pre:Debe haber algún tipo de variante de moneda en esa fila y columna.
function setPoints(fila, columna){
    /*
    pedirle a la moneda que un multiplicador
    asignar puntos  += 1* multiplicador
    */
    let id = ((7 *(fila-1))) + columna;
    totalPoints++;
    updateScore();
    targetHitted = document.getElementById( id);
    targetHitted.classList.remove('goldenCoinBase');
    targetHitted.innerHTML = id;
}


function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = getScore();
}

function shoot( fila , columna) {
    playGunShot();
    giveFireAnimation(fila,columna);
    totalShotsFired++;
    if( shotLandsOnAValidTarget(fila,columna) ){
        setPoints(fila,columna);
    }else{
        shotsMissed++;
    }
}

function getRandomPos() {
    return Math.floor(Math.random() * 49) + 1;
}

function updateRandomNumber() {
    let randNumber = getRandomPos();
    item = document.getElementById(randNumber.toString());
    item.classList.add("goldenCoinBase");
    item.innerHTML = '<img src="https://i.gifer.com/Fw3P.gif" style="width: 15px;">';
}

function createTable() {
    let table = '<table id= gameZone class="no-select">';
    for (let i = 0; i < 7; i++) {
        table += '<tr>';
        for (let j = 0; j < 7; j++) {
            table += `<td 
            onclick="shoot(${i + 1}, ${j + 1})"
            bordercolor = "black"
            id = "${i * 7 + j + 1}" 
            class="no-select"
            >${i * 7 + j + 1}</td>`;
        }
        table += '</tr>';
    }     
    table += '</table>';    
    document.getElementById('game').innerHTML = table;
    setInterval(updateRandomNumber, 800);
}
