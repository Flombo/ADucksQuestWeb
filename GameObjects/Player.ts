class Player extends GameObject {

    private readonly walls : Array<Wall>;
    private canWalkUp : boolean;
    private canWalkDown : boolean;
    private canWalkLeft : boolean;
    private canWalkRight : boolean;
    private readonly speed : number;
    private stair : Stair;
    private _health : number;

    constructor(walls : Array<Wall>, stair : Stair) {
        super();
        this.walls = walls;
        this.stair = stair;
        this.canWalkUp = true;
        this.canWalkDown = true;
        this.canWalkLeft = true;
        this.canWalkRight = true;
        this.speed = 0.01;
        this._health = 3;
        window.addEventListener('keypress', (event : KeyboardEvent) => this.onKeyPressed(event));
    }

    private onKeyPressed(event : KeyboardEvent) {

            if(event.key === 'w'){
                if (this.canWalkUp) {
                    this.checkWallCollision();
                    this.y -= this.speed * getCurrentFPS();
                }
            }

            if(event.key === 's'){
                if (this.canWalkDown) {
                    this.checkWallCollision();
                    this.y += this.speed * getCurrentFPS();
                }
            }

            if(event.key === 'a'){
                if (this.canWalkLeft) {
                    this.checkWallCollision();
                    this.x -= this.speed * getCurrentFPS();
                }
            }

            if(event.key === 'd'){
                if (this.canWalkRight) {
                    this.checkWallCollision();
                    this.x += this.speed * getCurrentFPS();
                }
            }

            this.checkStairCollision();
    }

    private checkWallCollision() : void {

        for(let i = 0; i < this.walls.length; i++) {

            let wall: Wall = this.walls[i];

            this.canWalkUp = this.checkWallCollisionUp(wall);
            this.canWalkDown = this.checkWallCollisionDown(wall);
            this.canWalkLeft = this.checkWallCollisionLeft(wall);
            this.canWalkRight = this.checkWallCollisionRight(wall);

            if(!this.canWalkRight || !this.canWalkLeft || !this.canWalkUp || !this.canWalkDown){
                break;
            }
        }
    }

    private checkStairCollision() : void  {
        let distance : number = calculateDistance(this.x, this.stair.x, this.y, this.stair.y);

        if(distance <= Math.pow((this.stair.width + this.width) / 2, 2)) {
            alert("You Won!");
        }
    }

    private checkWallCollisionRight(wall : Wall) : boolean {
        let distance : number = calculateDistance(this.x + this.speed * getCurrentFPS(), wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private checkWallCollisionLeft(wall: Wall) : boolean {
        let distance : number = calculateDistance(this.x - this.speed * getCurrentFPS(), wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private checkWallCollisionDown(wall : Wall) : boolean {
        let distance : number = calculateDistance(this.x, wall.x, this.y + this.speed * getCurrentFPS(), wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private checkWallCollisionUp(wall : Wall) : boolean {
        let distance : number = calculateDistance(this.x, wall.x, this.y - this.speed * getCurrentFPS(), wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }


    get health(): number {
        return this._health;
    }

    set health(value: number) {
        if(this._health - value >= 0) {
            this._health -= value;
        }
    }
}