var canvas;
var context;
var player;
var oldTimestamp;
var secondsPassed;
var fps;
window.onload = init;
function init() {
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context = canvas.getContext('2d');
    player = new Player();
    window.addEventListener('keypress', function (event) { return onKeyPressed(event); });
    window.requestAnimationFrame(gameLoop);
}
function onKeyPressed(event) {
    console.log(event.key);
    switch (event.key) {
        case 'w':
            player.y -= fps * 0.005;
            break;
        case 's':
            player.y += fps * 0.005;
            break;
        case 'a':
            player.x -= fps * 0.005;
            break;
        case 'd':
            player.x += fps * 0.005;
            break;
    }
}
function gameLoop(timestamp) {
    secondsPassed = (timestamp - oldTimestamp) / 1000;
    oldTimestamp = timestamp;
    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    draw();
    window.requestAnimationFrame(gameLoop);
}
function draw() {
    console.log('fps : ' + fps);
    context.fillStyle = 'black';
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = 'white';
    context.fillText("" + ("fps :" + fps), 0, 0);
}
//# sourceMappingURL=index.js.map