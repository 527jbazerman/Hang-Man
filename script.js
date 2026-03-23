document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

// WORD LISTS FOR DIFFICULTY
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
  "AARONRODGERS ",
  "JAXSONDART",
  "SKATTABOOOOOOO",
  "NATIONALFOOTBALLCONFERENCE",
  "AMERICANFOOTBALLCONFERENCE",
];

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

// START GAME
function startGame() {
  let wordList;

  if (difficulty === "easy") wordList = easyWords;
  if (difficulty === "medium") wordList = mediumWords;
  if (difficulty === "hard") wordList = hardWords;

  let randomIndex = Math.floor(Math.random() * wordList.length);
  secretWord = wordList[randomIndex];

  guessedLetters = [];
  wrongGuesses = 0;

  document.getElementById("message").textContent = "";

  updateDisplay();
}

// GUESS LETTER
function guessLetter() {
  let input = document.getElementById("letterInput").value;

  document.getElementById("letterInput").value = "";

  input = input.toUpperCase();

  if (input.length !== 1) {
    document.getElementById("message").textContent = "Enter one letter";
    return;
  }

  if (input < "A" || input > "Z") {
    document.getElementById("message").textContent = "Enter a VALID letter";
    return;
  }

  if (guessedLetters.includes(input)) {
    document.getElementById("message").textContent =
      "You already guessed that.";
    return;
  }

  guessedLetters.push(input);

  if (!secretWord.includes(input)) {
    wrongGuesses++;
  }

  updateDisplay();
}

// UPDATE DISPLAY
function updateDisplay() {
  let display = "";

  // required loop
  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);

    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }

  document.getElementById("wordDisplay").textContent = display;
  document.getElementById("guessedLetters").textContent =
    guessedLetters.join(" ");

  let guessesLeft = maxWrong - wrongGuesses;
  document.getElementById("guessesLeft").textContent = guessesLeft;

  // used AI for health bar only way it could work
  // health bar decreases when wrong guesses increase
  let healthPercent = (guessesLeft / maxWrong) * 100;
  document.getElementById("healthBar").style.width = healthPercent + "%";

  // WIN
  if (!display.includes("_")) {
    document.getElementById("message").textContent = "You Win!";
  }

  // LOSE
  if (wrongGuesses >= maxWrong) {
    document.getElementById("message").textContent =
      "You Lose! Word was: " + secretWord;

    // used AI for this
    // reveal the full word and remove underscores
    let reveal = "";

    for (let i = 0; i < secretWord.length; i++) {
      reveal += secretWord.charAt(i) + " ";
    }

    document.getElementById("wordDisplay").textContent = reveal;
  }
}

// RESTART
function restartGame() {
  startGame();
}
