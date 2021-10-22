class Zombie extends GameObject{

    private state : ZombieState;
    private readonly speed : number;
    private readonly gameObjects : Array<GameObject>;
    private readonly walkingChoices : Array<ZombieState>;

    constructor(gameObjects : Array<GameObject>) {
        super();
        this.color = 'Violet';
        this.state = ZombieState.RIGHT;
        this.speed = 0.008;
        this.gameObjects = gameObjects;
        this.walkingChoices = new Array<ZombieState>();
        this.walkingChoices.push(ZombieState.RIGHT, ZombieState.UP, ZombieState.LEFT, ZombieState.DOWN);
    }

    public walk() : void {
        this.checkIfOutOfBorder();
        this.checkCollisionWithOtherGameObjects();

        switch (this.state){
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

    private checkCollisionWithOtherGameObjects() : void {
        for(let i = 0; i < this.gameObjects.length; i++){
            this.checkCollisionWithOtherGameObject(this.gameObjects[i]);
        }
    }

    private checkCollisionWithOtherGameObject(gameObject : GameObject) : void {
        if(gameObject !== this) {
            let distance: number = calculateDistance(this.x, gameObject.x, this.y, gameObject.y);

            if (distance <= Math.pow((gameObject.width + this.width) / 2, 2)) {
                let oldState: ZombieState = this.state;
                this.checkCollisionWithPlayer(gameObject);
                this.switchWalkingState(oldState);
            }
        }
    }

    private checkCollisionWithPlayer(gameObject : GameObject) : void {
        if(gameObject instanceof Player) {
            this.state = ZombieState.ATTACK;
            let player : Player = gameObject as Player;

            if(player.health - 1 >= 0) {
                player.health = 1;
            }
        }
    }

    private switchWalkingState(oldState : ZombieState) : void {
        let remainingChoices : Array<ZombieState> = this.walkingChoices;
        let oldStateIndex : number = remainingChoices.indexOf(oldState);
        remainingChoices.slice(oldStateIndex, 1);

        console.log(remainingChoices);

        this.state = remainingChoices[Math.floor(Math.random() * remainingChoices.length)];
    }

    private checkIfOutOfBorder() : void {
        if(this.x > window.innerWidth){
            this.switchWalkingState(this.state);
        } else if(this.x < 0) {
            this.switchWalkingState(this.state);
        } else if(this.y > window.innerHeight){
            this.switchWalkingState(this.state);
        } else if(this.y < 0) {
            this.switchWalkingState(this.state);
        }
    }

}