import {
    NoteAction,
    NoteSpawn,
} from "./NoteSpawn.mjs"

var bpm = 120; // Beats per minute
var beatDuration = 60 / bpm; // Duration of one beat in seconds
var timeSinceLastBeat = 0;

var angle = 0; // Angle in radians
var radius = 300; // Circle radius
var lastClickTime = 0;
var center = {
    x: 800,
    y: 700 / 2
};
var circle; // Define the circle variable here

let dragoon;
let path;
let nextBeatTime

let path_note
let circa = []
let graphicscirc

// let notes = 
export class MainScene extends Phaser.Scene {
    constructor() {
        super()
        this.noteSpawn = new NoteAction(this);
        
        this.noteSpawner = new NoteSpawn(this);
        
        this.beatCounter = 0; // Initialize beat counter
        this.beatDuration = 60 / 120;

        this.bpm = 120;
        this.beatCounter = 0;
        this.lastTime = 0;

        this.spawnNote = false
        this.circleRadius = 50;

        this.patternIndex = 0; // Index of the pattern array
        this.isAnimating = false; // Whether the circle is currently animating
        this.circle_index = 0
    }
    create() {
        this.scoreText = this.add.text(16, 16, 'Beat Count: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

        this.song = this.sound.add("song");
        this.song.volume = 0.2;

        this.metronome = this.sound.add("metro");
        this.metronome.volume = 1;

        const TEMPO_BPM = 120;
        const MS_PER_BEAT = 60000 / TEMPO_BPM; // Calculate milliseconds per beat

        nextBeatTime = this.time.now + MS_PER_BEAT;

        this.time.addEvent({
            delay: MS_PER_BEAT, // Set delay to milliseconds per beat
            loop: true,
            callback: () => {
                this.updateCounter();
                nextBeatTime += MS_PER_BEAT;
                // console.log(nextBeatTime)
            }
        });
        this.time.addEvent({
            delay: 50, // Set delay to milliseconds per beat
            loop: true,
            callback:  () => { this.noteSpawner.generateNote() }

        });

        // this.time.addEvent({
        //     delay: MS_PER_BEAT * 4, // Set delay to milliseconds per beat
        //     loop: true,
        //     callback: () => {
        //         this.spawnAnim();
        //     }
        // });
        // let currentBeat = 0;
        // this.time.addEvent({
        //     delay: MS_PER_BEAT,
        //     loop: true,
        //     callback: () => {
        //         this.spawnAnim();
        //         currentBeat = (currentBeat + 1) % MS_PER_BEAT; // Increment beat and loop within the measure
        //     }
        // });

        this.song.play();
        this.pointingStart();
        this.dragoon();


        // this.Note_circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 10);
        // this.circleGroup = this.game.add.group();
    }
    // Initialize pattern and animation states

    update() {
       

        this.dragoon_anim();
    }


    spawnAnim() {
        this.circle_index += 0.05
        // console.log(this.circle_index)
        // this.graphics.


    }

    updateCounter() {
        if (this.song.isPlaying) {
            this.beatCounter += 1;

            this.scoreText.setText('Beat Count: ' + this.beatCounter);

            // Play the metronome sound precisely at the scheduled beat time
            const now = this.time.now;
            // if (now >= nextBeatTime - this.song.duration) {
            //     this.metronome.play();
            // }

            let executeNote = this.noteSpawn.noteSpawn(this.beatCounter,this)
            //     // Note spawning logic or other code here...  
            if (executeNote) {
                // console.log('bang')
                this.church = this.sound.add("church");
                this.church.volume = 1;
                this.church.play();
                // this.spawnNote()
                // break
                // }
            } else {
                this.spawnNote = false;
            }

        }
    }
    pointingStart() {
        circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 10); // (x, y, initial radius)

        // Create a graphics object to draw shapes
        this.graphics = this.add.graphics({
            fillStyle: {
                color: 0xff0000
            } // Red color
        });

        // Fill the circle with color
        this.graphics.fillCircleShape(circle);
    }

    dragoon() {

        path = new Phaser.Geom.Circle(
            1200 / 2,
            700 / 2,
            300
        );

        this.path = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0xffffff
            } // Green outline color with a width of 5
        });
        this.path.setDepth(-1);

        // Draw the circle outline
        this.path.strokeCircleShape(path);

        dragoon = new Phaser.Geom.Circle(
            center.x + radius * Math.cos(angle),
            center.y + radius * Math.sin(angle),
            20
        ); // (x, y, initial radius)

        // Create a graphics object to draw shapes
        this.dragon_graphic = this.add.graphics({
            fillStyle: {
                color: 0x32a852
            } // Green color
        });

        // Fill the circle with color
        this.dragon_graphic.fillCircleShape(dragoon);
    }

    dragoon_anim() {
        angle += 0.005;

        dragoon.x = circle.x + radius * Math.cos(angle);
        dragoon.y = circle.y + radius * Math.sin(angle);

        // Clear the previous graphics and redraw the updated dragoon
        this.dragon_graphic.clear();
        this.dragon_graphic.fillCircleShape(dragoon);
    }
}