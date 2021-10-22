class Skull extends GameObject {
    constructor(gameObjects) {
        super();
        this.color = 'Red';
        this.state = SkullState.RIGHT;
        this.speed = 0.01;
        this.gameObjects = gameObjects;
    }
    walk() {
        this.checkIfOutOfBorder();
        this.checkCollisionWithOtherGameObjects();
        if (this.state === SkullState.RIGHT) {
            this.x += this.speed * getCurrentFPS();
        }
        else if (this.state === SkullState.LEFT) {
            this.x -= this.speed * getCurrentFPS();
        }
    }
    checkCollisionWithOtherGameObjects() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.checkCollisionWithOtherGameObject(this.gameObjects[i]);
        }
    }
    checkCollisionWithOtherGameObject(gameObject) {
        if (gameObject !== this) {
            let distance = calculateDistance(this.x, gameObject.x, this.y, gameObject.y);
            if (distance <= Math.pow((gameObject.width + this.width) / 2, 2)) {
                this.checkCollisionWithPlayer(gameObject);
                this.switchWalkingState();
            }
        }
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
    checkIfOutOfBorder() {
        if (this.x > window.innerWidth) {
            this.state = SkullState.LEFT;
        }
        else if (this.x < 0) {
            this.state = SkullState.RIGHT;
        }
    }
}
//# sourceMappingURL=Skull.js.map