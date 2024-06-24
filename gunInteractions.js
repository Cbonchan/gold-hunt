export function spawnGun(){
    let gun = document.createElement("img");
    gun.src = "images/gun.png"
    gun.classList.add("gun");
    gun.id = "gameGun";
    document.getElementById("game").appendChild(gun);

    // De esta manera agregamos un evento para el movimiento del mouse
    document.addEventListener("mousemove", (event) => moveGun(event, gun));
}

export function moveGun(event, gun) {
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