document.addEventListener('DOMContentLoaded', init)

var game;
let config = {
    type: Phaser.AUTO,
    backgroundColor: 'black',
    parent: 'canvas-container',
    width: 1324,
    height: 840,
    scene: [DragAndDrop],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

function init() {
    game = new Phaser.Game(config);
}
