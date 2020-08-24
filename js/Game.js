class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.enableKeyPress = false;
    }

    /**
     * Creates 5 phrases
     * @return {Phrase[]} array of Phrases
     */
    createPhrases() {
        let phrases = [
            "Absobloodylutely",
            "Christ on a bike",
            "Bloody hell",
            "Blimey",
            "Splendid",
        ];

        let phrasesObjects = [];

        for (let i = 0; i < phrases.length; ++i) {
            phrasesObjects.push(new Phrase(phrases[i]));
        }

        return phrasesObjects;
    }

    /**
     * Randomly retrieves one of the phrases stored in the phrases array
     */
    getRandomPhrase() {
        const random = Math.floor(Math.random() * 5);
        return this.phrases[random];
    }

    /**
     * Hide overlay, choose random phrase and display it on board
     */
    startGame() {
        this.reset();
        document.querySelector("#overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.enableKeyPress = true;
    }

    /**
     * Checks to see if the player has revealed all of the letters
     * in the active phrase.
     * @return {boolean}
     */
    checkForWin() {
        const phraseLettersList = document.querySelectorAll(
            "div#phrase li.letter"
        );

        for (let i = 0; i < phraseLettersList.length; ++i) {
            if (phraseLettersList[i].classList.contains('hide')) {
                return false;
            }
        }

        return true;
    }

    /**
     * - Displays the original start screen overlay
     * - Updates the overlay h1 element with a friendly win or loss message
     * depending on the outcome.
     * @param {boolean} - if player has won or lost
     */
    gameOver(outcome) {
        const overlay = document.querySelector("#overlay");
        overlay.style.display = "";
        const h1 = document.querySelector('h1#game-over-message');

        overlay.classList.remove("start", "win", "lose");
        if (outcome) {
            h1.textContent = "You won!";
            overlay.classList.add("win");
        } else {
            h1.textContent = "You lost!";
            overlay.classList.add("lose");
        }
    }

    /**
     * - Removes a life from the scoreboard, by replacing one of
     * the liveHeart.png images with a lostHeart.png image
     * - if player missed 5 times, call game over
     */
    removeLife() {
        const hearts = document.querySelectorAll('#scoreboard img');
        hearts[this.missed].setAttribute('src', 'images/lostHeart.png');
        this.missed += 1;

        if (this.missed == 5) this.gameOver(false);
    }

    /**
     * Handles the game's logic.
     * @param {button HTML element} letter - letter being clicked
     */
    handleInteraction(letter) {
        letter.disabled = true;
        if (this.activePhrase.checkLetter(letter.textContent)) {
            letter.classList.add('chosen');
            this.activePhrase.showMatchedLetters(letter.textContent);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            letter.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * Resets the game
     */
    reset() {
        this.missed = 0;
        this.enableKeyPress = false;
        
        const phraseLettersList = document.querySelectorAll(
            "div#phrase li.letter"
        );
        for (let i = 0; i < phraseLettersList.length; ++i) {
            phraseLettersList[i].remove();
        }

        const keys = document.querySelectorAll('#qwerty button.key');
        for (let i = 0; i < keys.length; ++i) {
            keys[i].classList.remove('chosen', 'wrong');
            keys[i].disabled = false;
        }

        const hearts = document.querySelectorAll('#scoreboard img');
        for (let i = 0; i < hearts.length; ++i) {
            hearts[i].setAttribute('src', 'images/liveHeart.png');
        }
    }
}
