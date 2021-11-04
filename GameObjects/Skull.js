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
            if (!this.checkIfOutOfBorder(this.x + 1)) {
                if (!this.checkCollisionWithOtherGameObject(this.x + 1)) {
                    this.x++;
                }
            }
        }
        else if (this.state === SkullState.LEFT) {
            if (!this.checkIfOutOfBorder(this.x - 1)) {
                if (!this.checkCollisionWithOtherGameObject(this.x - 1)) {
                    this.x--;
                }
            }
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
    switchWalkingState() {
        if (this.state === SkullState.RIGHT) {
            this.state = SkullState.LEFT;
        }
        else if (this.state === SkullState.LEFT) {
            this.state = SkullState.RIGHT;
        }
    }
    checkIfOutOfBorder(x) {
        let isOufOfBorder = false;
        if (x > this.grid[this.y].length) {
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