/*
----------------------------------------------------------------
80s themed hangman game
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

//
// A class for the word guess game
//
class Game80s {
  constructor(remainingAttempts = 6) {
    this.started = false; // game state boolean
    this.answer = ""; // an original answer word/string
    this.ansLetters = []; // unique letters of the answer
    this.ansDisplay = []; // "_ _ _ _" on the web page
    this.numWins = 0; // the number of wins counter  
    this.remaining = remainingAttempts; // remaining attempts counter
  }

  //
  // (re-)start by initializing the variables
  //
  start(remainingGuess = this.remaining) {
    this.remaining = remainingGuess;
    this.answer = this.pickAnswer(artists);
    this.ansLetters = this.initAnswerLetters(this.answer);
    this.ansDisplay = this.initAnswerDisplay(this.answer);
    this.started = true;
  }

  //
  // Choose string from an array
  //
  pickAnswer(arrayData) {
    let numDigits = arrayData.length.toString().length;
    let ndx = Math.floor(Math.random() * 10 ** numDigits) % arrayData.length;
    return arrayData[ndx];
  }

  //
  // Initialize unique answer letters in an array, all in lower-case 
  //
  initAnswerLetters(ansStr) {
    let ansLetters = [];
    for (let i = 0; i < ansStr.length; i++) {
      let ansChar = ansStr.charAt(i).toLowerCase();
      if (/^\w$/.test(ansChar)) {
        ansLetters.push(ansChar);
      }
    }
    return new Set(ansLetters);
  }

  //
  // Initialize ansDisplay i.e. "_ _ _ _" for the web page
  // non-alphanumeric characters will be shown
  //
  initAnswerDisplay(ansStr) {
    let ansDisplay = [];
    for (let i = 0; i < ansStr.length; i++) {
      let ansChar = ansStr[i];
      ansDisplay[i] = ansChar;
      if (/\w/.test(ansChar)) {
        ansDisplay[i] = "_";
      }
    }
    return ansDisplay;
  }

  //
  // Update the game data
  // inputChar parameter should be in lower-case
  //  
  updateGameData(inputChar) {
    // Set.delete() returns true if inputChar has been deleted
    if (this.ansLetters.delete(inputChar)) {
      this.updateAnsDisplay(inputChar);
      if (this.userWon()) {
        this.numWins++;
        return true;
      }
    } else {
      this.remaining--;
    }

    return false;
  }

  //
  // Update the word displayed on the page
  //  
  updateAnsDisplay(char) {
    console.log("char: =>" + char + "<- word: " + this.answer);

    for (let i = 0; i < this.answer.length; i++) {
      if (this.answer.charAt(i).toLowerCase() === char) {
        this.ansDisplay[i] = this.answer[i];
        console.log("got " + char + "  word: " + this.ansDisplay);
      }
    }
    return this.ansDisplay;
  }

  //
  // Determine whether the user guessed all letters or not
  //
  userWon() {
    if (this.ansLetters.size == 0) {
      return true;
    }
    return false;
  }
}

//
// A class for the game web page
//
class WebElems {
  constructor(game = new Game80s()) {
    this.startMsg = document.getElementById("start");
    this.numWins = document.getElementById("num-wins");
    this.answer = document.getElementById("question");
    this.remaining = document.getElementById("remaining-guesses");
    this.guessed = document.getElementById("already-guessed");
    this.game = game;
  }

  //
  // Takes user key input
  //  
  handleKeyInput(userInput) {
    console.log("input: " + userInput);

    if (this.game.started) {
      this.startMsg.style.visibility = "hidden";

      // ignore ctrl, shift, etc. key stroke
      if (/^[\w~!@#$%^&*()_+=,.]$/.test(userInput)) {
        console.log("answer: " + this.game.answer);
        if (this.game.updateGameData(userInput.toLowerCase())) {
          this.start();
          userInput = ""; // user won, so reset
        } else {
          if (this.game.remaining === 0) {
            userInput = "";
          }
        }
        this.updatePage(userInput);
      }
    } else {
      // the very initial state or user lost
      if (this.game.remaining === 0) {
        this.startMsg.style.visibility = "hidden";
      }
      this.start();
    }
  }

  //
  // (re-)start the game
  //
  start(remainingGuess = 6) {
    this.game.start(remainingGuess);
    this.guessed.textContent = "";
    this.updatePage("");
  }

  //
  // Update the page with the game data
  //  
  updatePage(inputChar) {
    this.numWins.textContent = this.game.numWins;
    this.answer.textContent = this.game.ansDisplay.join("");
    this.remaining.textContent = this.game.remaining;
    this.guessed.textContent += inputChar.toUpperCase();

    if (this.game.remaining === 0) {
      this.showAnswer();
      this.game.started = false;
    }
  }

  //
  // User lost, so show the answer
  //
  showAnswer() {
    this.answer.textContent = this.game.answer;
    this.startMsg.style.visibility = "visible";
  }
}