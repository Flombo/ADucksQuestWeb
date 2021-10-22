var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(walls, stair) {
        var _this = _super.call(this) || this;
        _this.walls = walls;
        _this.stair = stair;
        _this.canWalkUp = true;
        _this.canWalkDown = true;
        _this.canWalkLeft = true;
        _this.canWalkRight = true;
        _this.speed = 144 * 0.01;
        window.addEventListener('keypress', function (event) { return _this.onKeyPressed(event); });
        return _this;
    }
    Player.prototype.onKeyPressed = function (event) {
        if (event.key === 'w') {
            if (this.canWalkUp) {
                this.checkWallCollision();
                this.y -= this.speed;
            }
        }
        if (event.key === 's') {
            if (this.canWalkDown) {
                this.checkWallCollision();
                this.y += this.speed;
            }
        }
        if (event.key === 'a') {
            if (this.canWalkLeft) {
                this.checkWallCollision();
                this.x -= this.speed;
            }
        }
        if (event.key === 'd') {
            if (this.canWalkRight) {
                this.checkWallCollision();
                this.x += this.speed;
            }
        }
        this.checkStairCollision();
    };
    Player.prototype.checkWallCollision = function () {
        for (var i = 0; i < this.walls.length; i++) {
            var wall_1 = this.walls[i];
            this.canWalkUp = this.checkWallCollisionUp(wall_1);
            this.canWalkDown = this.checkWallCollisionDown(wall_1);
            this.canWalkLeft = this.checkWallCollisionLeft(wall_1);
            this.canWalkRight = this.checkWallCollisionRight(wall_1);
            if (!this.canWalkRight || !this.canWalkLeft || !this.canWalkUp || !this.canWalkDown) {
                break;
            }
        }
    };
    Player.prototype.checkStairCollision = function () {
        var distance = calculateDistance(this.x, this.stair.x, this.y, this.stair.y);
        if (distance <= Math.pow((this.stair.width + this.width) / 2, 2)) {
            alert("You Won!");
        }
    };
    Player.prototype.checkWallCollisionRight = function (wall) {
        var distance = calculateDistance(this.x + this.speed, wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    };
    Player.prototype.checkWallCollisionLeft = function (wall) {
        var distance = calculateDistance(this.x - this.speed, wall.x, this.y, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    };
    Player.prototype.checkWallCollisionDown = function (wall) {
        var distance = calculateDistance(this.x, wall.x, this.y + this.speed, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    };
    Player.prototype.checkWallCollisionUp = function (wall) {
        var distance = calculateDistance(this.x, wall.x, this.y - this.speed, wall.y);
        return distance > Math.pow((wall.width + this.width) / 2, 2);
    };
    return Player;
}(GameObject));
//# sourceMappingURL=Player.js.map