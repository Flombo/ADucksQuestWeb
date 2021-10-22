class Player extends GameObject {
    constructor(walls, stair) {
        super();
        this.walls = walls;
        this.stair = stair;
        this.canWalkUp = true;
        this.canWalkDown = true;
        this.canWalkLeft = true;
        this.canWalkRight = true;
        this.speed = 0.01;
        this._health = 3;
        window.addEventListener('keypress', (event) => this.onKeyPressed(event));
    }
    onKeyPressed(event) {
        if (event.key === 'w') {
            if (this.canWalkUp) {
                this.checkWallCollision();
                this.y -= this.speed * getCurrentFPS();
            }
        }
        if (event.key === 's') {
            if (this.canWalkDown) {
                this.checkWallCollision();
                this.y += this.speed * getCurrentFPS();
            }
        }
        if (event.key === 'a') {
            if (this.canWalkLeft) {
                this.checkWallCollision();
                this.x -= this.speed * getCurrentFPS();
            }
        }
        if (event.key === 'd') {
            if (this.canWalkRight) {
                this.checkWallCollision();
                this.x += this.speed * getCurrentFPS();
            }
        }
        this.checkStairCollision();
    }
    checkWallCollision() {
        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];
            this.canWalkUp = this.checkWallCollisionUp(wall);
            this.canWalkDown = this.checkWallCollisionDown(wall);
            this.canWalkLeft = this.checkWallCollisionLeft(wall);
            this.canWalkRight = this.checkWallCollisionRight(wall);
            if (!this.canWalkRight || !this.canWalkLeft || !this.canWalkUp || !this.canWalkDown) {
                break;
            }
        }
    }
    checkStairCollision() {
        let distance = calculateDistance(this.x, this.stair.x, this.y, this.stair.y);
        if (distance <= Math.pow((this.stair.width + this.width) / 2, 2)) {
            alert("You Won!");
        }
    }
    checkWallCollisionRight(wall) {
        let distance = calculateDistance(this.x + this.speed * getCurrentFPS(), wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }
    checkWallCollisionLeft(wall) {
        let distance = calculateDistance(this.x - this.speed * getCurrentFPS(), wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }
    checkWallCollisionDown(wall) {
        let distance = calculateDistance(this.x, wall.x, this.y + this.speed * getCurrentFPS(), wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }
    checkWallCollisionUp(wall) {
        let distance = calculateDistance(this.x, wall.x, this.y - this.speed * getCurrentFPS(), wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
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