$(document).ready(initializeApp)

function initializeApp() {
    let scoringClass = new Scoring;
    scoringClass.attachClickHandlers();
}

class Scoring {
    constructor(){
        this.score = null;
        this.currentPinsStanding = 10; // initialize number of pins every frame at 10
        this.pinsKnockedDown = null;
        this.frame = 1; // tracks the current frame from 1 - 10
        this.firstOrSecondBowl = 1; // tracks if it's the first or second bowl of the current frame
        this.spare = false; 
        this.spareValueToCalculate = null;  
        this.strike = false;
        this.strikeValueToCalculate = null; 
        this.calculateCurrentTurn = this.calculateCurrentTurn.bind(this);
    }

    attachClickHandlers() {
        $('.bowlAction').click(this.calculateCurrentTurn);
    }

    generatePinsKnockedDown() {
        let numberOfPinsHit = Math.floor(Math.random() * (this.currentPinsStanding + 1)); // random number between 0 and number of pins standing
        this.pinsKnockedDown = numberOfPinsHit;
        this.currentPinsStanding -= numberOfPinsHit;
    }

    resetFrame() {
        this.currentPinsStanding = 10;
        this.frame++;
    }

    calculateSpareScoring() {
        if(this.spare === true) {
            this.score += this.pinsKnockedDown;
        }
    }

    calculateStrikeScoring() {
        if(this.strike = true) {
            this.score += this.pinsKnockedDown;
        }
    }

    simulateFirstBowl() {
        this.generatePinsKnockedDown();
        if(this.currentPinsStanding !== 0) { // checks if the first bowl was a strike
            this.score += this.pinsKnockedDown; // add the number of pins knocked down to the score
            this.calculateSpareScoring(); // if the last frame was a spare, add current pins knocked down again
            this.calculateStrikeScoring(); // if the last frame was a strike, add the current pins knocked down again
            this.strike = false; // set strike to false since first bowl was not a strike   
            this.firstOrSecondBowl++; // if it wasn't a strike move on to the second bowl
        } else { // if the first bowl was strike then execute this code block
            this.score += this.pinsKnockedDown; // should be 10
            this.calculateStrikeScoring();
            this.strike = true; // will use this to calculate special scoring for strikes
            this.resetFrame();
            // will leave the this.firstOrSecondBowl at 1 because the second bowl is skipped after a strike
        }
    }

    simulateSecondBowl() {
        this.generatePinsKnockedDown();
        this.score += this.pinsKnockedDown;
        this.calculateStrikeScoring(); // if the last frame was a strike, add the current pins knocked down again
        this.firstOrSecondBowl--; // after the second bowl is completed, decrement this.firstorsecondbowl 
        if(this.currentPinsStanding === 0) {
            this.spare = true; // will use this to calculate special scoring for spares
        }
        this.resetFrame(); // will always move to the next frame after the second bowl
    }

    calculateCurrentTurn() {
        if(this.firstOrSecondBowl === 1) {
            this.simulateFirstBowl();
            this.displayScoreToScreen();
        } else {
            this.simulateSecondBowl();
            this.displayScoreToScreen();
        }
    }

    displayScoreToScreen() {
        $('.score').text(this.score);
    }


}


