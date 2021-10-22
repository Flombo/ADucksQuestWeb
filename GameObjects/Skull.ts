class Skull extends GameObject {

    private state : SkullState;
    private readonly speed : number;
    private readonly gameObjects : Array<GameObject>;

    constructor(gameObjects : Array<GameObject>) {
        super();
        this.color = 'Red';
        this.state = SkullState.RIGHT;
        this.speed = 0.01;
        this.gameObjects = gameObjects;
    }

    public walk() : void {
        this.checkIfOutOfBorder();
        this.checkCollisionWithOtherGameObjects();

        if (this.state === SkullState.RIGHT) {
            this.x += this.speed * getCurrentFPS();
        } else if (this.state === SkullState.LEFT) {
            this.x -= this.speed * getCurrentFPS();
        }
    }

    private checkCollisionWithOtherGameObjects() : void {
        for(let i = 0; i < this.gameObjects.length; i++){
            this.checkCollisionWithOtherGameObject(this.gameObjects[i]);
        }
    }

    private checkCollisionWithOtherGameObject(gameObject : GameObject) : void {
        if(!(gameObject instanceof Skull)) {
            let distance: number = calculateDistance(this.x, gameObject.x, this.y, gameObject.y);

            if (distance <= Math.pow((gameObject.width + this.width) / 2, 2)) {
                this.checkCollisionWithPlayer(gameObject);
                this.switchWalkingState();
            }
        }
    }

    private checkCollisionWithPlayer(gameObject : GameObject) : void {
        if(gameObject instanceof Player) {
            let oldState : SkullState = this.state;
            this.state = SkullState.ATTACK;
            let player : Player = gameObject as Player;

            if(player.health - 1 >= 0) {
                player.health = 1;
            }

            this.state = oldState;
        }
    }

    private switchWalkingState() : void {
        if(this.state === SkullState.RIGHT) {
            this.state = SkullState.LEFT;
        } else if(this.state === SkullState.LEFT) {
            this.state = SkullState.RIGHT;
        }
    }

    private checkIfOutOfBorder() : void {
        if(this.x >= window.innerWidth){
            this.state = SkullState.LEFT;
        } else if(this.x <= 0) {
            this.state = SkullState.RIGHT;
        }
    }

}