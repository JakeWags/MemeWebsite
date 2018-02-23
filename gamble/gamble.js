class Gambler { //parent class for every game
  constructor() {
    this._money = parseInt(localStorage.getItem("money")) || 100; //money is 100 or locally stored info
    this._bet = 10; //bet is set to 10
    this._maxBet = parseInt(localStorage.getItem("maxBet")) || 5000; //max bet is 5000 or locally stored info
    this._maxBetCost = parseInt(localStorage.getItem("maxBetCost")) || 1000000; //upgrade cost is 1m or locally stored info
  }

  get money() {
    return this._money;
  }

  get bet() {
    return this._bet;
  }

  get maxBet() {
    return this._maxBet;
  }

  get maxBetCost() {
    return this._maxBetCost;
  }

  restartGame() { //restart all stats
  if(confirm("Are you sure? This removes all data from every gambling game.")){
    localStorage.clear(); //removes all storage
    window.location.reload(false); //reloads window
    }
  }

  updateStorage() { //updates stored information
    localStorage.setItem("money", this._money);
    localStorage.setItem("maxBet", this._maxBet);
    localStorage.setItem("maxBetCost", this._maxBetCost);
  }

  changeMoney(change) { //change money
    this._money += change;
  }

  changeBet(amount) { //changes bet
    if (this._bet >= 10) { //if bet is above or equal to 10
      if (this._bet >= this._money && amount == 5) { //if too much money and adding 5
        alert("You can't bet more than you have.");
      } else if (amount == -5 && this._bet == 10) { //if amount is -5 and bet is 10
        alert("minimum bet is 10"); //minimum bet is 10
      } else if (amount == 5 && this._bet == this._maxBet) { //if amount is 5 and bet is equal to max bet
        alert("maximum bet is " + this._maxBet); //max bet is ____
      } else if (amount == this._money) { //if all in(max bet)
        if (amount < this._maxBet){ //if amount is less than max bet
        this._bet = amount; //bet is equal to amount changed
      } else { //else if amount is greater than or equal to the max bet
        this._bet = this._maxBet; //bet is equal to the max bet
        }
    } else { //if bet is less than amount
      this._bet += amount; //add amount to bet
  }
}
this.update(); //update display
}

  changeMaxBet() { //change max bet
    if(this._money >= this._maxBetCost) { //if enough money
    this._money -= this._maxBetCost; //max bet cost subtracted from wallet
    this._maxBet *= 10; //scale maxbet and maxbetcost by 10
    this._maxBetCost *= 10;
    this.update(); //update display
  } else { //if not enough money
    alert("You don't have enough money.");
  }
  }

  resetMyBet() { //reset bet
    this._bet = 10; //sets bet to 10
    this.update(); //updates display
  }
}

 //HiLo game class child of gambler
class HiLo extends Gambler{
  constructor() {
    super(); //calls parent constructor
    this._oldNumber;
    this._newNumber;
    this._statement;
  }

get oldNumber() {
  return this._oldNumber;
}

get newNumber() {
  return this._newNumber;
}

