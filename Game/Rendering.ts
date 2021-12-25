let currentFPS : number;
let oldTimestamp : number;
let secondsPassed : number;
let fovGrid : Array<Array<GameObject>>;
let selfGrid : Array<Array<GameObject>>;
let canvas : HTMLCanvasElement;
let context : CanvasRenderingContext2D;
let hud : HTMLElement;
let isRunning : boolean;
let showGrid : boolean;
let hasRenderedGrid : boolean;

function rendering(fovGridInit : Array<Array<GameObject>>, grid : Array<Array<GameObject>>) {
    fovGrid = fovGridInit;
    selfGrid = grid;
    hasRenderedGrid = false;
    oldTimestamp = 0;
    secondsPassed = 0;
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.style.marginLeft = "10px";
    context = canvas.getContext('2d');
    hud = document.getElementById('HUD');
    isRunning = true;
    showGrid = false;
    window.addEventListener('keydown', (event) => {onKeyDown(event)});
    window.requestAnimationFrame((timestamp) => {gameLoop(timestamp)});
}

function setFOVGrid(newFOVGrid : Array<Array<GameObject>>) {
    fovGrid = newFOVGrid;
}

function onKeyDown(event : KeyboardEvent) {
    if(event.key === 'Escape'){
        pauseGame();
    } else if(event.key === 'g') {
        showGrid = !showGrid;
    }
}

function pauseGame() : void {
    if(isRunning) {
        isRunning = false;
        hasRenderedGrid = false;
    } else {
        isRunning = true;
        window.requestAnimationFrame((timestamp) => gameLoop(timestamp));
    }
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

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let y : number = 0; y < fovGrid.length; y++) {
        for(let x: number = 0; x < fovGrid[y].length; x++) {
            renderGameObject(y, x);
        }
    }

    if(showGrid && !hasRenderedGrid) {
        for (let y : number = 0; y < selfGrid.length; y++) {
            for (let x : number = 0; x < selfGrid[y].length; x++) {
                renderGrid(y, x);
            }
        }
    }
}

function renderGameObject(y : number, x : number) : void {
    let gameObject: GameObject = fovGrid[y][x];

    if(gameObject !== null) {
        context.fillStyle = gameObject.color;
        context.fillRect(gameObject.x * 30, gameObject.y * 30, gameObject.width, gameObject.height);
        updateHUD(gameObject);
        renderFOVSquare(gameObject);
    }
}

function renderFOVSquare(gameObject : GameObject) {
    if(gameObject instanceof  Player) {
        context.strokeStyle = 'white';
        context.strokeRect(
            Math.ceil(
                gameObject.x - fovGrid[0].length / 2
            ) * 30,
            Math.ceil(
                gameObject.y - fovGrid.length / 2
            ) * 30,
            fovGrid[0].length * 30,
            fovGrid.length * 30
        );
    }
}

function renderGrid(y : number, x : number) : void {
    context.strokeStyle = 'Lightgreen';
    context.strokeRect(x * 30, y * 30, 30, 30);

    hasRenderedGrid = false;
}

function updateHUD(gameObject : GameObject) {
    if(gameObject instanceof Player) {
        let player : Player = gameObject as Player;
        let health : number = player.health;
        let steps : number = player.steps;
        let score : number = player.score;
        hud.innerText = `${buildHealthIcons(health)} Score:${score} Steps:${steps}`;

        if(health === 0) {
            isRunning = false;
            alert("You died!");
        }
    }
}

function buildHealthIcons(health : number) : string {
    let healthIcons : string = '';

    for(let i = 0; i< health; i++) {
        healthIcons += '🤍';
    }

    return healthIcons;
}

function getCurrentFPS() : number {
    return currentFPS;
}