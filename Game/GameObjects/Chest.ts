class Chest extends GameObject {

    private readonly grid : Array<Array<GameObject>>;

    constructor(grid : Array<Array<GameObject>>) {
        super();
        this.grid = grid;
        this.color = 'Green';
    }

    public move(newY : number, newX : number) : boolean {
        let canPlayerMoveChest : boolean = false;

        if(!this.checkIfOutOfBorder(newY, newX)){
            if(!this.checkCollision(newY, newX)) {
                let oldX : number = this.x;
                let oldY : number = this.y;

                this.x = newX;
                this.y = newY;

                this.grid[newY][newX] = this;
                this.grid[oldY][oldX] = null;

                canPlayerMoveChest = true;
            }
        }

        return canPlayerMoveChest;
    }

    private checkIfOutOfBorder(newY : number, newX : number) : boolean {
        let outOfBorder : boolean = false;

        if(newY > this.grid.length - 1) {
            outOfBorder = true;
        } else if(newY < 0) {
            outOfBorder = true;
        } else if (newX > this.grid[0].length - 1) {
            outOfBorder = true;
        } else if (newX < 0) {
            outOfBorder = true;
        }

        return outOfBorder;
    }

    private checkCollision(newY : number, newX : number) : boolean {
        let gameObject : GameObject = this.grid[newY][newX];
        let isColliding : boolean = gameObject != null;

        if(gameObject instanceof Hole) {
            this.grid[newY][newX] = null;
            this.grid[this.y][this.x] = null;
        }

        return isColliding;
    }

}