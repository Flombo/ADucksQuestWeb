class LevelEditorElement extends GameObject{

    private _elementCode : string;
    private _strokeColour : string;
    private _lineWidth : number;

    constructor() {
        super();
        this._elementCode = 'w';
        this._strokeColour = 'White';
        this._lineWidth = 1;
        this.color = 'black';
    }

    get elementCode(): string {
        return this._elementCode;
    }

    set elementCode(value: string) {
        this._elementCode = value;
    }


    get strokeColour(): string {
        return this._strokeColour;
    }

    set strokeColour(value: string) {
        this._strokeColour = value;
    }


    get lineWidth(): number {
        return this._lineWidth;
    }

    set lineWidth(value: number) {
        this._lineWidth = value;
    }
}