$(document).ready(initializeApp)

function initializeApp() {

}

class Scoring {
    constructor(){
        this.score = null;
        this.pins = 10;
        this.turn = 1;
        
    }

    generatePinsKnockedDown() {
        let bowl = Math.floor(Math.random() * this.pins + 1);
        this.pins -= bowl;
    }



}