 //updates display
update() {
  this.updateStorage(); //updates storage
  document.getElementById("numberDisplay").innerHTML = this._oldNumber;
  document.getElementById("balance").innerHTML = this._money;
  document.getElementById("newNumberValue").innerHTML = "";
  document.getElementById("currentBet").innerHTML = this._bet;
  document.getElementById("maxBetCost").innerHTML = this._maxBetCost;
  document.getElementById("currentMaxBet").innerHTML = this._maxBet;
}

//new game
makeNewGame() {
  this._oldNumber = this.generateNumber(); //old number is equal to generated number
  this.update(); //updates display
  document.getElementById("gameButton").onclick = ""; //disables newgame button
}

//generates random number
generateNumber() {
  return Math.floor(Math.random() * 20+1); //number 1-20
}

//if higher is pressed
guessHigher() {
  if(this._money >= this._bet){ //if enough money
    this._newNumber = this.generateNumber(); //generate new number
    if(this._oldNumber < this._newNumber) { //if old is less than new (win)
      this.changeMoney(this._bet); //add bet to wallet
      this._statement = "higher."; //change statement to "higher."
    } else if(this._oldNumber == this._newNumber) { //else if old is equal to new
      this.changeMoney(-this._bet); //subtract bet from wallet
      this._statement = "equal."; //change statement to "equal."
    } else { //if old is greater than new (lose)
      this.changeMoney(-this._bet); //subtract money from wallet
      this._statement = "lower."; //change statement to "lower."
    }
  } else { //if not enough money for bet
    alert("Not enough money for that bet.");
    this.resetMyBet(); //reset bet to 10
  }
  this.updateNumber(); //updatenumber function
}

//if lower is pressed
guessLower() {
  if(this._money >= this._bet){ //if enough money
    this._newNumber = this.generateNumber(); //generate new number
    if(this._oldNumber > this._newNumber) { //if old is greater than new (win)
      this.changeMoney(this._bet); //add bet to wallet
      this._statement = "lower."; //change statement to "lower."
    } else if(this._oldNumber == this._newNumber) { //else if old is equal to new
      this.changeMoney(-this._bet); //subtract bet from wallet
      this._statement = "equal."; //change statement to "equal."
    } else { //if old is less than new (lose)
      this.changeMoney(-this._bet); //subtract bet from wallet
      this._statement = "higher."; //change statement to "higher."
    }
  } else { //if not enough money
    alert("Not enough money for that bet.");
    this.resetMyBet(); //reset bet to 10
  }
  this.updateNumber(); //updateNumber function
}

//updates number display
updateNumber(){
  document.getElementById("newNumberValue").innerHTML = this._newNumber;
  document.getElementById("newNumber").innerHTML = this._statement;
  this._oldNumber = this._newNumber; //old number is now new number
  this.update(); //update overall display
}
}

//class for craps is child of gambler
class Craps extends Gambler{
  constructor() {
    super(); //calls parent constructor
    this._point;
    this._die1;
    this._die2;
    this._sumOfRoll;
    this._isFirstRoll = true; //first roll of game
    this._gameStatus = "Roll!"; //tells the player to roll
    this._dieImages = [ //array for the die images
      "../gambleImages/dice1.svg", //1
      "../gambleImages/dice2.svg", //2
      "../gambleImages/dice3.svg", //3
      "../gambleImages/dice4.svg", //4
      "../gambleImages/dice5.svg", //5
      "../gambleImages/dice6.svg"] //6
}

get die1() {
  return this._die1;
}

get die2() {
  return this._die2;
}

get isFirstRill() {
  return this._isFirstRoll;
}

//updates display
update() {
  this.updateStorage()
  document.getElementById("display1").innerHTML = this._die1;
  document.getElementById("display2").innerHTML = this._die2;
  document.getElementById("gameStatus").innerHTML = this._gameStatus;
  document.getElementById("point").innerHTML = this._point;
  document.getElementById("balance").innerHTML = this._money;
  document.getElementById("currentBet").innerHTML = this._bet;
  document.getElementById("maxBetCost").innerHTML = this._maxBetCost;
  document.getElementById("currentMaxBet").innerHTML = this._maxBet;
  document.getElementById("die1").src = this._dieImages[this._die1 - 1];
  document.getElementById("die2").src = this._dieImages[this._die2 - 1];
}

//rolls two dice
rollDice() {
  this._die1 = Math.floor(Math.random()*6+1); //1-6
  this._die2 = Math.floor(Math.random()*6+1); //1-6
  this._sumOfRoll = this._die1 + this._die2; //adds each and sets to sumOfRoll
}

//if the player wins
win() {
  this._gameStatus = "You win!"; //displays "You win!"
  this.changeMoney(this._bet); //adds bet to wallet
  this.endGame(); //ends game
}

//if player loses
lose() {
  this._gameStatus = "You lost."; //displays "You lost."
  this.changeMoney(-this._bet); //subtracts bet from wallet
  this.endGame(); //ends game
}

//end game function
endGame() {
  this.update(); //updates display
  this._point = "not needed."; //sets point equal to "not needed."
  this._isFirstRoll = true; //resets game
}

//main play function
play() {
  if (this._money >= this._bet) { //if more money than bet amount
    if (this._isFirstRoll) { //if first roll
      this.rollDice(); //roll dice function
      switch (this._sumOfRoll) {
        case 7: case 11: //if sum is 7 or 11 (natural) player wins
          this.win(); //win function
          break; //end of case
          case 2: case 3: case 12: //if 2, 3, or 12, house wins
          this.lose(); //lose function
          break; //end of case
          default: //if none of the above
          this._point = this._sumOfRoll; //point is equal to sum
          this._gameStatus = "A 7 loses and a " + this._point + " wins!"; //if none of these, keep going
          this._isFirstRoll = false; //sets firstroll to false
          this.update(); //updates display
        }
    } else { //if not first roll
      this.rollDice(); //roll dice
        if (this._sumOfRoll == this._point) { //if sum is equal to point
          this.win(); //win function
        } else if (this._sumOfRoll == 7) { //else if sum is equal to 7
          this.lose(); //lose function
        } else { //if none of the above
          this.update(); //update display
        }
  }
} else { //if not enough money for bet
  alert("You don't have enough money for that bet.");
  this.resetBet(); //resets bet to 10
}
}
}

