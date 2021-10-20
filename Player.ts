class Player {
    private _x : number;
    private _y : number;
    private _width : number;
    private _height : number;
    private readonly _color : string;

    constructor() {
        this._x = 0;
        this._y = 0;
        this._height = 30;
        this._width = 30;
        this._color = 'white';
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get color(): string {
        return this._color;
    }

}