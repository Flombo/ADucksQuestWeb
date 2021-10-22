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
var Skull = /** @class */ (function (_super) {
    __extends(Skull, _super);
    function Skull(gameObjects) {
        var _this = _super.call(this) || this;
        _this.color = 'Red';
        _this.state = SkullState.RIGHT;
        _this.speed = 144 * 0.01;
        _this.gameObjects = gameObjects;
        window.requestAnimationFrame(function () { return _this.walk(); });
        return _this;
    }
    Skull.prototype.walk = function () {
        var _this = this;
        this.checkIfOutOfBorder();
        this.checkCollisionWithOtherGameObjects();
        if (this.state === SkullState.RIGHT) {
            this.x += this.speed;
        }
        else if (this.state === SkullState.LEFT) {
            this.x -= this.speed;
        }
        window.requestAnimationFrame(function () { return _this.walk(); });
    };
    Skull.prototype.checkCollisionWithOtherGameObjects = function () {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.checkCollisionWithOtherGameObject(this.gameObjects[i]);
        }
    };
    Skull.prototype.checkCollisionWithOtherGameObject = function (gameObject) {
        if (!(gameObject instanceof Skull)) {
            var distance = calculateDistance(this.x, gameObject.x, this.y, gameObject.y);
            if (distance <= Math.pow((gameObject.width + this.width) / 2, 2)) {
                this.switchWalkingState();
            }
        }
    };
    Skull.prototype.switchWalkingState = function () {
        if (this.state === SkullState.RIGHT) {
            this.state = SkullState.LEFT;
        }
        else if (this.state === SkullState.LEFT) {
            this.state = SkullState.RIGHT;
        }
    };
    Skull.prototype.checkIfOutOfBorder = function () {
        if (this.x >= window.innerWidth) {
            this.state = SkullState.LEFT;
        }
        else if (this.x <= 0) {
            this.state = SkullState.RIGHT;
        }
    };
    return Skull;
}(GameObject));
//# sourceMappingURL=Skull.js.map