let currentFPS;
let oldTimestamp;
let secondsPassed;
let selfGrid;
let selfXGrid;
let selfYGrid;
let canvas;
let context;
let hud;
let isRunning;
let showGrid;
let hasRenderedGrid;
function rendering(grid, xGrid, yGrid) {
    selfXGrid = xGrid;
    selfYGrid = yGrid;
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
    showGrid = true;
    window.addEventListener('keydown', (event) => { onKeyDown(event); });
    window.requestAnimationFrame((timestamp) => { gameLoop(timestamp); });
}
function onKeyDown(event) {
    if (event.key === 'Escape') {
        pauseGame();
    }
    else if (event.key === 'g') {
        showGrid = !showGrid;
    }
}
function pauseGame() {
    if (isRunning) {
        isRunning = false;
        hasRenderedGrid = false;
    }
    else {
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
    renderGameObject();
    renderGrid();
}
function renderGameObject() {
    for (let i = 0; i < selfGrid.length; i++) {
        let gameObject = selfGrid[i];
        context.fillStyle = gameObject.color;
        context.fillRect(gameObject.x * 30, gameObject.y * 30, gameObject.width, gameObject.height);
        updateHUD(gameObject);
    }
}
function renderGrid() {
    if (showGrid && !hasRenderedGrid) {
        for (let y = 0; y < selfYGrid; y++) {
            for (let x = 0; x < selfXGrid; x++) {
                context.strokeStyle = 'Lightgreen';
                context.strokeRect(x * 30, y * 30, 30, 30);
            }
        }
        hasRenderedGrid = false;
    }
}
function updateHUD(gameObject) {
    if (gameObject instanceof Player) {
        let player = gameObject;
        let health = player.health;
        let steps = player.steps;
        let score = player.score;
        hud.innerText = `${buildHealthIcons(health)} Score:${score} Steps:${steps}`;
        if (health === 0) {
            isRunning = false;
            alert("You died!");
        }
    }
}
function buildHealthIcons(health) {
    let healthIcons = '';
    for (let i = 0; i < health; i++) {
        healthIcons += '🤍';
    }
    return healthIcons;
}
function getCurrentFPS() {
    return currentFPS;
}
//# sourceMappingURL=Rendering.js.map