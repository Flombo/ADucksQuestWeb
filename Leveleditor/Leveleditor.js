class Leveleditor {
    constructor() {
        this.isLeftMouseButtonPressed = false;
        this.isRightMouseButtonPressed = false;
        this.oldHoveredElementX = 0;
        this.oldHoveredElementY = 0;
        this.navHeight = document.getElementsByTagName('nav')[0].scrollHeight;
        this.showElementsButton = document.getElementById('showElementsButton');
        this.resetButton = document.getElementById('resetButton');
        this.elementsPopup = document.getElementById('elementsPopup');
        this.ySlider = document.getElementById('ySlider');
        this.xSlider = document.getElementById('xSlider');
        this.ySliderInput = document.getElementById('ySliderInput');
        this.xSliderInput = document.getElementById('xSliderInput');
        this.map = this.generateMap(5, 5);
        this.canvasLeveleditor = document.getElementsByTagName('canvas')[0];
        this.canvasLeveleditor.height = window.innerHeight;
        this.canvasLeveleditor.width = window.innerWidth;
        this.contextLeveleditor = this.canvasLeveleditor.getContext('2d');
        this.ySlider.addEventListener('change', () => this.onSliderChanged());
        this.xSlider.addEventListener('change', () => this.onSliderChanged());
        this.ySliderInput.addEventListener('change', () => this.onSliderInputChanged());
        this.xSliderInput.addEventListener('change', () => this.onSliderInputChanged());
        this.canvasLeveleditor.addEventListener('mousemove', (event) => this.onHover(event));
        this.canvasLeveleditor.addEventListener('mousedown', (event) => this.onCanvasMouseDown(event));
        this.canvasLeveleditor.oncontextmenu = (event) => {
            event.preventDefault();
            return false;
        };
        window.addEventListener('mouseup', (event) => this.onCanvasMouseUp(event));
        window.addEventListener('resize', () => this.calcCellDimensions(this.map));
        this.showElementsButton.addEventListener('click', () => this.onShowElementsButtonClicked());
        this.resetButton.addEventListener('click', () => this.resetSlider());
        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
    onSliderInputChanged() {
        this.xSlider.value = this.xSliderInput.value;
        this.ySlider.value = this.ySliderInput.value;
        this.onSliderChanged();
    }
    onSliderChanged() {
        this.xSliderInput.value = this.xSlider.value;
        this.ySliderInput.value = this.ySlider.value;
        this.map = this.generateMap(Number.parseInt(this.ySlider.value), Number.parseInt(this.xSlider.value));
    }
    onCanvasMouseDown(event) {
        event.preventDefault();
        if (event.button === 0) {
            this.isLeftMouseButtonPressed = true;
            this.setCurrentHoveredElementColour('white');
        }
        else if (event.button === 2) {
            this.isRightMouseButtonPressed = true;
            this.setCurrentHoveredElementColour('black');
        }
    }
    setCurrentHoveredElementColour(colour) {
        if (this.currentHoveredElement !== undefined) {
            this.currentHoveredElement.color = colour;
        }
    }
    onCanvasMouseUp(event) {
        event.preventDefault();
        if (event.button === 0) {
            this.isLeftMouseButtonPressed = false;
        }
        else if (event.button === 2) {
            this.isRightMouseButtonPressed = false;
        }
    }
    resetSlider() {
        this.ySlider.value = '5';
        this.xSlider.value = '5';
        this.xSliderInput.value = '5';
        this.ySliderInput.value = '5';
        this.map = this.generateMap(5, 5);
    }
    onShowElementsButtonClicked() {
        if (this.elementsPopup.className === 'hidden') {
            this.elementsPopup.removeAttribute('class');
        }
        else {
            this.elementsPopup.className = 'hidden';
        }
    }
    onHover(event) {
        let clientX = event.clientX;
        let clientY = event.clientY - this.navHeight;
        let mapWidth = this.map[0].length * this.cellWidth;
        let mapHeight = this.map.length * this.cellHeight;
        if (clientY <= mapHeight && clientX <= mapWidth) {
            let y = Math.floor(clientY / this.cellHeight);
            let x = Math.floor(clientX / this.cellWidth);
            if (x < this.map[0].length && x >= 0
                && y < this.map.length && y >= 0) {
                this.map[this.oldHoveredElementY][this.oldHoveredElementX].strokeColour = 'White';
                this.map[this.oldHoveredElementY][this.oldHoveredElementX].lineWidth = 1;
                this.currentHoveredElement = this.map[y][x];
                this.currentHoveredElement.strokeColour = 'Salmon';
                this.currentHoveredElement.lineWidth = 5;
                if (this.isLeftMouseButtonPressed) {
                    this.currentHoveredElement.color = 'white';
                }
                else if (this.isRightMouseButtonPressed) {
                    this.currentHoveredElement.color = 'black';
                }
                this.oldHoveredElementX = x;
                this.oldHoveredElementY = y;
            }
        }
    }
    loop() {
        this.drawLevelElement();
        window.requestAnimationFrame(() => this.loop());
    }
    drawLevelElement() {
        this.contextLeveleditor.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                let levelEditorElement = this.map[y][x];
                this.contextLeveleditor.fillStyle = levelEditorElement.color;
                this.contextLeveleditor.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                this.contextLeveleditor.strokeStyle = levelEditorElement.strokeColour;
                this.contextLeveleditor.lineWidth = levelEditorElement.lineWidth;
                this.contextLeveleditor.strokeRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }
    }
    generateMap(yMax, xMax) {
        let map = new Array(yMax);
        for (let y = 0; y < yMax; y++) {
            map[y] = new Array(xMax);
            for (let x = 0; x < xMax; x++) {
                map[y][x] = new LevelEditorElement();
            }
        }
        this.calcCellDimensions(map);
        return map;
    }
    calcCellDimensions(map) {
        this.cellHeight = (window.innerHeight - this.navHeight) / map.length;
        this.cellWidth = window.innerWidth / map[0].length;
    }
}
//# sourceMappingURL=Leveleditor.js.map