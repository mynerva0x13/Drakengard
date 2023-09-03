
import {Menu} from './Scene/MenuScene.mjs';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  scene: {
    create: create,
    update: update
}
};

const game = new Phaser.Game(config);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
      game.scene.pauseAll(); // Pause all active scenes
  } else if (document.visibilityState === "visible") {
      game.scene.resumeAll(); // Resume all paused scenes
  }
});

const maxWidth = 1280; // Maximum allowed width
const aspectRatio = config.width / config.height;
let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;

if (gameWidth > maxWidth) {
  gameWidth = maxWidth;
  gameHeight = gameWidth / aspectRatio;
}

config.width = gameWidth;
config.height = gameHeight;

window.addEventListener('resize', () => {
  gameWidth = window.innerWidth;
  gameHeight = window.innerHeight;

  if (gameWidth > maxWidth) {
    gameWidth = maxWidth;
    gameHeight = gameWidth / aspectRatio;
  }

  game.config.width = gameWidth;
  game.config.height = gameHeight;

  game.resize(gameWidth, gameHeight);
});

var circle;
var graphics;
var dragon_graphic;
var dragoon;

var center = { x: 900, y: 700 / 2 };
var angle = 0; // Angle in radians
var radius = 300; // Circle radius
var lastClickTime = 0;

var bpm = 120; // Beats per minute
var beatsPerSecond = bpm / 60; // Beats per second
var initialRadiusIncrement = (100 / beatsPerSecond) / 60; // Initial increment per frame to match BPM

var wholeNoteDuration = (60 / bpm) * 4
var radiusIncrement = wholeNoteDuration * initialRadiusIncrement; // Current radius increment


function preload() {
    // Preload any assets here if needed
}

function create() {
    // Create a circle
    circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 50); // (x, y, initial radius)

    // Create a graphics object to draw shapes
    graphics = this.add.graphics({
        fillStyle: { color: 0xff0000 } // Red color
    });

    // Fill the circle with color
    graphics.fillCircleShape(circle);

    dragoon = new Phaser.Geom.Circle(
        center.x + radius * Math.cos(angle),
        center.y + radius * Math.sin(angle),
        20
    );// (x, y, initial radius)

    // Create a graphics object to draw shapes
    dragon_graphic = this.add.graphics({
        fillStyle: { color: 0x32a852 } // Red color
    });

    // Fill the circle with color
    dragon_graphic.fillCircleShape(dragoon);

    this.input.keyboard.on('keydown', handlePointerDown);


    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
   
}

function update() {
    // Update the angle to make the dragoon spin around the circle
    angle += 0.005; // Adjust the angular velocity as needed

    // Update dragoon's position on the circular path
    // dragoon.x = circle.x + radius * Math.cos(angle);
    // dragoon.y = circle.y + radius * Math.sin(angle);

    // // Clear the previous graphics and redraw the updated dragoon
    // dragon_graphic.clear();
    // dragon_graphic.fillCircleShape(dragoon);

    // // Update circle radius
    // circle.radius += radiusIncrement; // Increase the radius based on the current increment

    // // Clear the previous graphics and redraw the updated circle
    // graphics.clear();
    // graphics.fillCircleShape(circle);

 
    // console.log( circle.radius)

    
    this.scoreText.setText('Score: ' + angle);
}

function handlePointerDown(pointer) {

  if(event.key === "Enter" && lastClickTime === 1) {
    alert('Perfect Hit')
    graphics.destroy()
  }
  else {
    alert('Failed')
  }
    // var currentTime = this.time.now;
    // var timeSinceLastClick = currentTime - lastClickTime;
    // lastClickTime = currentTime;

    // var accuracy = Math.abs(timeSinceLastClick - angle * 1000); // Convert angle to milliseconds

    // if (accuracy <= 100) {
    //     console.log("Perfect hit!");
    // } else if (accuracy <= 300) {
    //     console.log("Good hit!");
    // } else {
    //     console.log("Missed!");
    // }
}
