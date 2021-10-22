class Rendering {

    public _currentFPS : number;
    private oldTimestamp : number;
    private secondsPassed : number;
    private readonly gameObjects : Array<GameObject>;
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;

    constructor(gameObjects : Array<GameObject>) {
        this.gameObjects = gameObjects;
        this.oldTimestamp = 0;
        this.secondsPassed = 0;
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.context = this.canvas.getContext('2d');
        window.requestAnimationFrame((timestamp) => {this.gameLoop(timestamp)});
    }

    private gameLoop(timestamp) {
        this.secondsPassed = (timestamp - this.oldTimestamp) / 1000;
        this.oldTimestamp = timestamp;

        this._currentFPS = Math.round(1 / this.secondsPassed);

        this.draw();
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    private draw() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject : GameObject = this.gameObjects[i];
            this.context.fillStyle = gameObject.color;
            this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        }

        console.log(this.currentFPS);
    }

    get currentFPS(): number {
        return this._currentFPS;
    }
}