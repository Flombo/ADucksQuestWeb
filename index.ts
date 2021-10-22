let player : Player;
let wall : Wall;
let rendering : Rendering;
let gameObjects : Array<GameObject>;
let walls : Array<Wall>;

window.onload = init;

function init() : void {
    gameObjects = new Array<GameObject>();

    let stair : Stair = new Stair();
    stair.x = Math.floor(Math.random() * window.innerWidth / 2);
    stair.y = Math.floor(Math.random() * window.innerHeight / 2);
    gameObjects.push(stair);

    walls = new Array<Wall>();

    for(let i = 0; i < 2; i++) {
        wall = new Wall();
        wall.x = Math.floor(Math.random() * window.innerWidth / 2);
        wall.y = Math.floor(Math.random() * window.innerHeight / 2);
        gameObjects.push(wall);
        walls.push(wall);
    }

    player = new Player(walls, stair);
    gameObjects.push(player);

    let skull : Skull = new Skull(gameObjects);
    skull.x = 0;
    skull.y = Math.floor(Math.random() * window.innerHeight);

    gameObjects.push(skull);

    rendering = new Rendering(gameObjects);
}