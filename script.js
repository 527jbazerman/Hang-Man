// Listen for the event that fires when the HTML page finishes loading
document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

// WORD LISTS FOR DIFFICULTY
let easyWords = ["LIONS", "JETS", "RAVENS", "EAGLES", "GIANTS"];
let mediumWords = ["PANTHERS", "VIKINGS", "FALCONS", "PATRIOTS"];
let hardWords = ["JAGUARS", "NEW YORK JETS SUCK", "Giants W"];

// GAME VARIABLES
let difficulty = "easy";

let secretWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

const maxWrong = 6;

// CHANGE DIFFICULTY
function setDifficulty(level) {
  difficulty = level;

  startGame();
}

//START GAME
function startGame() {
  let wordList;

  if (difficulty === "easy") {
    wordList = easyWords;
  }

  if (difficulty === "medium") {
    wordList = mediumWords;
  }

  if (difficulty === "hard") {
    wordList = hardWords;
  }

  let randomIndex = Math.floor(Math.random() * wordList.length);
  secretWord = wordList[randomIndex];

  guessedLetters = [];
  wrongGuesses = 0;

  document.getElementById("message").innerText = "";

  updateDisplay();
}



function updateDisplay() {
  let display = ""; // This variable will hold the string we build for the screen

  // Loop through every letter in the secret word
  // i starts at 0 because strings use zero-based indexing
  // The loop will run once for each character in the word
  for (let i = 0; i < secretWord.length; i++) {
    // Get the letter at the current position in the word
    // charAt(i) returns the character located at index i
    let letter = secretWord.charAt(i);

    // Check if this letter exists in the guessedLetters array
    // includes() returns true if the letter exists in the array
    if (guessedLetters.includes(letter)) {
      // If the letter has been guessed,
      // add the letter to the display string
      // A space is added so the letters appear spaced out
      display += letter + " ";
    } else {
      // If the letter has NOT been guessed,
      // add an underscore instead
      display += "_ ";
    }
  }
}
