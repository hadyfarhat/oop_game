class Phrase {
    /**
     * Creates a phrase
     * @param {string} phrase 
     */
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Adds letter placeholders to the display
     */
    addPhraseToDisplay() {
        const phraseLettersList = document.querySelector('div#phrase ul');
        
        for (let i = 0; i < this.phrase.length; ++i) {
            let li = document.createElement('li');
            li.textContent = this.phrase[i];
            
            if (this.phrase[i] === " ") {
                li.classList.add('space');
            } else {
                li.classList.add("hide", "letter", this.phrase[i]);
            }
            
            phraseLettersList.appendChild(li);
        }
    }
}