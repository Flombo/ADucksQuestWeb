class Player extends GameObject {
    constructor(grid) {
        super();
        this._health = 3;
        this._steps = 0;
        this._score = 0;
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
            this._steps++;
            window.dispatchEvent(this.stepEvent);
        }
    }
    checkCollision(newY, newX) {
        let canWalk = true;
        if (newX > this.grid[0].length - 1) {
            canWalk = false;
        }
        else if (newX < 0) {
            canWalk = false;
        }
        else if (newY < 0) {
            canWalk = false;
        }
        else if (newY > this.grid.length - 1) {
            canWalk = false;
        }
        else if (this.grid[newY][newX] !== null) {
            canWalk = this.checkCollisionWithOtherGameObjects(this.grid[newY][newX], newY, newX);
        }
        return canWalk;
    }
    checkCollisionWithOtherGameObjects(gameObject, newY, newX) {
        let canWalk = false;
        if (gameObject instanceof Stair) {
            isRunning = false;
            alert('You won!');
        }
        if (gameObject instanceof Zombie || gameObject instanceof Skull) {
            this.health = 1;
        }
        if (gameObject instanceof Heart) {
            this._health++;
            canWalk = true;
        }
        if (gameObject instanceof Coin) {
            this._score++;
            canWalk = true;
        }
        if (gameObject instanceof Chest) {
            canWalk = this.checkChestCollision(newY, newX, gameObject);
        }
        return canWalk;
    }
    checkChestCollision(newY, newX, gameObject) {
        let chest = gameObject;
        let canWalk;
        if (newX > this.x) {
            canWalk = chest.move(newY, newX + 1);
        }
        else if (newX < this.x) {
            canWalk = chest.move(newY, newX - 1);
        }
        else if (newY > this.y) {
            canWalk = chest.move(newY + 1, newX);
        }
        else if (newY < this.y) {
            canWalk = chest.move(newY - 1, newX);
        }
        return canWalk;
    }
    get health() {
        return this._health;
    }
    set health(value) {
        if (this._health - value >= 0) {
            this._health -= value;
        }
    }
    get steps() {
        return this._steps;
    }
    get score() {
        return this._score;
    }
}
//# sourceMappingURL=Player.js.map