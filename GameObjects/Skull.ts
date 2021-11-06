class Skull extends GameObject {

    private state : SkullState;
    private readonly grid : Array<Array<GameObject>>;

    constructor(grid : Array<Array<GameObject>>) {
        super();
        this.color = 'Red';
        this.state = SkullState.RIGHT;
        this.grid = grid;
        window.addEventListener('step', () => this.walk());
    }

    public walk() : void {
        if (this.state === SkullState.RIGHT) {
            this.move(this.x + 1);
        } else if (this.state === SkullState.LEFT) {
            this.move(this.x - 1);
        }
    }

    private move(newX : number) : void {
        if(!this.checkIfOutOfBorder(newX)) {
            if(!this.checkCollisionWithOtherGameObject(newX)) {
                let oldX : number = this.x;
                this.x = newX;

                this.grid[this.y][this.x] = this;
                this.grid[this.y][oldX] = null;
            }
        }
    }

    private switchWalkingState() : void {
        if(this.state === SkullState.RIGHT) {
            this.state = SkullState.LEFT;
        } else if(this.state === SkullState.LEFT) {
            this.state = SkullState.RIGHT;
        }
    }

    private checkCollisionWithOtherGameObject(x : number) : boolean {
        let gameObject : GameObject = this.grid[this.y][x];
        let isColliding : boolean = false;

        if (gameObject !== this && gameObject !== null) {
            isColliding = true;
            this.checkCollisionWithPlayer(gameObject);
            this.switchWalkingState();
        }

        return isColliding;
    }

    private checkCollisionWithPlayer(gameObject : GameObject) : void {
        if(gameObject instanceof Player) {
            let oldState : SkullState = this.state;
            this.state = SkullState.ATTACK;
            let player : Player = gameObject as Player;

            if(player.health - 1 >= 0) {
                player.health = 1;
            }

            this.state = oldState;
        }
    }

    private checkIfOutOfBorder(x : number) : boolean {
        let isOufOfBorder : boolean = false;
        if(x > this.grid[this.y].length - 1){
            isOufOfBorder = true;
            this.state = SkullState.LEFT;
        } else if(x < 0) {
            isOufOfBorder = true;
            this.state = SkullState.RIGHT;
        }

        return isOufOfBorder;
    }

}