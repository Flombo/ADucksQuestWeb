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
    move(newY, newX) {
        if (this.checkCollision(newY, newX)) {
            let oldX = this.x;
            let oldY = this.y;
            this.x = newX;
            this.y = newY;
            this.grid[newY][newX] = this;
            this.grid[oldY][oldX] = null;
            window.dispatchEvent(this.stepEvent);
        }
    }
    checkCollision(y, x) {
        let canWalk = true;
        if (x > this.grid[0].length - 1) {
            canWalk = false;
        }
        else if (x < 0) {
            canWalk = false;
        }
        else if (y < 0) {
            canWalk = false;
        }
        else if (y > this.grid.length - 1) {
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
        if (gameObject instanceof Zombie || gameObject instanceof Skull) {
            this.health = 1;
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