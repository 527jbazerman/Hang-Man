// Start game when page loads
document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

// Word lists for each difficulty
let easyWords = [
  "LIONS",
  "JETS",
  "RAVENS",
  "EAGLES",
  "GIANTS",
  "OBJ",
  "TJWATT",
  "REFEREE",
];

let mediumWords = ["PANTHERS", "VIKINGS", "FALCONS", "PATRIOTS", "ABDULCARTER"];

let hardWords = [
  "JAGUARS",
  "NEWYORKJETSSUCK",
  "AARONRODGERS",
  "JAXSONDART",
  "SKATTABOOOOOOO",
  "NATIONALFOOTBALLCONFERENCE",
  "AMERICANFOOTBALLCONFERENCE",
];

// Default difficulty
let difficulty = "easy";

// Game state variables
let secretWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

// Max wrong guesses allowed
const maxWrong = 6;

// Change difficulty and restart game
function setDifficulty(level) {
  difficulty = level;
  startGame();
}

// Start or reset the game
function startGame() {
  let wordList;

  // Pick word list based on difficulty
  if (difficulty === "easy") wordList = easyWords;
  if (difficulty === "medium") wordList = mediumWords;
  if (difficulty === "hard") wordList = hardWords;

  // Select random word
  let randomIndex = Math.floor(Math.random() * wordList.length);
  secretWord = wordList[randomIndex];

  // Reset guesses
  guessedLetters = [];
  wrongGuesses = 0;

  // Clear message
  document.getElementById("message").textContent = "";

  updateDisplay();
}

// Handle player letter input
function guessLetter() {
  let input = document.getElementById("letterInput").value;
  document.getElementById("letterInput").value = "";
  input = input.toUpperCase();

  // Check for single letter
  if (input.length !== 1) {
    document.getElementById("message").textContent = "Enter one letter";
    return;
  }

  // Check for valid A-Z letter
  if (input < "A" || input > "Z") {
    document.getElementById("message").textContent = "Enter a VALID letter";
    return;
  }

  // Prevent duplicate guesses
  if (guessedLetters.includes(input)) {
    document.getElementById("message").textContent =
      "You already guessed that.";
    return;
  }

  // Add guess to list
  guessedLetters.push(input);

  // Increase wrong guesses if not in word
  if (!secretWord.includes(input)) {
    wrongGuesses++;
  }

  updateDisplay();
}

// Update word display and game status
function updateDisplay() {
  let display = "";

  // Build word display with guessed letters
  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }

  // Update UI elements
  document.getElementById("wordDisplay").textContent = display;
  document.getElementById("guessedLetters").textContent =
    guessedLetters.join(" ");
  document.getElementById("guessesLeft").textContent = maxWrong - wrongGuesses;

  updateHealth();

  // Check win condition
  if (!display.includes("_")) {
    document.getElementById("message").textContent = "You Win!";
  }

  // Check lose condition
  if (wrongGuesses >= maxWrong) {
    document.getElementById("message").textContent =
      "You Lose! Word was: " + secretWord;

    // Reveal full word
    let reveal = "";
    for (let i = 0; i < secretWord.length; i++) {
      reveal += secretWord.charAt(i) + " ";
    }
    document.getElementById("wordDisplay").textContent = reveal;
  }
}

// Update heart visuals (lives)
function updateHealth() {
  const container = document.getElementById("healthContainer");
  container.innerHTML = "";

  for (let i = 0; i < maxWrong; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Empty heart if life lost
    if (i < wrongGuesses) {
      heart.classList.add("empty");
    }

    container.appendChild(heart);
  }
}

// Restart the game
function restartGame() {
  startGame();
}
