let player;
let wall;
let walls;
window.onload = init;
function init() {
    let xGrid = Math.floor(window.innerWidth / 30) - 1;
    let yGrid = Math.floor(window.innerHeight / 30) - 1;
    let x;
    let y;
    let grid = new Array();
    for (let y = 0; y < yGrid; y++) {
        grid[y] = new Array();
        for (let x = 0; x < xGrid; x++) {
            grid[y][x] = null;
        }
    }
    let stair = new Stair();
    x = Math.floor(Math.random() * xGrid);
    y = Math.floor(Math.random() * yGrid);
    stair.x = x;
    stair.y = y;
    grid[y][x] = stair;
    walls = new Array();
    for (let i = 0; i < 100; i++) {
        wall = new Wall();
        x = Math.floor(Math.random() * xGrid);
        y = Math.floor(Math.random() * yGrid);
        wall.x = x;
        wall.y = y;
        grid[y][x] = wall;
        walls.push(wall);
    }
    player = new Player(grid);
    x = Math.floor(Math.random() * xGrid);
    y = Math.floor(Math.random() * yGrid);
    player.x = x;
    player.y = y;
    grid[y][x] = player;
    for (let i = 0; i < 5; i++) {
        let skull = new Skull(grid);
        let y = Math.floor(Math.random() * yGrid);
        skull.x = 0;
        skull.y = y;
        grid[y][0] = skull;
    }
    for (let i = 0; i < 5; i++) {
        let zombie = new Zombie(grid);
        x = Math.floor(Math.random() * xGrid);
        y = Math.floor(Math.random() * yGrid);
        zombie.x = x;
        zombie.y = y;
        grid[y][x] = zombie;
    }
    x = Math.floor(Math.random() * xGrid);
    y = Math.floor(Math.random() * yGrid);
    let hearth = new Heart();
    hearth.y = y;
    hearth.x = x;
    grid[y][x] = hearth;
    x = Math.floor(Math.random() * xGrid);
    y = Math.floor(Math.random() * yGrid);
    let coin = new Coin();
    coin.y = y;
    coin.x = x;
    grid[y][x] = coin;
    rendering(grid);
}
//# sourceMappingURL=index.js.map