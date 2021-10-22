var player;
var wall;
var rendering;
var gameObjects;
var walls;
window.onload = init;
function init() {
    gameObjects = new Array();
    var stair = new Stair();
    stair.x = Math.floor(Math.random() * window.innerWidth / 2);
    stair.y = Math.floor(Math.random() * window.innerHeight / 2);
    gameObjects.push(stair);
    walls = new Array();
    for (var i = 0; i < 2; i++) {
        wall = new Wall();
        wall.x = Math.floor(Math.random() * window.innerWidth / 2);
        wall.y = Math.floor(Math.random() * window.innerHeight / 2);
        gameObjects.push(wall);
        walls.push(wall);
    }
    player = new Player(walls, stair);
    gameObjects.push(player);
    var skull = new Skull(gameObjects);
    skull.x = 0;
    skull.y = Math.floor(Math.random() * window.innerHeight);
    gameObjects.push(skull);
    rendering = new Rendering(gameObjects);
}
//# sourceMappingURL=index.js.map