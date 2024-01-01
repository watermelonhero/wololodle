const clueDisplays = document.querySelectorAll(".clues li span");
const clueElements = [
    document.querySelector('.clue1'),
    document.querySelector('.clue2'),
    document.querySelector('.clue3'),
    document.querySelector('.clue4'),
    document.querySelector('.clue5')
  ];
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const guessInput = document.querySelector("input");
const guessButton = document.querySelector(".guess");
const sharedData = {};

let currentCiv, wrongGuessCount;
const maxGuesses = 5;
let currentClueIndex = 1;

const resetGame = () => {
    // Resetting all game variables and UI elements
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    gameModal.classList.remove("show");
    resetCluesOpacity(); // Reset clue opacity
    guessInput.value = "";
    currentClueIndex = 1; // Reset to show the first clue
}

const getRandomCiv = () => {
    // Selecting a random civ and the clues from the civList
    const { civilization, aoe2url, clues } = civList[Math.floor(Math.random() * civList.length)];
    currentCiv = civilization.toLowerCase();

    const { clue1, clue2, clue3, clue4, clue5 } = clues[0];

    // Randomly picks 3 random clue1 clues and storee the first clue to display
    const shuffledClue1 = [...new Set(clue1.sort(() => Math.random() - 0.3))];
    clueDisplays[0].textContent = shuffledClue1[0];
    clueDisplays[1].textContent = shuffledClue1[1];
    clueDisplays[2].textContent = shuffledClue1[2];

    sharedData.clue2 = clue2;
    sharedData.clue3 = clue3;
    sharedData.clue4 = clue4;
    sharedData.clue5 = clue5;

    resetGame();
    currentClueIndex = 3;
}

const revealNextClue = () => {

    switch (currentClueIndex) {
        case 3: // Reveal second clue from clue2
            const shuffledClue2 = [...new Set(sharedData.clue2.sort(() => Math.random() - 0.5))];
            clueDisplays[3].textContent = shuffledClue2[0];
            clueDisplays[4].textContent = shuffledClue2[1];

            // Reveal the clue by setting its opacity to 1
            clueElements[1].style.opacity = 1;
            break;

        case 4: // Reveal next clue from clue3
            const { civbonus, civuniquetech } = sharedData.clue3[0];
            clueDisplays[5].textContent = civbonus[Math.floor(Math.random() * civbonus.length)];
            clueDisplays[6].textContent = civuniquetech[Math.floor(Math.random() * civuniquetech.length)];

            // Reveal the clue by setting its opacity to 1
            clueElements[2].style.opacity = 1;

            break;

        case 5: // Reveal clue4
            // Clue4 is only 1 clue
            clueDisplays[7].textContent = sharedData.clue4[0];

            // Reveal the clue by setting its opacity to 1
            clueElements[3].style.opacity = 1;
            break;

        case 6: // Reveal clue5
            clueDisplays[8].textContent = sharedData.clue5.length === 1 ? sharedData.clue5[0] : sharedData.clue5[Math.floor(Math.random() * sharedData.clue5.length)];

            // Reveal the clue by setting its opacity to 1
            clueElements[4].style.opacity = 1;
            break;

        case 7:
            return gameOver(false)
            break;

        default:
            // No more clues to reveal
            return;
    }

    // Display the next clue and increment the index
    currentClueIndex++;
}

const gameOver = (isVictory) => {
    // After 600ms of game completion, shows modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the civilization:` : `The correct civilization was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentCiv}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const handleGuess = () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess === currentCiv) {
        return gameOver(true);
    } else {
        wrongGuessCount++;
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    }
    revealNextClue();
}

const resetCluesOpacity = () => {
    const clueElements = [
        document.querySelector('.clue1'),
        document.querySelector('.clue2'),
        document.querySelector('.clue3'),
        document.querySelector('.clue4'),
        document.querySelector('.clue5')
      ];
    clueElements.forEach((element, index) => {
        element.style.opacity = index < 1 ? 1 : 0; // Keep clue1 clues visible, hide others
    });
}

// Event listeners for guess button and play again button
guessButton.addEventListener("click", handleGuess);
playAgainBtn.addEventListener("click", getRandomCiv);

getRandomCiv(); // Start the game with a random civ