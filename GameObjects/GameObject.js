class GameObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 30;
        this._height = 30;
        this._color = 'white';
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
}
//# sourceMappingURL=GameObject.js.map