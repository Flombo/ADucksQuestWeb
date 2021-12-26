class FOVGridBuilder {
    static buildFOVGridBuilder(grid, playerX, playerY, fov) {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY;
        let steps = 0;
        if (playerX - fov >= 0) {
            startX = playerX - fov;
        }
        //if the player positive x is out of the grid,
        // the steps need to be calculated for retrieving a fov with the player on the x-axis.
        if (playerX + fov <= grid[0].length - 1) {
            endX = playerX + fov;
        }
        else {
            steps = this.calculateFOVMaximumSteps(grid[0].length - 1, playerX);
            endX = playerX + steps;
        }
        if (playerY - fov >= 0) {
            startY = playerY - fov;
        }
        //if the player positive y is out of the grid,
        // the steps need to be calculated for retrieving a fov with the player on the y-axis
        if (playerY + fov <= grid.length - 1) {
            endY = playerY + fov;
        }
        else {
            steps = this.calculateFOVMaximumSteps(grid.length, playerY);
            endY = playerY + steps;
        }
        let fovGrid = grid.slice(startY, endY + 1).map(fovGridY => fovGridY
            .slice(startX, endX + 1));
        return fovGrid;
    }
    static calculateFOVMaximumSteps(max, playerPosition) {
        return max % playerPosition;
    }
}
//# sourceMappingURL=FOVGridBuilder.js.map