//Crowns game class
class Crowns extends Gambler {
  constructor() {
    super();
    this._betPlace = 0;
    this._correctCounter = 0;
    this._dice = [0, 0, 0]; //array for dice values, 0's are just placeholders
    this._dieImages = [ //array for the die images
      "../gambleImages/dice1.svg", //1
      "../gambleImages/dice2.svg", //2
      "../gambleImages/dice3.svg", //3
      "../gambleImages/dice4.svg", //4
      "../gambleImages/dice5.svg", //5
      "../gambleImages/dice6.svg"] //6
}

  update() {
    this.updateStorage();
    document.getElementById("cash").innerHTML = this._money;
    document.getElementById("currentBet").innerHTML = this._bet;
  }

  rollDice() {
    for(var i=0; i<this._dice.length; i++) {
      this._dice[i] = Math.floor(Math.random()*6+1);
      var dice = document.getElementById(i+10);
      dice.src = this._dieImages[this._dice[i] - 1];
    }
    console.log(this._dice); //debugging
  }

   setBetPlace(location) { //sets the bet place equal to whatever div is clicked
     if(this._betPlace !== 0) {
       document.getElementById(this._betPlace).style.backgroundColor = "lightgray"; //changes betplace back to light gray
     }
     this._betPlace = location; //sets betplace equal to the div selected
     document.getElementById(location).style.backgroundColor = "lightblue"; //changes new betplace to blue
     this.update(); //updates display

     console.log("bet place is: " + this._betPlace); //debugging
 }

   play() { //main game function
     if(this._betPlace != 0) { //if betplace has been chosen
       if(this._money >= this._bet) { //if enough money
         this.rollDice(); //rolls dice
         for(var i=0; i<this._dice.length; i++) { //for loop to run for each die rolled
           if(this._dice[i] == this._betPlace) { //if selected die is equal to betplace
             this.changeMoney(this._bet); //add bet to total
             this._correctCounter += 1; //add counter for number correct

             console.log(this._dice[i] + " was equal to " + this._betPlace); //debugging
           }

           else { //if not equal (debugging)
             console.log(this._dice[i] + " was not equal to " + this._betPlace); //debugging
           }
         }
         if(this._correctCounter == 0) { //if none correct

           this.changeMoney(-this._bet); //debugging
         }
       } else { //if not enough money
         alert("Not enough money");
       }
       this._correctCounter = 0; //resets correct counter
       this.update(); //updates display
    } else { //if bet place hasn't been chosen
      alert("You need to set your bet place first!");
    }
  }
}

var p1 = new Craps(); //new craps game
var player1 = new HiLo(); //new hilo game
var crownsPlayer = new Crowns(); //new crowns game
