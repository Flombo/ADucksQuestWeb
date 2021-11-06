class Chest extends GameObject {
    constructor(grid) {
        super();
        this.grid = grid;
        this.color = 'Green';
    }
    move(newY, newX) {
        let canPlayerMoveChest = false;
        if (!this.checkIfOutOfBorder(newY, newX)) {
            if (!this.checkCollision(newY, newX)) {
                let oldX = this.x;
                let oldY = this.y;
                this.x = newX;
                this.y = newY;
                this.grid[newY][newX] = this;
                this.grid[oldY][oldX] = null;
                canPlayerMoveChest = true;
            }
        }
        return canPlayerMoveChest;
    }
    checkIfOutOfBorder(newY, newX) {
        let outOfBorder = false;
        if (newY > this.grid.length - 1) {
            outOfBorder = true;
        }
        else if (newY < 0) {
            outOfBorder = true;
        }
        else if (newX > this.grid[0].length - 1) {
            outOfBorder = true;
        }
        else if (newX < 0) {
            outOfBorder = true;
        }
        return outOfBorder;
    }
    checkCollision(newY, newX) {
        return this.grid[newY][newX] != null;
    }
}
//# sourceMappingURL=Chest.js.map