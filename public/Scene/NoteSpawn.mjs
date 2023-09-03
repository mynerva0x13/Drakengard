let spawning = 0;
let notes = 0;
let gennote = false;
let displayNoted = false;
export class NoteSpawn {
    constructor(scene) {
        this.event = scene;
    }
    generateNote() {
        
        // this.group = scene.add.group();
        if (gennote) {
            // console.log("Notes:", spawning);

            if (displayNoted) {
                this.circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 10);
                // this.circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 10);
                this.path = this.event.add.graphics({
                    lineStyle: {
                        width: 5,
                        color: 0xffffff
                    }
                });
                
                // this.path.clear();
            }
        
            this.event.tween.add({
                target: this.circle,
                duration: 2000,
                radius: 50,

            },this)
            // spawning+= 100
            
            // Add conditions for stopping or resetting the displayNote here
            // For example, if (this.circle.radius >= someValue) { this.displayNote = false; }

        }
        // if(this.circle) {
            
        //     this.circle.radius +=  10
        //     console.log(this.circle.radius)
        //     this.path.clear();
        //     this.path.strokeCircleShape(this.circle);
        // }
    }
}
export class NoteAction {
    constructor(scene) {
        // super()
        this.scene = scene;



    }

    noteSpawn(currentBeat, event) {
        const notesTimestamps = [

            {
                timestamp: 5,
                beat: [1, 1, 0, 0]
            },

            {
                timestamp: 45,
                beat: [1, 0, 0, 0]
            },

            {
                timestamp: 53,
                beat: [1, 0, 1, 0]
            },

            {
                timestamp: 61,
                beat: [1, 0, 0, 0]
            },

            {
                timestamp: 69,
                beat: [1, 0, 1, 0]
            },

            {
                timestamp: 77,
                beat: [1, 0, 1, 0]
            },

            {
                timestamp: 85,
                beat: [1, 0, 1, 0]
            },

            {
                timestamp: 93,
                beat: [1, 0, 0, 0]
            },


            {
                timestamp: 101,
                beat: [1, 1, 1, 0]
            },

            {
                timestamp: 109,
                beat: [1, 1, 0, 1]
            },

            {
                timestamp: 117,
                beat: [1, 0, 0, 0]
            },

            {
                timestamp: 125,
                beat: [1, 1, 0, 0]
            },
        ];

        // console.log(notesTimestamps)

        let beat = currentBeat >= 1 ? ((currentBeat - 1) % 4) + 1 : 0;

        // console.log("Current Count: "+currentBeat)
        // console.log("Current Beat: "+beat)

        // spawning += 0.1
        let displayNote = false;
        for (let note of notesTimestamps) {
            if (currentBeat >= note.timestamp && currentBeat <= note.timestamp + 7) {

                spawning += 1
                if (spawning >= 8) {
                    gennote = false
                    spawning = 0
                } else {
                    gennote = true
                    // console.log(spawning)
                }
                // gennote = true;
                if (currentBeat >= note.timestamp && currentBeat <= note.timestamp + 3) {
                    if (note.beat[beat - 1] === 1) {
                        displayNote = true;
                        displayNoted = true;
                        // spawning += 0.1 

                        this.circle = new Phaser.Geom.Circle(1200 / 2, 700 / 2, 10);
                        this.path = event.add.graphics({
                            lineStyle: {
                                width: 5,
                                color: 0xffffff
                            } // Green outline color with a width of 5
                        });
                        this.path.clear()
                    }

                    break;


                }



                // event.time.addEvent({
                //     duration: 10, // Set delay to milliseconds per beat
                //     loop: false,
                //     callback: () => {
                //         this.updateCounter(event);
                //     }
                // });
                // break;

                // break;
            }
            // if (currentBeat >= note.timestamp) {

            //     // break;
            // }

        }

        return displayNote;
    }


    updateCounter() {



        // this.circle.radius += 0.3

        // console.log(this.circle.radius)
        // this.path.setDepth(-1);
        // // Draw the circle outline
        // this.path.clear()
        // this.path.strokeCircleShape(this.circle);

        console.log(spawning += 0.1);

    }
}