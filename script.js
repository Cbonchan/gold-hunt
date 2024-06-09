let balas_disparadas = 0;

function reproducir_disparo() {
    let audio = document.getElementById('fireSound');
    let audio2 = document.getElementById('fireSoundLastBullet');
    if (balas_disparadas < 7){
        audio.play();
        balas_disparadas++;
    }else{
        audio2.play();
        balas_disparadas = 0;
    }
}
