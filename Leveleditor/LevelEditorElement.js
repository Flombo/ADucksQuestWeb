class LevelEditorElement extends GameObject {
    constructor() {
        super();
        this._elementCode = 'w';
        this._strokeColour = 'Lightgreen';
        this._lineWidth = 1;
        this.color = 'black';
    }
    get elementCode() {
        return this._elementCode;
    }
    set elementCode(value) {
        this._elementCode = value;
    }
    get strokeColour() {
        return this._strokeColour;
    }
    set strokeColour(value) {
        this._strokeColour = value;
    }
    get lineWidth() {
        return this._lineWidth;
    }
    set lineWidth(value) {
        this._lineWidth = value;
    }
}
//# sourceMappingURL=LevelEditorElement.js.map