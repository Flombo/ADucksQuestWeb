class Zombie extends GameObject {
    constructor(grid) {
        super();
        this.color = 'Violet';
        this.state = ZombieState.RIGHT;
        this.grid = grid;
        this.walkingChoices = [];
        this.walkingChoices.push(ZombieState.RIGHT, ZombieState.UP, ZombieState.LEFT, ZombieState.DOWN);
        window.addEventListener('step', () => this.walk());
    }
    walk() {
        switch (this.state) {
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
    switchWalkingState(oldState) {
        let remainingChoices = this.walkingChoices;
        let oldStateIndex = remainingChoices.indexOf(oldState);
        remainingChoices.slice(oldStateIndex, 1);
        this.state = remainingChoices[Math.floor(Math.random() * remainingChoices.length)];
    }
    moveZombie(newY, newX) {
        if (!this.checkIfOutOfBorder(newY, newX)) {
            if (!this.checkCollisionWithOtherGameObjects(newY, newX)) {
                let oldX = this.x;
                let oldY = this.y;
                this.y = newY;
                this.x = newX;
                this.grid[this.y][this.x] = this;
                this.grid[oldY][oldX] = null;
            }
        }
    }
    checkCollisionWithOtherGameObjects(y, x) {
        let isColliding = false;
        let gameObject = this.grid[y][x];
        if (gameObject !== null) {
            isColliding = true;
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
    checkIfOutOfBorder(y, x) {
        let isOutOfBorder = false;
        if (x > this.grid[0].length - 1) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }
        else if (x < 0) {
            isOutOfBorder = true;
            this.switchWalkingState(this.state);
        }
        else if (y > this.grid.length - 1) {
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