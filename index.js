var player;
var wall;
var rendering;
var gameObjects;
var walls;
window.onload = init;
function init() {
    gameObjects = new Array();
    walls = new Array();
    for (var i = 0; i < 2; i++) {
        wall = new Wall();
        wall.x = Math.random() * window.innerWidth / 2;
        wall.y = Math.random() * window.innerHeight / 2;
        gameObjects.push(wall);
        walls.push(wall);
    }
    player = new Player(walls);
    gameObjects.push(player);
    rendering = new Rendering(gameObjects);
}
//# sourceMappingURL=index.js.map