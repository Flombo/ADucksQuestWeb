let map : Array<Array<LevelEditorElement>>;
let canvasLeveleditor : HTMLCanvasElement;
let contextLeveleditor : CanvasRenderingContext2D
let oldHoveredElementY : number;
let oldHoveredElementX : number;
let currentHoveredElement : LevelEditorElement;
let navHeight : number;
let showElementsButton : HTMLButtonElement;
let elementsPopup : HTMLDivElement;
let resetButton : HTMLButtonElement;
let ySlider : HTMLInputElement;
let xSlider : HTMLInputElement;
let isLeftMouseButtonPressed : boolean = false;
let isRightMouseButtonPressed : boolean = false;
let pos1, pos2, pos3, pos4 = 0;

window.onload = () => {
    oldHoveredElementX = 0;
    oldHoveredElementY = 0;
    navHeight = document.getElementsByTagName('nav')[0].scrollHeight;
    showElementsButton = document.getElementById('showElementsButton') as HTMLButtonElement;
    resetButton = document.getElementById('resetButton') as HTMLButtonElement;
    elementsPopup = document.getElementById('elementsPopup') as HTMLDivElement;
    ySlider = document.getElementById('ySlider') as HTMLInputElement;
    xSlider = document.getElementById('xSlider') as HTMLInputElement;
    map = generateMap(5,5);

    canvasLeveleditor = document.getElementsByTagName('canvas')[0];
    canvasLeveleditor.height = window.innerHeight;
    canvasLeveleditor.width = window.innerWidth;
    contextLeveleditor = canvasLeveleditor.getContext('2d');

    ySlider.addEventListener('change', () => map = generateMap(Number.parseInt(ySlider.value), Number.parseInt(xSlider.value)));
    xSlider.addEventListener('change', () => map = generateMap(Number.parseInt(ySlider.value), Number.parseInt(xSlider.value)));

    canvasLeveleditor.addEventListener('mousemove', (event : MouseEvent) => onHover(event));
    canvasLeveleditor.addEventListener('mousedown', (event : MouseEvent) => onCanvasMouseDown(event));
    canvasLeveleditor.oncontextmenu = (event: MouseEvent) => {
        event.preventDefault();
        return false;
    };

    window.addEventListener('mouseup', (event : MouseEvent) => onCanvasMouseUp(event));

    showElementsButton.addEventListener('click', onShowElementsButtonClicked);
    resetButton.addEventListener('click', resetSlider);

    dragElement();

    window.requestAnimationFrame((timestamp) => {loop()});
}

function onCanvasMouseDown(event : MouseEvent) {
    event.preventDefault();

    if(event.button === 0) {
        isLeftMouseButtonPressed = true;
        currentHoveredElement.color = 'white';
    } else if(event.button === 2) {
        isRightMouseButtonPressed = true;
        currentHoveredElement.color = 'black';
    }
}

function onCanvasMouseUp(event : MouseEvent) {
    event.preventDefault();

    if(event.button === 0) {
        isLeftMouseButtonPressed = false;
    } else if(event.button === 2) {
        isRightMouseButtonPressed = false;
    }
}

function dragElement() {
    if (document.getElementById(elementsPopup.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elementsPopup.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elementsPopup.onmousedown = dragMouseDown;
    }
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elementsPopup.style.top = (elementsPopup.offsetTop - pos2) + "px";
    elementsPopup.style.left = (elementsPopup.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
}

function resetSlider() {
    ySlider.value = '5';
    xSlider.value = '5';
    map = generateMap(5, 5);
}

function onShowElementsButtonClicked() {

    if(elementsPopup.className === 'hidden') {
        elementsPopup.removeAttribute('class');
    } else {
        elementsPopup.className = 'hidden';
    }
}

function onHover(event : MouseEvent) {
    let clientX : number = event.clientX;
    let clientY : number = event.clientY - navHeight;

    let mapWidth : number = map[0].length * 30;
    let mapHeight : number = map.length * 30;

    if(clientY <= mapHeight && clientX <= mapWidth) {
        let y : number = Math.floor(clientY / 30);
        let x : number = Math.floor(clientX / 30);

        if(x < map[0].length && x >= 0
            && y < map.length && y >= 0) {

            map[oldHoveredElementY][oldHoveredElementX].strokeColour = 'Lightgreen';
            map[oldHoveredElementY][oldHoveredElementX].lineWidth = 1;

            currentHoveredElement = map[y][x];
            currentHoveredElement.strokeColour = 'Salmon';
            currentHoveredElement.lineWidth = 5;

            if(isLeftMouseButtonPressed) {
                currentHoveredElement.color = 'white';
            } else if(isRightMouseButtonPressed) {
                currentHoveredElement.color = 'black';
            }

            oldHoveredElementX = x;
            oldHoveredElementY = y;
        }
    }
}

function loop() {
    drawLevelElement();
    window.requestAnimationFrame((timestamp) => loop());
}

function drawLevelElement() {
    contextLeveleditor.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let y : number = 0; y < map.length; y++) {
        for(let x: number = 0; x < map[y].length; x++) {
            let levelEditorElement : LevelEditorElement = map[y][x];

            contextLeveleditor.fillStyle = levelEditorElement.color;
            contextLeveleditor.fillRect(x * 30, y * 30, 30, 30);

            contextLeveleditor.strokeStyle = levelEditorElement.strokeColour;
            contextLeveleditor.lineWidth = levelEditorElement.lineWidth;
            contextLeveleditor.strokeRect(x * 30, y * 30, 30, 30);
        }
    }
}

function generateMap(yMax : number, xMax : number) : Array<Array<LevelEditorElement>>{
    let map : Array<Array<LevelEditorElement>> = new Array<Array<LevelEditorElement>>(yMax);

    for(let y : number = 0; y < yMax; y++) {
        map[y] = new Array<LevelEditorElement>(xMax);
        for (let x : number = 0; x < xMax; x++) {
            map[y][x] = new LevelEditorElement();
        }
    }

    return map;
}