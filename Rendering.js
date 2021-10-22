var Rendering = /** @class */ (function () {
    function Rendering(gameObjects) {
        var _this = this;
        this.gameObjects = gameObjects;
        this.oldTimestamp = 0;
        this.secondsPassed = 0;
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.context = this.canvas.getContext('2d');
        window.requestAnimationFrame(function (timestamp) { _this.gameLoop(timestamp); });
    }
    Rendering.prototype.gameLoop = function (timestamp) {
        var _this = this;
        this.secondsPassed = (timestamp - this.oldTimestamp) / 1000;
        this.oldTimestamp = timestamp;
        this._currentFPS = Math.round(1 / this.secondsPassed);
        this.draw();
        window.requestAnimationFrame(function (timestamp) { return _this.gameLoop(timestamp); });
    };
    Rendering.prototype.draw = function () {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0; i < this.gameObjects.length; i++) {
            var gameObject = this.gameObjects[i];
            this.context.fillStyle = gameObject.color;
            this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        }
    };
    Object.defineProperty(Rendering.prototype, "currentFPS", {
        get: function () {
            return this._currentFPS;
        },
        enumerable: false,
        configurable: true
    });
    return Rendering;
}());
//# sourceMappingURL=Rendering.js.map