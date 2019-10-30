$(document).ready(initializeApp)

function initializeApp() {
    let initializeScoring = new Scoring;
}

class Scoring {
    constructor(){
        this.score = null;
        this.currentPins = 10; // initialize number of pins every frame at 10
        this.frame = 1; // tracks the current frame from 1 - 10
        this.firstOrSecondBowl = 1; // tracks if it's the first or second bowl of the current frame
        this.spare = false; 
        this.strike = false;
    }

    generatePinsKnockedDown() {
        let numberOfPinsHit = Math.floor(Math.random() * (this.pins + 1));
        this.currentPins -= numberOfPinsHit;
    }

    resetFrame() {
        this.pins = 10;
        this.frame++;
    }

    simulateFirstBowl() {
        this.generatePinsKnockedDown();
        if(this.pins !== 0) { // checks if the first bowl was a strike
            this.firstOrSecondBowl++; // if it wasn't a strike move on to the second bowl
        }
    }

    simulateSecondBowl() {
        this.generatePinsKnockedDown();
        this.firstOrSecondBowl--; // after the second bowl is completed, decrement this.firstorsecondbowl 
        this.resetFrame(); // will always move to the next frame after the second bowl
    }

    calculateCurrentScore() {
        if(this.firstOrSecondBowl === 1) {
            this.simulateFirstBowl();
        } else {
            this.simulateSecondBowl();
        }
    }


}


