class Zombie extends GameObject {
    constructor(gameObjects) {
        super();
        this.color = 'Violet';
        this.state = ZombieState.RIGHT;
        this.speed = 0.008;
        this.gameObjects = gameObjects;
        this.walkingChoices = new Array();
        this.walkingChoices.push(ZombieState.RIGHT, ZombieState.UP, ZombieState.LEFT, ZombieState.DOWN);
    }
    walk() {
        this.checkIfOutOfBorder();
        this.checkCollisionWithOtherGameObjects();
        switch (this.state) {
            case ZombieState.DOWN:
                this.y += this.speed * getCurrentFPS();
                break;
            case ZombieState.UP:
                this.y -= this.speed * getCurrentFPS();
                break;
            case ZombieState.LEFT:
                this.x -= this.speed * getCurrentFPS();
                break;
            case ZombieState.RIGHT:
                this.x += this.speed * getCurrentFPS();
                break;
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
                let oldState = this.state;
                this.checkCollisionWithPlayer(gameObject);
                this.switchWalkingState(oldState);
            }
        }
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
        console.log(remainingChoices);
        this.state = remainingChoices[Math.floor(Math.random() * remainingChoices.length)];
    }
    checkIfOutOfBorder() {
        if (this.x > window.innerWidth) {
            this.switchWalkingState(this.state);
        }
        else if (this.x < 0) {
            this.switchWalkingState(this.state);
        }
        else if (this.y > window.innerHeight) {
            this.switchWalkingState(this.state);
        }
        else if (this.y < 0) {
            this.switchWalkingState(this.state);
        }
    }
}
//# sourceMappingURL=Zombie.js.map