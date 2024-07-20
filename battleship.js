var view = {
    displayMessage: function(msg) {
      var messageArea = document.getElementById("messageArea");
      messageArea.innerHTML = msg;
    },

    displayHit: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "hit");
    },

    displayMiss: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "miss");
    }
  }

  var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [ {locations: ["06", "16", "26"], hits: ["", "", ""] },
             {locations: ["24", "34", "44"], hits: ["", "", ""] },
             {locations: ["10", "11", "12"], hits: ["", "", ""] }],
    
    fire: function(guess) {
      for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
        var index = ship.locations.indexOf(guess);
        if (index >= 0) {
          ship.hits[index] = "hit";
          view.displayHit(guess);
          view.displayMessage("HIT!");
          if (this.isSunk(ship)) {
            view.displayMessage("You sank my battleship!");
            this.shipsSunk++;
          }
          return true;
        }
      }
      view.displayMiss(guess);
      view.displayMessage("You missed.");
      return false;
    },
    
    isSunk: function(ship) {
      for (var i = 0; i < this.shipLength; i++) {
        if (ship.hits[i] !== "hit") {
          return false;
        }
      }
      return true;
    },

    generateShipLocations: function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
          do {
              locations = this.generateShip();
          } while (this.colision(locations));
          this.ships[i].locations = locations;
        }
    },

    generateShip: function() {
      var direction = Math.floor(Math.random() * 2);
      var row;
      var col;
      if (direction === 1) {
        // Generate a starting location for a vertical ship
      } else {
        // Generate a starting location for a vertical ship
      }

      var newShipLocations = [];
      for (var i = 0; i < this.shipLength; i++) {
        if (direction === 1) {
          // add Location to array for new horizontal ship
        } else {
          // add Location to array for new vertical ship
        }
      }
      return newShipLocations;
    },
  }

  var controller = {
    guesses: 0,

    proccesGuess: function(guess) {
      var location = parseGuess(guess);
      if (location) {
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips) {
              view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
        }
      }
    }
  };

  function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    
    if (guess === null || guess.length !== 2) {
      alert("Opps, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
          alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
          return row + column;
        }
    }
    return null;
  }
  
  function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
  }

  window.onload = init;

  function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.proccesGuess(guess);

    guessInput.value = "";
  }

  function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if(e.keyCode === 13) {
      fireButton.click();
      return false;
    }
  }