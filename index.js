let player;
let wall;
let gameObjects;
let walls;
window.onload = init;
function init() {
    gameObjects = new Array();
    let stair = new Stair();
    stair.x = Math.floor(Math.random() * window.innerWidth / 2);
    stair.y = Math.floor(Math.random() * window.innerHeight / 2);
    gameObjects.push(stair);
    walls = new Array();
    for (let i = 0; i < 2; i++) {
        wall = new Wall();
        wall.x = Math.floor(Math.random() * window.innerWidth / 2);
        wall.y = Math.floor(Math.random() * window.innerHeight / 2);
        gameObjects.push(wall);
        walls.push(wall);
    }
    player = new Player(walls, stair);
    gameObjects.push(player);
    for (let i = 0; i < 5; i++) {
        let skull = new Skull(gameObjects);
        skull.x = 0;
        skull.y = Math.floor(Math.random() * window.innerHeight);
        gameObjects.push(skull);
    }
    for (let i = 0; i < 5; i++) {
        let zombie = new Zombie(gameObjects);
        zombie.x = Math.random() * window.innerWidth;
        zombie.y = Math.random() * window.innerHeight;
        gameObjects.push(zombie);
    }
    rendering(gameObjects);
}
//# sourceMappingURL=index.js.map