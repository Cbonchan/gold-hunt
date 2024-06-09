const BALAS_ANTES_DE_RECARGAR = 7;
let balas_disparadas = 0;
let balas_totales_disparadas = 0;
let puntos_totales = 0;
let balas_falladas = 0;

function reproducirDisparo() {
    let audio = document.getElementById('fireSound');
    let audio2 = document.getElementById('fireSoundLastBullet');
    if (balas_disparadas < BALAS_ANTES_DE_RECARGAR){
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        balas_disparadas++;
    }else{
        audio2.play();
        balas_disparadas = 0;
    }
}

function getBalasTotalesDisparadas() {
    return balas_totales_disparadas;
}

function getPuntosTotales() {
    return puntos_totales;
}

function getBalasFalladas() {
    return balas_falladas;
}

function disparoAciertaAObjetivo(/*Aqui debería recibir la sección de la tabla sobre la que hizo click*/) {
    /* if( seccion de la tabla es vacío (osea justo ahi nunca hay monedas) ) return false;
        if( seccion de la tabla es una moneda && esVisible(moneda) ) return true;
        return false;
    */
   return false;
}

function animarZonaDisparada(fila, columna){
    zonaParaAnimar = document.getElementById( ((7 *(fila-1))) + columna);
    zonaParaAnimar.classList.add('zonaEsDisparada')
    setTimeout(() => {
        zonaParaAnimar.classList.remove('zonaEsDisparada');
    }, 50);
}

function disparar( fila , columna) {
    reproducirDisparo();
    animarZonaDisparada(fila,columna);
    if( juego_iniciado){
        balas_totales_disparadas++;
        if( disparoAciertaAObjetivo(fila,columna) ){
            asignar_puntos(fila,columna);
        }else{
            balas_falladas++;
        }
    }
}

function crearTabla() {
    let tabla = '<table id= gameZone>';
    for (let i = 0; i < 7; i++) {
        tabla += '<tr>';
        for (let j = 0; j < 7; j++) {
            tabla += `<td 
            onclick="disparar(${i + 1}, ${j + 1})"
            bordercolor = "black"
            id = "${i * 7 + j + 1}" >${i * 7 + j + 1}</td>`;
        }
        tabla += '</tr>';
    }     
    tabla += '</table>';    
    document.getElementById('game').innerHTML = tabla;
}
window.onload = crearTabla;
