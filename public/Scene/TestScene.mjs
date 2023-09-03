export class TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' });
    }

    create() {
        // Initialize variables and add the first circle
        this.spawn = false; // Set initial spawn state to false
        this.addCircle();

        // Listen for the spacebar keydown event
        this.input.keyboard.on("keydown-SPACE", () => {
            if (!this.spawn) {
                
            this.addCircle();
                this.spawn = true; // Set spawn to true when spacebar is pressed
            } // Set spawn to true when spacebar is pressed
        });
    }

    update() {
        // Check if spawn is true and if the circle's radius exceeds a certain value
        if (this.spawn && this.circle.radius < 400) {
            // Increase the circle's radius
            
            this.circle.radius += 10;

            // Clear the previous path and draw the updated circle
            this.path.clear();
            this.path.strokeCircleShape(this.circle);
        } else if (this.circle.radius >= 400) {
            // Reset the circle's radius and add a new circle
           
            // Reset spawn to false to prevent continuous circle creation
            this.spawn = false;
        }
    }

    addCircle() {
        // Create a new circle and update the graphics path
        this.circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 10);
        this.path = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0xffffff
            }
        });
        this.path.clear(); // Clear any previous graphics
        this.path.strokeCircleShape(this.circle);

        // Note: You may want to adjust the lineStyle and circle color here if needed.
    }
}
