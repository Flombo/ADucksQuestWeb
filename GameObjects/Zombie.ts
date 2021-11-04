class Zombie extends GameObject{

    private state : ZombieState;
    private readonly grid : Array<Array<GameObject>>;
    private readonly walkingChoices : Array<ZombieState>;

    constructor(grid : Array<Array<GameObject>>) {
        super();
        this.color = 'Violet';
        this.state = ZombieState.RIGHT;
        this.grid = grid;
        this.walkingChoices = new Array<ZombieState>();
        this.walkingChoices.push(ZombieState.RIGHT, ZombieState.UP, ZombieState.LEFT, ZombieState.DOWN);
        window.addEventListener('step', () => this.walk());
    }

    public walk() : void {
        switch (this.state){
            case ZombieState.DOWN:
                if(!this.checkIfOutOfBorder(this.x, this.y + 1)) {
                    if(!this.checkCollisionWithOtherGameObjects(this.x, this.y + 1)) {
                        this.grid[this.y][this.x] = null;
                        this.y++;
                        this.grid[this.y][this.x] = this;

                    }
                }
                break;
            case ZombieState.UP:
                if(!this.checkIfOutOfBorder(this.x, this.y - 1)) {
                    if(!this.checkCollisionWithOtherGameObjects(this.x, this.y - 1)) {
                        this.grid[this.y][this.x] = null;
                        this.y--;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
            case ZombieState.LEFT:
                if(!this.checkIfOutOfBorder(this.x - 1, this.y)) {
                    if(!this.checkCollisionWithOtherGameObjects(this.x - 1, this.y)) {
                        this.grid[this.y][this.x] = null;
                        this.x--;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
            case ZombieState.RIGHT:
                if(!this.checkIfOutOfBorder(this.x + 1, this.y)) {
                    if(!this.checkCollisionWithOtherGameObjects(this.x + 1, this.y)) {
                        this.grid[this.y][this.x] = null;
                        this.x++;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
        }

    }

    private checkCollisionWithOtherGameObjects(x : number, y : number) : boolean {
        let isColliding : boolean = false;
        let gameObject : GameObject = this.grid[y][x];

        if(gameObject !== null) {
            let oldState : ZombieState = this.state;
            this.checkCollisionWithPlayer(gameObject);
            this.switchWalkingState(oldState);
        }

        return isColliding;
    }

    private checkCollisionWithPlayer(gameObject : GameObject) : void {
        if(gameObject instanceof Player) {
            this.state = ZombieState.ATTACK;
            let player : Player = gameObject as Player;

            if(player.health - 1 >= 0) {
                player.health = 1;
            }
        }
    }

    private switchWalkingState(oldState : ZombieState) : void {
        let remainingChoices : Array<ZombieState> = this.walkingChoices;
        let oldStateIndex : number = remainingChoices.indexOf(oldState);
        remainingChoices.slice(oldStateIndex, 1);

        this.state = remainingChoices[Math.floor(Math.random() * remainingChoices.length)];
    }

    private checkIfOutOfBorder(x : number, y : number) : boolean {
        let isOutOfBorder : boolean = false;

        if(x > this.grid[0].length){
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        } else if(x < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        } else if(y > this.grid.length){
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        } else if(y < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }

        return isOutOfBorder;
    }

}