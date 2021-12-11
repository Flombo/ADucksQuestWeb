class Skull extends GameObject {
    constructor(grid) {
        super();
        this.color = 'Red';
        this.state = SkullState.RIGHT;
        this.grid = grid;
        window.addEventListener('step', () => this.walk());
    }
    walk() {
        if (this.state === SkullState.RIGHT) {
            this.move(this.x + 1);
        }
        else if (this.state === SkullState.LEFT) {
            this.move(this.x - 1);
        }
    }
    move(newX) {
        if (!this.checkIfOutOfBorder(newX)) {
            if (!this.checkCollisionWithOtherGameObject(newX)) {
                let oldX = this.x;
                this.x = newX;
                this.grid[this.y][this.x] = this;
                this.grid[this.y][oldX] = null;
            }
        }
    }
    switchWalkingState() {
        if (this.state === SkullState.RIGHT) {
            this.state = SkullState.LEFT;
        }
        else if (this.state === SkullState.LEFT) {
            this.state = SkullState.RIGHT;
        }
    }
    checkCollisionWithOtherGameObject(x) {
        let gameObject = this.grid[this.y][x];
        let isColliding = false;
        if (gameObject !== this && gameObject !== null) {
            isColliding = true;
            this.checkCollisionWithPlayer(gameObject);
            this.switchWalkingState();
        }
        return isColliding;
    }
    checkCollisionWithPlayer(gameObject) {
        if (gameObject instanceof Player) {
            let oldState = this.state;
            this.state = SkullState.ATTACK;
            let player = gameObject;
            if (player.health - 1 >= 0) {
                player.health = 1;
            }
            this.state = oldState;
        }
    }
    checkIfOutOfBorder(x) {
        let isOufOfBorder = false;
        if (x > this.grid[this.y].length - 1) {
            isOufOfBorder = true;
            this.state = SkullState.LEFT;
        }
        else if (x < 0) {
            isOufOfBorder = true;
            this.state = SkullState.RIGHT;
        }
        return isOufOfBorder;
    }
}
//# sourceMappingURL=Skull.js.map