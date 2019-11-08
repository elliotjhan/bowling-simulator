$(document).ready(initializeApp)

function initializeApp() {
    let newGame = new CreateGame;
    newGame.initializeGame();
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
        this.strike = false;
        this.calculateCurrentTurn = this.calculateCurrentTurn.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    attachClickHandlers() {
        $('.bowlAction').click(()=>{
            this.calculateCurrentTurn();
        });
        $('.modalCloseButton').click(this.resetGame);
        $('.startGameButton').click(this.startGame);
    }

    startGame() {
        let name = $('.startInput').val();
        $('.nameHeader').text(name + " is currently playing");
        $('.startGameModal').addClass('hidden');
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
        if(this.strike === true) {
            this.score += this.pinsKnockedDown;
        }
    }

    calculateConsecutiveStrikeScoring() {
        // special scoring when strikes are bowled consecutively 
    }

    simulateFirstBowl() {
        this.generatePinsKnockedDown();
        if(this.currentPinsStanding !== 0) { // checks if the first bowl was a strike
            this.score += this.pinsKnockedDown; // add the number of pins knocked down to the score
            this.calculateSpareScoring(); // if the last frame was a spare, add current pins knocked down again
            this.calculateStrikeScoring(); // if the last frame was a strike, add the current pins knocked down again
            this.displayCurrentFrame(this.frame);
            this.firstOrSecondBowl++; 
        } else { // if the first bowl was strike then execute this code block
            this.score += this.pinsKnockedDown; // should be 10
            this.calculateStrikeScoring(); // add the pins knocked down twice if the last frame was a strike
            this.displayCurrentFrame(this.frame);
            this.strike = true; // will use this to calculate special scoring for strikes
            this.resetFrame(); // will leave the this.firstOrSecondBowl at 1 because the second bowl is skipped after a strike
        }
    }

    simulateSecondBowl() {
        this.generatePinsKnockedDown();
        this.score += this.pinsKnockedDown;
        this.calculateStrikeScoring(); // if the last frame was a strike, add the current pins knocked down again
        this.displayCurrentFrame(this.frame);
        this.strike = false; // set strike to false since this frame was not a strike   
        this.firstOrSecondBowl--; // after the second bowl is completed, decrement this.firstorsecondbowl 
        if(this.currentPinsStanding === 0) {
            this.spare = true; // will use this to calculate special scoring for spares
        } else {
            this.spare = false;
        }
        this.resetFrame(); // will always move to the next frame after the second bowl
    }

    calculateCurrentTurn() {
        if(this.firstOrSecondBowl === 1) {
            this.simulateFirstBowl();
        } else {
            this.simulateSecondBowl();
        }

        if(this.frame === 11) {
            this.displayModal();
        }
    }

    displayModal() {
        $('.finalScore').text(this.score);
        $('.endGameModalFrameContainer').append($('.frameContainer').html());
        $('.endGameModal').removeClass('hidden');
    }

    resetGame() {        
        this.frame = 1;
        this.firstOrSecondBowl = 1;
        this.score = null;
        this.spare = false;
        this.strike = false;
        this.pinsKnockedDown = null;
        this.currentPinsStanding = 10;
        $('.score').text('0');
        $('.firstBowl, .secondBowl').text('');
        $('.endGameModal').addClass('hidden');
        $('.startGameModal').removeClass('hidden');
        $('.startInput').val('');
    }

    displayScoreToScreen() {
        $('.score').text(this.score);
    }

    displayCurrentFrame(currentFrame) {
        this.displayScoreToScreen();
        if(this.firstOrSecondBowl === 1) {
            if(this.currentPinsStanding === 0) {
                this.pinsKnockedDown = "X";
            }
            $(`.frame${currentFrame} > .firstBowl`).text(this.pinsKnockedDown);
        } else {
            if(this.currentPinsStanding === 0) {
                this.pinsKnockedDown = "/";
            }
            $(`.frame${currentFrame} > .secondBowl`).text(this.pinsKnockedDown);
        }
    }
    
}

class CreateGame {

    initializeGame() {
        this.generateFrames();
    }

    generateFrames() {
        for(let i = 1; i < 11; i++){
            $('.frameContainer').append(
                $('<div>')
                    .addClass('frame frame' + i)
                    .append(
                        $('<div>').addClass('firstBowl')
                    )
                    .append(
                        $('<div>').addClass('secondBowl')     
                    )
            );
        }
        $('.frame10').append($('<div>').addClass('thirdBowl'));
    }

}


