let player : Player;
let wall : Wall;
let rendering : Rendering;
let gameObjects : Array<GameObject>;
let walls : Array<Wall>;

window.onload = init;

function init() : void {
    gameObjects = new Array<GameObject>();
    walls = new Array<Wall>();

    for(let i = 0; i < 2; i++) {
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