class DragAndDrop extends Phaser.Scene {
    constructor() {
        super('DragAndDrop');
    }

    preload() {
        this.load.image('background', 'assets/images/scary.jpg');
        this.load.image('witch3', 'assets/sprites/witch3.png');
        this.load.image('witch1', 'assets/sprites/witch1.png');
        this.load.image('witch2', 'assets/sprites/witch2.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        let witch3 = this.physics.add.sprite(500, 450, 'witch3');
        witch3.setScale(0.5);
        witch3.setInteractive();
        witch3.body.setVelocity(-75, 100).setBounce(1, 1).setCollideWorldBounds(true);

        let witch1 = this.physics.add.sprite(250, 250, 'witch1');
        witch1.setInteractive();
        witch1.body.setVelocity(100, 110).setBounce(1, 1).setCollideWorldBounds(true);

        let witch2 = this.physics.add.sprite(700, 300, 'witch2');
        witch2.setScale(0.2);
        witch2.setInteractive();
        witch2.body.setVelocity(-105, -125).setBounce(1, 1).setCollideWorldBounds(true);

        this.input.on('pointerdown', this.onHold, this);
    }

    onHold(pointer, targets) {
        this.input.off('pointerdown', this.onHold, this);
        this.target = targets[0];
        this.input.on('pointermove', this.onDrag, this);
        this.input.on('pointerup', this.onGo, this);
    }
    //ondrag attribute fires when an element or text selection is being dragged
    onDrag(pointer) {
        if(typeof this.target != undefined) {
            this.target.x = pointer.x;
            this.target.y = pointer.y;
        }
    }

    onGo(pointer) {
        this.input.on('pointerdown', this.onHold, this);
        this.input.off('pointermove', this.onDrag, this);
        this.input.off('pointerup', this.onGo, this);
    }
}
