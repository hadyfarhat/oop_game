const game = new Game();

document.querySelector('#btn__reset').addEventListener('click', () => {
    game.startGame();
});

document.querySelector('#qwerty').addEventListener('click', e => {
    if (e.target.tagName == 'BUTTON') {
        game.handleInteraction(e.target);
    }
});

document.addEventListener('keyup', e => {
    if (game.enableKeyPress) {
        const keys = document.querySelectorAll('#qwerty button.key');
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i].textContent == e.code[3].toLowerCase())
                game.handleInteraction(keys[i]);
        }
    }
});
