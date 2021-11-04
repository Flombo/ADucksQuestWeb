let player : Player;
let wall : Wall;
let walls : Array<Wall>;

window.onload = init;

function init() : void {

    let xGrid : number = Math.floor(window.innerWidth / 30);
    let yGrid : number = Math.floor(window.innerHeight / 30);
    let x : number;
    let y: number;

    let grid : Array<Array<GameObject>> = new Array<Array<GameObject>>();

    for(let y : number = 0; y < yGrid; y++) {

        grid[y] = new Array<GameObject>();

        for(let x : number = 0; x < xGrid; x++) {
            grid[y][x] = null;
        }
    }

    let stair : Stair = new Stair();
    x = Math.floor(Math.random() * xGrid);
    y = Math.floor(Math.random() * yGrid);

    stair.x = x;
    stair.y = y;

    grid[y][x] = stair;

    walls = new Array<Wall>();

    for(let i = 0; i < 2; i++) {
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

    for(let i = 0; i < 5; i++) {
        let skull: Skull = new Skull(grid);
        let y : number = Math.floor(Math.random() * yGrid);
        skull.x = 0;
        skull.y = y;
        grid[y][0] = skull;
    }

    for(let i = 0; i < 5; i++) {
        let zombie: Zombie = new Zombie(grid);

        x = Math.floor(Math.random() * xGrid);
        y = Math.floor(Math.random() * yGrid);

        zombie.x = x;
        zombie.y = y;

        grid[y][x] = zombie;
    }


    rendering(grid);
}