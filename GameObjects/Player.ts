class Player extends GameObject {

    private readonly walls : Array<Wall>;
    private canWalkUp : boolean;
    private canWalkDown : boolean;
    private canWalkLeft : boolean;
    private canWalkRight : boolean;
    private readonly speed : number;
    private stair : Stair;

    constructor(walls : Array<Wall>, stair : Stair) {
        super();
        this.walls = walls;
        this.stair = stair;
        this.canWalkUp = true;
        this.canWalkDown = true;
        this.canWalkLeft = true;
        this.canWalkRight = true;
        this.speed = 144 * 0.005;
        window.addEventListener('keypress', (event : KeyboardEvent) => this.onKeyPressed(event));
    }

    private onKeyPressed(event : KeyboardEvent) {

            if(event.key === 'w'){

                if (this.canWalkUp) {
                    this.checkWallCollision();
                    this.y -= this.speed;
                }
            }

            if(event.key === 's'){
                if (this.canWalkDown) {
                    this.checkWallCollision();
                    this.y += this.speed;
                }
            }

            if(event.key === 'a'){
                if (this.canWalkLeft) {
                    this.checkWallCollision();
                    this.x -= this.speed;
                }
            }

            if(event.key === 'd'){

                if (this.canWalkRight) {
                    this.checkWallCollision();
                    this.x += this.speed;
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
        let distance : number = this.calculateDistance(this.x, this.stair.x, this.y, this.stair.y);

        if(distance <= Math.pow((this.stair.width + this.width) / 2, 2)) {
            alert("You Won!");
        }
    }

    private checkWallCollisionRight(wall : Wall) : boolean {
        let distance : number = this.calculateDistance(this.x + this.speed, wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private checkWallCollisionLeft(wall: Wall) : boolean {
        let distance : number = this.calculateDistance(this.x - this.speed, wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private checkWallCollisionDown(wall : Wall) : boolean {
        let distance : number = this.calculateDistance(this.x, wall.x, this.y + this.speed, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private checkWallCollisionUp(wall : Wall) : boolean {
        let distance : number = this.calculateDistance(this.x, wall.x, this.y - this.speed, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    }

    private calculateDistance(x1, x2, y1, y2){
        return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    }

}