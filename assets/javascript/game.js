/*
----------------------------------------------------------------
TO-DO:
 Look into javascript object syntax to re-organize the code.
----------------------------------------------------------------
*/

const data = {
  "John Lennon": "Just Like Starting Over",
  "Blondie": "The Tide Is High",
  "Kool & The Gang": "Celebration",
  "Dolly Parton": "9 to 5",
  "Eddie Rabbit": "I Love A Rainy Night",
  "REO Speedwagon": "Keep On Loving You",
  "Blondie": "Rapture",
  "Hall & Oates": "Kiss On My List",
  "Sheena Easton": "Morning Train (Nine To Five)",
  "Kim Carnes": "Bette Davis Eyes",
  "Stars on 45": "Medley",
  "Air Supply": "The One That You Love",
  "Rick Springfield": "Jessie’s Girl",
  "Diana Ross & Lionel Richie": "Endless Love",
  "Christopher Cross": "Arthur’s Theme (Best That You Can Do)",
  "Hall & Oates": "Private Eyes",
  "Olivia Newton-John": "Physical"
}
const artists = [
  "John Lennon",
  "Blondie",
  "Kool & The Gang",
  "Dolly Parton",
  "Eddie Rabbit",
  "REO Speedwagon",
  "Blondie",
  "Hall & Oates",
  "Sheena Easton",
  "Kim Carnes",
  "Stars on 45",
  "Air Supply",
  "Rick Springfield",
  "Diana Ross & Lionel Richie",
  "Christopher Cross",
  "Hall & Oates",
  "Olivia Newton-John"
]

// letiables for the game
let game = {
  started: false,   // state of game
  answer: "",       // answer word/string
  ansLetters: [],   // unique letters for the answer
  ansDisplay: [],   // the answer for display on page
  remaining: 6,     // remaining attempts counter
  numWins: 0        // the number of wins counter
}

// Reference to the selector elements
let elem = {};

//
// Get html elements
//
function getElements() {
  elem.startMsg = document.getElementById("start");
  elem.numWins = document.getElementById("num-wins");
  elem.answer = document.getElementById("question");
  elem.remaining = document.getElementById("remaining-guesses");
  elem.guessed = document.getElementById("already-guessed");
}

//
// Takes user key input
//  
function handleKeyInput(userInput) {
  console.log("input: " + userInput);

  if (game.started) {
    elem.startMsg.style.visibility = "hidden";

    if (/^[\w~!@#$%^&*()_+=,.]$/.test(userInput)) {
      console.log("answer: " + game.answer);
      if (updateGameData(userInput.toLowerCase())) {
        userInput = "";        
      }
      updatePage(userInput);
    }
  }
  else {
    if (game.remaining === 0) {
      elem.startMsg.style.visibility = "hidden";
    }
    start();
    updatePage(userInput = "");
  }
}

//
// (re-)start by initializing the variables
//
function start(remainingGuess = 6) {
  game.remaining = remainingGuess;
  game.answer = pickAnswer(artists);
  game.ansLetters = initAnswerLetters(game.answer);
  game.ansDisplay = initAnswerDisplay(game.answer);
  elem.guessed.textContent = "";
  game.started = true;
}

//
// Choose a word from an array
//
function pickAnswer(arrayData) {
  numDigits = arrayData.length.toString().length;
  ndx = Math.floor(Math.random() * 10 ** numDigits) % arrayData.length;
  return arrayData[ndx];
}

//
// Initialize unique answer letters in an array, all in lower-case 
//
function initAnswerLetters(ansStr) {
  ansLetters = [];
  for (let i = 0; i < ansStr.length; i++ ) {
    ansChar = ansStr.charAt(i).toLowerCase();
    if (/^\w$/.test(ansChar)) {
      ansLetters.push(ansChar);
    }
  }
  return new Set(ansLetters);
}

//
// Initialize ansDisplay for the web page
//
function initAnswerDisplay(ansStr) {
  ansDisplay = [];
  for (let i = 0; i < ansStr.length; i++) {
    ansChar = ansStr[i];
    ansDisplay[i] = ansChar;
    if (/\w/.test(ansChar)) {
      ansDisplay[i] = "_";
    }
    else if (/\s/.test(ansChar)) {
      ansDisplay[i] = "      ";
    }
  }
  return ansDisplay;
}

//
// Update the game data
// inputChar parameter should be in lower-case
//  
function updateGameData(inputChar) {
  // Set.delete returns true if inputChar has been deleted
  if (game.ansLetters.delete(inputChar)) {
    updateAnsDisplay(inputChar);
    if (userWon()) {
      game.numWins++;
      start();
      return true;
    }
  }
  else {
    game.remaining--;
  }

  return false;
}

//
// Update the word displayed on the page
//  
function updateAnsDisplay(char) {
  console.log("char: =>" + char + "<- word: " + game.answer);

  for (let i = 0; i < game.answer.length; i++) {
    if (game.answer.charAt(i).toLowerCase() === char) {
      game.ansDisplay[i] = game.answer[i];
      console.log("got " + char + "  word: " + game.ansDisplay);
    }
  }
  return game.ansDisplay;
}

//
// Determin whether the user guessed all letters or not
//
function userWon() {
  if (game.ansLetters.size == 0) {
    return true;
  }
  return false;
}

//
// Update the page with the game data
//  
function updatePage(inputChar) {
  elem.numWins.textContent = game.numWins;
  elem.answer.textContent = game.ansDisplay.join("");
  elem.remaining.textContent = game.remaining;
  elem.guessed.textContent += inputChar.toUpperCase();
  if (game.remaining === 0) {
    showAnswer();
    game.started = false;
  }
}

//
// User lost, so show the answer
//
function showAnswer() {
  elem.answer.textContent = game.answer;
  elem.startMsg.style.visibility = "visible";
}
