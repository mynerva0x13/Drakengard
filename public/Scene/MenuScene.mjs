import {
    LoadingScene,TestLoadingScene
} from "./LoadingScene.mjs";

var targetAlpha;
var duration;
var startTime;
var image

export class MenuScene extends Phaser.Scene {
    constructor() {
        super();
        this.enable_click = false
    }

    preload() {
        this.load.image("title", "/Asset/Image/Title_screen.png");
    }

    create() {
        image = this.add.image(1200 / 2, 500 / 2, 'title');
        image.setScale(0.5);

        // Set the initial alpha to 0 (fully transparent)
        image.alpha = 0;

        // Create variables to control the opacity animation
        targetAlpha = 1; // The target alpha value (fully visible)
        duration = 1000; // Duration of the animation in milliseconds
        startTime = this.time.now; // Get the current time

        // Rest of your code
        // ...

        // Keyboard input handler

        this.progressText = this.add.text(1200 / 2, 1200 / 2, 'Select any keys....', {
            fontSize: '24px',
            fill: '#ffffff'
        });
        this.progressText.alpha = 0

        this.progressText.setOrigin(0.5);

        this.event_start = false

        this.progressText_start = this.add.text(400 / 2, 1000 / 2, 'Start Game', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setInteractive();

        this.progressText_start.alpha = 0

        this.progressText_test = this.add.text(1200 / 2, 1000 / 2, 'Test', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setInteractive();
        this.progressText_test.alpha = 0

        this.input.keyboard.on("keydown-SPACE", () => {
            this.progressText.x = 2000
            this.progressText_start.alpha = 1
            this.progressText_test.alpha = 1

        });

        //     this.progressText_start.alpha = 0
        this.progressText_start.addListener('pointerdown', () => {
            // console.log('click')
            this.scene.add("LoadingScene", LoadingScene);
            this.scene.start("LoadingScene");
        });

        this.progressText_test.addListener('pointerdown', () => {
            // console.log('click')
            this.scene.add("TestLoadingScene", TestLoadingScene);
            this.scene.start("TestLoadingScene");
        });

        //     // if(this.event_start) {
        //     //     this.scene.add("LoadingScene", LoadingScene);
        //     //     this.scene.start("LoadingScene");
        //     //     this.event_start = false
        //     // }
        //     // this.progressText = this.add.text(1200 / 2, 1000 / 2, 'About', {
        //     //     fontSize: '24px',
        //     //     fill: '#ffffff'
        //     // });
        //     // this.progressText = this.add.text(1800 / 2, 1000 / 2, 'Donation', {
        //     //     fontSize: '24px',
        //     //     fill: '#ffffff'
        //     // });
        // this.input.keyboard.on("keydown-SPACE", () => {
        //     this.progressText.alpha = 0
        //     this.progressText_start.alpha = 1
        // });
    }

    update() {
        // Calculate the elapsed time
        let elapsedTime = this.time.now - startTime;

        // Update the image's alpha based on the elapsed time and duration
        if (elapsedTime <= duration) {
            let progress = elapsedTime / duration;
            image.alpha = Phaser.Math.Linear(0, targetAlpha, progress);
        } else {
            // Ensure the final alpha is reached when the animation is complete
            image.alpha = targetAlpha;
            let elapsedTime2 = this.time.now - startTime;
            // console.log(elapsedTime2)
            if (elapsedTime2 <= duration) {
                let progress2 = elapsedTime2 / duration;
                this.progressText.alpha = Phaser.Math.Linear(0, targetAlpha, progress2);
            } else {
                this.progressText.alpha = targetAlpha
                this.enable_click = true
                // console.log(this.enable_click)
            }
        }
    }
}