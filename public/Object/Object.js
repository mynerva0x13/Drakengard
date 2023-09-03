// Box.js
export default class Box extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color) {
        super(scene, x, y, width, height, color);
        scene.add.existing(this); // Add the box to the scene
    }
}
