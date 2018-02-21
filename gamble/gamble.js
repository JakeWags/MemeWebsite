class Gambler { //parent class for every game
  constructor(name) {
    this._money = parseInt(localStorage.getItem("money")) || 100;
    this._bet = 10;
    this._maxBet = parseInt(localStorage.getItem("maxBet")) || 5000;
    this._maxBetCost = parseInt(localStorage.getItem("maxBetCost")) || 1000000;
  } //set money equal to whatever is stored or 100

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

  updateStorage() {
    localStorage.setItem("money", this._money);
    localStorage.setItem("maxBet", this._maxBet);
    localStorage.setItem("maxBetCost", this._maxBetCost);
  }

  changeMoney(change) {
    this._money += change;
    this.update();
  }

  changeBet(amount) {
    if (this._bet >= 10) {
      if (this._bet >= this._money && amount == 5) {
        alert("You can't bet more than you have.");
      } else if (amount == -5 && this._bet == 10) {
        alert("minimum bet is 10");
      } else if (amount == 5 && this._bet == this._maxBet) {
        alert("maximum bet is " + this._maxBet);
      } else if (amount == this._money) {
        if (amount < this._maxBet){
        this._bet = amount;
        } else {
        this._bet = this._maxBet;
        }
        this.update();
      } else {
      this._bet += amount;
      this.update();
  }}}

  changeMaxBet() {
    if(this._money >= this._maxBetCost) {
    this._money -= this._maxBetCost;
    this._maxBet *= 10;
    this._maxBetCost *= 10;
    this.update();
  } else {
    alert("You don't have enough money.");
  }
  }

  resetMyBet() {
    this._bet = 10;
    this.update();
  }
}

class HiLo extends Gambler{ //HiLo game class child of gambler
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

update() { //updates display
  this.updateStorage(); //updates storage
  document.getElementById("numberDisplay").innerHTML = this._oldNumber;
  document.getElementById("balance").innerHTML = this._money;
  document.getElementById("newNumberValue").innerHTML = "";
  document.getElementById("currentBet").innerHTML = this._bet;
  document.getElementById("maxBetCost").innerHTML = this._maxBetCost;
  document.getElementById("currentMaxBet").innerHTML = this._maxBet;
}

makeNewGame() { //new game
  this._oldNumber = this.generateNumber(); //old number is equal to generated number
  this.update(); //updates display
  document.getElementById("gameButton").onclick = ""; //disables newgame button
}

generateNumber() { //generates random number
  return Math.floor(Math.random() * 20+1); //number 1-20
}

guessHigher() { //if higher is pressed
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

guessLower() { //if lower is pressed
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

updateNumber(){ //updates number display
  document.getElementById("newNumberValue").innerHTML = this._newNumber;
  document.getElementById("newNumber").innerHTML = this._statement;
  this._oldNumber = this._newNumber; //old number is now new number
  this.update(); //update overall display
}
}

class Craps extends Gambler{ //class for craps is child of gambler
  constructor() {
    super(); //calls parent constructor
    this._die1;
    this._die2;
    this._sumOfRoll;
    this._point;
    this._isFirstRoll = true; //first roll of game
    this._gameStatus = "Roll!"; //tells the player to roll
    this._dieImages = [ //array for the die images
      "https://image.flaticon.com/icons/svg/0/751.svg", //1
      "https://image.flaticon.com/icons/svg/0/2.svg", //2
      "https://image.flaticon.com/icons/svg/0/255.svg", //3
      "https://image.flaticon.com/icons/svg/0/963.svg", //4
      "https://image.flaticon.com/icons/svg/0/780.svg", //5
      "https://image.flaticon.com/icons/svg/0/165.svg"] //6
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

update() { //updates display
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

rollDice() { //rolls the dice
  this._die1 = Math.floor(Math.random()*6+1); //1-6
  this._die2 = Math.floor(Math.random()*6+1); //1-6
  this._sumOfRoll = this._die1 + this._die2; //adds each and sets to sumOfRoll
}

win() {  //if the player wins
  this._gameStatus = "You win!"; //displays "You win!"
  this.changeMoney(this._bet); //adds bet to wallet
  this.endGame(); //ends game
}

lose() { //if player loses
  this._gameStatus = "You lost."; //displays "You lost."
  this.changeMoney(-this._bet); //subtracts bet from wallet
  this.endGame(); //ends game
}

endGame() { //end game function
  this.update(); //updates display
  this._point = "not needed."; //sets point equal to "not needed."
  this._isFirstRoll = true; //resets game
}

play() { //main play function
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
var p1 = new Craps(); //new craps game
var player1 = new HiLo(); //new hilo game
