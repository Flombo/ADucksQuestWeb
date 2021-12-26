class FOVGridBuilder {

    public static buildFOVGridBuilder(grid : Array<Array<GameObject>>, playerX : number, playerY : number, fov : number) {
        let startX : number = 0;
        let endX : number = 0;
        let startY : number = 0;
        let endY : number;
        let steps : number = 0;

        if(playerX - fov >= 0) {
            startX = playerX - fov;
        }

        //if the player positive x is out of the grid,
        // the steps need to be calculated for retrieving a fov with the player on the x-axis.
        if(playerX + fov <= grid[0].length - 1){
            endX = playerX + fov;
        } else {
            steps = this.calculateFOVMaximumSteps(grid[0].length - 1, playerX);
            endX = playerX + steps;
        }

        if(playerY - fov >= 0){
            startY = playerY - fov;
        }

        //if the player positive y is out of the grid,
        // the steps need to be calculated for retrieving a fov with the player on the y-axis
        if(playerY + fov <= grid.length -1){
            endY = playerY + fov;
        } else {
            steps = this.calculateFOVMaximumSteps(grid.length, playerY);
            endY = playerY + steps;
        }

        let fovGrid : Array<Array<GameObject>> = grid.slice(
            startY,
            endY + 1
        ).map(
            fovGridY =>
                fovGridY
                    .slice(
                        startX,
                        endX + 1
                    )
        );

        return fovGrid;
    }

    private static calculateFOVMaximumSteps(max : number, playerPosition : number) : number {
        return max % playerPosition;
    }

}