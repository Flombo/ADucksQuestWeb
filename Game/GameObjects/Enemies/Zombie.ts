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
                this.moveZombie(this.y + 1, this.x);
                break;
            case ZombieState.UP:
                this.moveZombie(this.y - 1, this.x);
                break;
            case ZombieState.LEFT:
                this.moveZombie(this.y, this.x - 1);
                break;
            case ZombieState.RIGHT:
                this.moveZombie(this.y, this.x + 1);
                break;
        }

    }

    private switchWalkingState(oldState : ZombieState) : void {
        let remainingChoices : Array<ZombieState> = this.walkingChoices;
        let oldStateIndex : number = remainingChoices.indexOf(oldState);
        remainingChoices.slice(oldStateIndex, 1);

        this.state = remainingChoices[Math.floor(Math.random() * remainingChoices.length)];
    }

    private moveZombie(newY : number, newX : number) : void {
        if(!this.checkIfOutOfBorder(newY, newX)) {
            if(!this.checkCollisionWithOtherGameObjects(newY, newX)) {
                let oldX : number = this.x;
                let oldY : number = this.y;

                this.y = newY;
                this.x = newX;

                this.grid[this.y][this.x] = this;
                this.grid[oldY][oldX] = null;
            }
        }
    }

    private checkCollisionWithOtherGameObjects(y : number, x : number) : boolean {
        let isColliding : boolean = false;
        let gameObject : GameObject = this.grid[y][x];

        if(gameObject !== null) {
            isColliding = true;
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

    private checkIfOutOfBorder(y : number, x : number) : boolean {
        let isOutOfBorder : boolean = false;

        if(x > this.grid[0].length - 1){
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        } else if(x < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        } else if(y > this.grid.length - 1){
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        } else if(y < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }

        return isOutOfBorder;
    }

}