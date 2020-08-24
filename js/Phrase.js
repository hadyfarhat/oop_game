class Phrase {
    /**
     * Creates a phrase
     * @param {string} phrase
     */
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Adds letter placeholders to the display.
     * Each letter is presented by an empty box, one li for each letter.
     */
    addPhraseToDisplay() {
        const phraseLettersList = document.querySelector("div#phrase ul");

        for (let i = 0; i < this.phrase.length; ++i) {
            let li = document.createElement("li");
            li.textContent = this.phrase[i];

            if (this.phrase[i] === " ") {
                li.classList.add("space");
            } else {
                li.classList.add("hide", "letter", this.phrase[i]);
            }

            phraseLettersList.appendChild(li);
        }
    }

    /**
     * Checks if the passed letter matches a letter in the phrase
     * @param {string} letter
     * @return {boolean}
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * Reveals the letter(s) on the board that matches the passed letter
     * @param {string} letter
     */
    showMatchedLetters(letter) {
        const phraseLettersList = document.querySelectorAll(
            "div#phrase li.letter"
        );
        for (let i = 0; i < phraseLettersList.length; ++i) {
            if (phraseLettersList[i].classList.contains(letter)) {
                phraseLettersList[i].classList.replace("hide", "show");
            }
        }
    }
}
