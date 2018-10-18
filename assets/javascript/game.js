/*
----------------------------------------------------------------
TO-DO:
1. Make input match case-insensitive.
2. Handle white space in the answer word.
3. Should display the answer before resetting to the next game?
4. Make the "Press any key ..." disappear once a game starts
5. Look into javascript object syntax to re-organize the code.
----------------------------------------------------------------
*/

var data = {
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

// Variables for the game
var game = {
  aWord: "", // question/answer word
  dispWord: [], // for the word on page
  guessed: [], // already guessed characters
  remaining: 6, // remaining attempts counter
  numWins: 0 // the number of wins counter
}

// Reference to the elements
var dom = {
  numWins: undefined,
  aWord: undefined,
  remaining: undefined,
  guessed: undefined
}

//
// Get html elements
//
function getElements() {
  dom.numWins = document.getElementById("num-wins");
  dom.aWord = document.getElementById("question");
  dom.remaining = document.getElementById("remaining-guesses");
  dom.guessed = document.getElementById("already-guessed");
}

//
// Takes user key input
//  
function handleKeyInput(inputChar) {
  console.log("input: " + inputChar);
  if (game.remaining === 0 || game.aWord === "") {
    getElements();
    start();
  }
  console.log("answer: " + game.aWord);
  updateGameData(inputChar);
  updatePage();
}

//
// (re-)start by initializing the variables
//
function start(remainingGuess = 6) {
  game.guessed = [];
  game.remaining = remainingGuess;
  // game.numWins = 0;
  game.aWord = pickWord(artists);
  game.dispWord = "_".repeat(game.aWord.length).split("");
}

//
// Choose a word from an array
//
function pickWord(arrayData) {
  randNum = Math.random() / arrayData.length;
  numDigits = arrayData.length.toString().length;
  ndx = Math.floor(randNum * 10 ** numDigits);
  console.log("index = " + ndx);
  return arrayData[ndx];
}

//
// Update the game data
//  
function updateGameData(inputChar) {
  game.guessed.push(inputChar);

  if (game.aWord.includes(inputChar)) {
    updateDispWord(inputChar);
    if (isUserWon()) {
      game.numWins++;
      start();
    }
  } else {
    game.remaining -= 1;
  }
  if (game.remaining === 0) {
    start();
  }
}

//
// Update the word displayed on the page
//  
function updateDispWord(char) {
  console.log("char: " + char + "  word: " + game.aWord);
  for (var i = 0; i < game.aWord.length; i++) {
    if (game.aWord.charAt(i) === char) {
      game.dispWord[i] = char;
      // console.log("got " + char + "  word: " + game.dispWord);
    }
    if (game.aWord[i] === " ") {
      game.dispWord[i] = " ";
    }
  }
  return game.dispWord;
}

//
// TO-DO: revise because searching for "_" to determine a win is weak
//
function isUserWon() {
  if (!game.dispWord.includes("_")) {
    return true;
  }
  return false;
}

//
// Update the page with the game data
//  
function updatePage() {
  dom.numWins.textContent = game.numWins;
  dom.aWord.textContent = game.dispWord.join(" ");
  dom.remaining.textContent = game.remaining;
  dom.guessed.textContent = game.guessed.join(" ");
}
