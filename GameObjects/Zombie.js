class Zombie extends GameObject {
    constructor(grid) {
        super();
        this.color = 'Violet';
        this.state = ZombieState.RIGHT;
        this.grid = grid;
        this.walkingChoices = new Array();
        this.walkingChoices.push(ZombieState.RIGHT, ZombieState.UP, ZombieState.LEFT, ZombieState.DOWN);
        window.addEventListener('step', () => this.walk());
    }
    walk() {
        switch (this.state) {
            case ZombieState.DOWN:
                if (!this.checkIfOutOfBorder(this.x, this.y + 1)) {
                    if (!this.checkCollisionWithOtherGameObjects(this.x, this.y + 1)) {
                        this.grid[this.y][this.x] = null;
                        this.y++;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
            case ZombieState.UP:
                if (!this.checkIfOutOfBorder(this.x, this.y - 1)) {
                    if (!this.checkCollisionWithOtherGameObjects(this.x, this.y - 1)) {
                        this.grid[this.y][this.x] = null;
                        this.y--;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
            case ZombieState.LEFT:
                if (!this.checkIfOutOfBorder(this.x - 1, this.y)) {
                    if (!this.checkCollisionWithOtherGameObjects(this.x - 1, this.y)) {
                        this.grid[this.y][this.x] = null;
                        this.x--;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
            case ZombieState.RIGHT:
                if (!this.checkIfOutOfBorder(this.x + 1, this.y)) {
                    if (!this.checkCollisionWithOtherGameObjects(this.x + 1, this.y)) {
                        this.grid[this.y][this.x] = null;
                        this.x++;
                        this.grid[this.y][this.x] = this;
                    }
                }
                break;
        }
    }
    checkCollisionWithOtherGameObjects(x, y) {
        let isColliding = false;
        let gameObject = this.grid[y][x];
        if (gameObject !== null) {
            let oldState = this.state;
            this.checkCollisionWithPlayer(gameObject);
            this.switchWalkingState(oldState);
        }
        return isColliding;
    }
    checkCollisionWithPlayer(gameObject) {
        if (gameObject instanceof Player) {
            this.state = ZombieState.ATTACK;
            let player = gameObject;
            if (player.health - 1 >= 0) {
                player.health = 1;
            }
        }
    }
    switchWalkingState(oldState) {
        let remainingChoices = this.walkingChoices;
        let oldStateIndex = remainingChoices.indexOf(oldState);
        remainingChoices.slice(oldStateIndex, 1);
        this.state = remainingChoices[Math.floor(Math.random() * remainingChoices.length)];
    }
    checkIfOutOfBorder(x, y) {
        let isOutOfBorder = false;
        if (x > this.grid[0].length) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }
        else if (x < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }
        else if (y > this.grid.length) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }
        else if (y < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }
        return isOutOfBorder;
    }
}
//# sourceMappingURL=Zombie.js.map