class Player extends GameObject {

    private _health : number;
    private readonly stepEvent : CustomEvent;
    private readonly grid : Array<Array<GameObject>>;

    constructor(grid : Array<Array<GameObject>>) {
        super();
        this._health = 3;
        this.stepEvent = new CustomEvent<any>(
            "step",
            {
                bubbles: true,
                cancelable: true
            });
        this.grid = grid;

        window.addEventListener('keypress', (event : KeyboardEvent) => this.onKeyPressed(event));
    }

    private onKeyPressed(event : KeyboardEvent) {
        if(isRunning) {

            if (event.key === 'w') {
                if (this.checkCollision(this.x, this.y - 1)) {
                    this.grid[this.y][this.x] = null;
                    this.y--;
                    this.grid[this.y][this.x] = this;
                }
            }

            if (event.key === 's') {
                if (this.checkCollision(this.x, this.y + 1)) {
                    this.grid[this.y][this.x] = null;
                    this.y++;
                    this.grid[this.y][this.x] = this;
                }
            }

            if (event.key === 'a') {
                if (this.checkCollision(this.x - 1, this.y)) {
                    this.grid[this.y][this.x] = null;
                    this.x--;
                    this.grid[this.y][this.x] = this;
                }
            }

            if (event.key === 'd') {
                if (this.checkCollision(this.x + 1, this.y)) {
                    this.grid[this.y][this.x] = null;
                    this.x++;
                    this.grid[this.y][this.x] = this;
                }
            }

            window.dispatchEvent(this.stepEvent);
        }
    }

    private checkCollision(x : number, y : number) : boolean {
        let canWalk : boolean = true;

        console.log(this.grid[y][x]);

        if(x > this.grid[0].length){
            canWalk = false;
        } else if(x < 0) {
            canWalk = false;
        } else if(y < 0) {
            canWalk = false;
        } else if(y > this.grid.length){
            canWalk = false;
        } else if(this.grid[y][x] !== null) {
            this.checkCollisionWithOtherGameObjects(this.grid[y][x]);
            canWalk = false;
        }

        return canWalk;
    }

    private checkCollisionWithOtherGameObjects(gameObject : GameObject) {
        if (gameObject instanceof Stair) {
            isRunning = false;
            alert('You won!')
        }
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        if(this._health - value >= 0) {
            this._health -= value;
        }
    }
}