class Player extends GameObject {
    constructor(grid) {
        super();
        this._health = 3;
        this.stepEvent = new CustomEvent("step", {
            bubbles: true,
            cancelable: true
        });
        this.grid = grid;
        window.addEventListener('keypress', (event) => this.onKeyPressed(event));
    }
    onKeyPressed(event) {
        if (isRunning) {
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
    checkCollision(x, y) {
        let canWalk = true;
        console.log(this.grid[y][x]);
        if (x > this.grid[0].length) {
            canWalk = false;
        }
        else if (x < 0) {
            canWalk = false;
        }
        else if (y < 0) {
            canWalk = false;
        }
        else if (y > this.grid.length) {
            canWalk = false;
        }
        else if (this.grid[y][x] !== null) {
            this.checkCollisionWithOtherGameObjects(this.grid[y][x]);
            canWalk = false;
        }
        return canWalk;
    }
    checkCollisionWithOtherGameObjects(gameObject) {
        if (gameObject instanceof Stair) {
            isRunning = false;
            alert('You won!');
        }
    }
    get health() {
        return this._health;
    }
    set health(value) {
        if (this._health - value >= 0) {
            this._health -= value;
        }
    }
}
//# sourceMappingURL=Player.js.map