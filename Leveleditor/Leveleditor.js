let map;
let canvasLeveleditor;
let contextLeveleditor;
let oldHoveredElementY;
let oldHoveredElementX;
let currentHoveredElement;
let navHeight;
let showElementsButton;
let elementsPopup;
let resetButton;
let ySlider;
let xSlider;
let isLeftMouseButtonPressed = false;
let isRightMouseButtonPressed = false;
let pos1, pos2, pos3, pos4 = 0;
window.onload = () => {
    oldHoveredElementX = 0;
    oldHoveredElementY = 0;
    navHeight = document.getElementsByTagName('nav')[0].scrollHeight;
    showElementsButton = document.getElementById('showElementsButton');
    resetButton = document.getElementById('resetButton');
    elementsPopup = document.getElementById('elementsPopup');
    ySlider = document.getElementById('ySlider');
    xSlider = document.getElementById('xSlider');
    map = generateMap(5, 5);
    canvasLeveleditor = document.getElementsByTagName('canvas')[0];
    canvasLeveleditor.height = window.innerHeight;
    canvasLeveleditor.width = window.innerWidth;
    contextLeveleditor = canvasLeveleditor.getContext('2d');
    ySlider.addEventListener('change', () => map = generateMap(Number.parseInt(ySlider.value), Number.parseInt(xSlider.value)));
    xSlider.addEventListener('change', () => map = generateMap(Number.parseInt(ySlider.value), Number.parseInt(xSlider.value)));
    canvasLeveleditor.addEventListener('mousemove', (event) => onHover(event));
    canvasLeveleditor.addEventListener('mousedown', (event) => onCanvasMouseDown(event));
    canvasLeveleditor.oncontextmenu = (event) => {
        event.preventDefault();
        return false;
    };
    window.addEventListener('mouseup', (event) => onCanvasMouseUp(event));
    showElementsButton.addEventListener('click', onShowElementsButtonClicked);
    resetButton.addEventListener('click', resetSlider);
    dragElement();
    window.requestAnimationFrame((timestamp) => { loop(); });
};
function onCanvasMouseDown(event) {
    event.preventDefault();
    if (event.button === 0) {
        isLeftMouseButtonPressed = true;
        currentHoveredElement.color = 'white';
    }
    else if (event.button === 2) {
        isRightMouseButtonPressed = true;
        currentHoveredElement.color = 'black';
    }
}
function onCanvasMouseUp(event) {
    event.preventDefault();
    if (event.button === 0) {
        isLeftMouseButtonPressed = false;
    }
    else if (event.button === 2) {
        isRightMouseButtonPressed = false;
    }
}
function dragElement() {
    if (document.getElementById(elementsPopup.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elementsPopup.id + "header").onmousedown = dragMouseDown;
    }
    else {
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
    if (elementsPopup.className === 'hidden') {
        elementsPopup.removeAttribute('class');
    }
    else {
        elementsPopup.className = 'hidden';
    }
}
function onHover(event) {
    let clientX = event.clientX;
    let clientY = event.clientY - navHeight;
    let mapWidth = map[0].length * 30;
    let mapHeight = map.length * 30;
    if (clientY <= mapHeight && clientX <= mapWidth) {
        let y = Math.floor(clientY / 30);
        let x = Math.floor(clientX / 30);
        if (x < map[0].length && x >= 0
            && y < map.length && y >= 0) {
            map[oldHoveredElementY][oldHoveredElementX].strokeColour = 'Lightgreen';
            map[oldHoveredElementY][oldHoveredElementX].lineWidth = 1;
            currentHoveredElement = map[y][x];
            currentHoveredElement.strokeColour = 'Salmon';
            currentHoveredElement.lineWidth = 5;
            if (isLeftMouseButtonPressed) {
                currentHoveredElement.color = 'white';
            }
            else if (isRightMouseButtonPressed) {
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
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let levelEditorElement = map[y][x];
            contextLeveleditor.fillStyle = levelEditorElement.color;
            contextLeveleditor.fillRect(x * 30, y * 30, 30, 30);
            contextLeveleditor.strokeStyle = levelEditorElement.strokeColour;
            contextLeveleditor.lineWidth = levelEditorElement.lineWidth;
            contextLeveleditor.strokeRect(x * 30, y * 30, 30, 30);
        }
    }
}
function generateMap(yMax, xMax) {
    let map = new Array(yMax);
    for (let y = 0; y < yMax; y++) {
        map[y] = new Array(xMax);
        for (let x = 0; x < xMax; x++) {
            map[y][x] = new LevelEditorElement();
        }
    }
    return map;
}
//# sourceMappingURL=Leveleditor.js.map