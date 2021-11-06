class Player extends GameObject {

    private _health : number;
    private readonly stepEvent : CustomEvent;
    private readonly grid : Array<Array<GameObject>>;
    private _steps : number;
    private _score : number;

    constructor(grid : Array<Array<GameObject>>) {
        super();
        this._health = 3;
        this._steps = 0;
        this._score = 0;
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
                this.move(this.y - 1, this.x);
            }

            if (event.key === 's') {
                this.move(this.y + 1, this.x);
            }

            if (event.key === 'a') {
                this.move(this.y, this.x - 1);
            }

            if (event.key === 'd') {
                this.move(this.y, this.x + 1);
            }

        }
    }

    private move(newY : number, newX : number) {
        if (this.checkCollision(newY, newX)) {
            let oldX : number = this.x;
            let oldY : number = this.y;

            this.x = newX;
            this.y = newY;

            this.grid[newY][newX] = this;
            this.grid[oldY][oldX] = null;
            this._steps++;
            window.dispatchEvent(this.stepEvent);
        }
    }

    private checkCollision(y : number, x : number) : boolean {
        let canWalk : boolean = true;

        if(x > this.grid[0].length - 1){
            canWalk = false;
        } else if(x < 0) {
            canWalk = false;
        } else if(y < 0) {
            canWalk = false;
        } else if(y > this.grid.length - 1){
            canWalk = false;
        } else if(this.grid[y][x] !== null) {
            canWalk = this.checkCollisionWithOtherGameObjects(this.grid[y][x]);
        }

        return canWalk;
    }

    private checkCollisionWithOtherGameObjects(gameObject : GameObject) : boolean {
        let canWalk : boolean = false;

        if (gameObject instanceof Stair) {
            isRunning = false;
            alert('You won!')
        }

        if(gameObject instanceof Zombie || gameObject instanceof Skull) {
            this.health = 1;
        }

        if(gameObject instanceof Heart) {
            this._health++;
            canWalk = true;
        }

        if(gameObject instanceof Coin) {
            this._score++;
            canWalk = true;
        }

        return canWalk;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        if(this._health - value >= 0) {
            this._health -= value;
        }
    }

    get steps() : number {
        return this._steps;
    }

    get score() : number {
        return this._score;
    }
}