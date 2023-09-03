import {MainScene} from './MainScene.mjs'
import {TestScene} from './TestScene.mjs'

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super()
        // this.direct = direct
    }
    preload() {
        this.load.audio("song", "/Asset/music/black_song.mp3");
        
        this.load.audio("church", "/Asset/music/church.wav");

        
        
        this.load.audio("metro", "/Asset/music/metro.ogg");
        this.progressText = this.add.text(this.cameras.main.width - 120  , this.cameras.main.height -30, 'Loading: 0%', {
            fontSize: '24px',
            fill: '#ffffff'
        });

        this.progressText.setOrigin(0.5);

        // Load more assets here...
        
        // Update progress text during loading
        this.load.on('progress', (value) => {
            this.progressText.setText(`Loading: ${(value * 100).toFixed(0)}%`);
        });

        // Load complete callback
        this.load.on('complete', () => {
            this.progressText.destroy(); // Remove the progress text
            
            if(this.direct && this.direct=='test') 
            {
                this.scene.add("TestScene", TestScene);
                this.scene.start('TestScene');
            }

            else {
                this.scene.add("MainScene", MainScene);
                this.scene.start('MainScene'); // Transition to MainScene
            }
        });
    }

}

export class TestLoadingScene extends Phaser.Scene {
    constructor() {
        super()
        // this.direct = direct
    }
    preload() {
        // this.load.audio("song", "/Asset/music/black_song.mp3");
        
        // this.load.audio("church", "/Asset/music/church.wav");

        
        
        // this.load.audio("metro", "/Asset/music/metro.ogg");
        this.progressText = this.add.text(this.cameras.main.width - 120  , this.cameras.main.height -30, 'Loading: 0%', {
            fontSize: '24px',
            fill: '#ffffff'
        });

        this.progressText.setOrigin(0.5);

        // Load more assets here...
        
        // Update progress text during loading
        this.load.on('progress', (value) => {
            this.progressText.setText(`Loading: ${(value * 100).toFixed(0)}%`);
        });

        // Load complete callback
        this.load.on('complete', () => {
            this.progressText.destroy(); // Remove the progress text
          
                this.scene.add("TestScene", TestScene);
                this.scene.start('TestScene');
            
         
        });
    }

}