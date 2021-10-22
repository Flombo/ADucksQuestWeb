let currentFPS;
let oldTimestamp;
let secondsPassed;
let selfGameObjects;
let canvas;
let context;
let playerHealthBar;
let isRunning;
function rendering(gameObjects) {
    selfGameObjects = gameObjects;
    oldTimestamp = 0;
    secondsPassed = 0;
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context = canvas.getContext('2d');
    playerHealthBar = document.getElementById('playerHealthBar');
    isRunning = true;
    window.addEventListener('keydown', (event) => { pauseGame(event); });
    window.requestAnimationFrame((timestamp) => { gameLoop(timestamp); });
}
function gameLoop(timestamp) {
    if (isRunning) {
        secondsPassed = (timestamp - oldTimestamp) / 1000;
        oldTimestamp = timestamp;
        currentFPS = Math.round(1 / secondsPassed);
        draw();
        window.requestAnimationFrame((timestamp) => gameLoop(timestamp));
    }
}
function pauseGame(event) {
    if (event.key === 'Escape') {
        if (isRunning) {
            isRunning = false;
        }
        else {
            isRunning = true;
            window.requestAnimationFrame((timestamp) => gameLoop(timestamp));
        }
    }
}
function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < selfGameObjects.length; i++) {
        let gameObject = selfGameObjects[i];
        context.fillStyle = gameObject.color;
        context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        handleSkullWalking(gameObject);
        updateHealthBar(gameObject);
    }
}
function handleSkullWalking(gameObject) {
    if (gameObject instanceof Skull) {
        let skull = gameObject;
        skull.walk();
    }
}
function updateHealthBar(gameObject) {
    if (gameObject instanceof Player) {
        let player = gameObject;
        let health = player.health;
        playerHealthBar.innerText = health.toString();
        if (health === 0) {
            isRunning = false;
            alert("You died!");
        }
    }
}
function getCurrentFPS() {
    return currentFPS;
}
//# sourceMappingURL=Rendering.js.map