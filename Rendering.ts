let currentFPS : number;
let oldTimestamp : number;
let secondsPassed : number;
let selfGameObjects : Array<GameObject>;
let canvas : HTMLCanvasElement;
let context : CanvasRenderingContext2D;
let playerHealthBar : HTMLElement;
let isRunning : boolean;


function rendering(gameObjects : Array<GameObject>) {
    selfGameObjects = gameObjects;
    oldTimestamp = 0;
    secondsPassed = 0;
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context = canvas.getContext('2d');
    playerHealthBar = document.getElementById('playerHealthBar');
    isRunning = true;
    window.addEventListener('keydown', (event) => {pauseGame(event)});
    window.requestAnimationFrame((timestamp) => {gameLoop(timestamp)});
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

function pauseGame(event : KeyboardEvent) {
    if(event.key === 'Escape'){
        if(isRunning) {
            isRunning = false;
        } else {
            isRunning = true;
            window.requestAnimationFrame((timestamp) => gameLoop(timestamp));
        }
    }
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < selfGameObjects.length; i++){
        let gameObject : GameObject = selfGameObjects[i];
        context.fillStyle = gameObject.color;
        context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);

        handleSkullWalking(gameObject);
        handleZombieWalking(gameObject);
        updateHealthBar(gameObject);
    }
}

function handleSkullWalking(gameObject : GameObject) {
    if(gameObject instanceof Skull) {
        let skull : Skull = gameObject as Skull;
        skull.walk();
    }
}

function handleZombieWalking(gameObject : GameObject) {
    if(gameObject instanceof Zombie) {
        let zombie : Zombie = gameObject as Zombie;
        zombie.walk();
    }
}

function updateHealthBar(gameObject : GameObject) {
    if(gameObject instanceof Player) {
        let player : Player = gameObject as Player;
        let health : number = player.health;
        playerHealthBar.innerText = health.toString();

        if(health === 0) {
            isRunning = false;
            alert("You died!");
        }
    }
}

function getCurrentFPS() : number {
    return currentFPS;
}