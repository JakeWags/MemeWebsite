class Gambler { //parent class for every game
  constructor(name) {
    this._name = "Gambler"; //set player name
    this._money = parseInt(localStorage.getItem("money")) || 100;
    this._bet = 10;
    this._maxBet = parseInt(localStorage.getItem("maxBet")) || 5000;
    this._maxBetCost = parseInt(localStorage.getItem("maxBetCost")) || 1000000;
  } //set money equal to whatever is stored or 100

  get money() {
    return this._money;
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
    if (this._bet >= 10 && this._isFirstRoll == true) {
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

class HiLo extends Gambler{ //HiLo game class
  constructor() {
    super(name);
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

update() {
  this.updateStorage();
  document.getElementById("numberDisplay").innerHTML = this._oldNumber;
  document.getElementById("balance").innerHTML = this._money;
  document.getElementById("newNumberValue").innerHTML = "";
  document.getElementById("currentBet").innerHTML = this._bet;
  document.getElementById("maxBetCost").innerHTML = this._maxBetCost;
  document.getElementById("currentMaxBet").innerHTML = this._maxBet;
}

makeNewGame() {
  this._oldNumber = this.generateNumber();
  this.update();
  document.getElementById("gameButton").onclick = "";
}

generateNumber() {
  return Math.floor(Math.random() * 20+1);
}

guessHigher() {
  if(this._money >= this._bet){
    this._newNumber = this.generateNumber();
    if(this._oldNumber < this._newNumber) {
      this.changeMoney(this._bet);
      this._statement = "higher.";
    } else if(this._oldNumber == this._newNumber) {
      this.changeMoney(-this._bet);
      this._statement = "equal.";
    } else {
      this.changeMoney(-this._bet);
      this._statement = "lower.";
    }
  } else {
    alert("Not enough money for that bet.");
    this.resetMyBet();
  }
  this.updateNumber();
}

guessLower() {
  if(this._money >= this._bet){
    this._newNumber = this.generateNumber();
    if(this._oldNumber > this._newNumber) {
      this.changeMoney(this._bet);
      this._statement = "lower.";
    } else if(this._oldNumber == this._newNumber) {
      this.changeMoney(-this._bet);
      this._statement = "equal.";
    } else {
      this.changeMoney(-this._bet);
      this._statement = "higher.";
    }
  } else {
    alert("Not enough money for that bet.");
    this.resetMyBet();
  }
  this.updateNumber();
}

updateNumber(){
  document.getElementById("newNumberValue").innerHTML = this._newNumber;
  document.getElementById("newNumber").innerHTML = this._statement;
  this._oldNumber = this._newNumber;
  this.update();
}
}

class Craps extends Gambler{
  constructor() {
    super();
    this._die1;
    this._die2;
    this._sumOfRoll;
    this._point;
    this._isFirstRoll = true;
    this._gameStatus = "Roll!";
    this._dieImages = [
      "https://image.flaticon.com/icons/svg/0/751.svg",
      "https://image.flaticon.com/icons/svg/0/2.svg",
      "https://image.flaticon.com/icons/svg/0/255.svg",
      "https://image.flaticon.com/icons/svg/0/963.svg",
      "https://image.flaticon.com/icons/svg/0/780.svg",
      "https://image.flaticon.com/icons/svg/0/165.svg"]
}

get die1() {
  return this._die1;
}

get die2() {
  return this._die2;
}

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

rollDice() {
  this._die1 = Math.floor(Math.random()*6+1);
  this._die2 = Math.floor(Math.random()*6+1);
  this._sumOfRoll = this._die1 + this._die2;
}

win() {
  this._gameStatus = "You win!";
  this.changeMoney(this._bet);
  this.endGame();
}

lose() {
  this._gameStatus = "You lost.";
  this.changeMoney(-this._bet);
  this.endGame();
}

endGame() {
  this.update();
  this._point = "not needed.";
  this._isFirstRoll = true;
}

play() {
  if (this._money >= this._bet) {
    if (this._isFirstRoll) { //if first roll
      this.rollDice(); //roll dice
      switch (this._sumOfRoll) {
        case 7: case 11: //if 7 or 11 (natural) player wins
          this._point;
          this.win();
          break;
          case 2: case 3: case 12: //if 2, 3, or 12, house wins
          this._point;
          this.lose();
          break;
          default:
          this._point = this._sumOfRoll;
          this._gameStatus = "A 7 loses and a " + this._point + " wins!"; //if none of these, keep going
          this._isFirstRoll = false;
          this.update();
        }
    } else {
      this.rollDice();
        if (this._sumOfRoll == this._point) {
          this.win();
        } else if (this._sumOfRoll == 7) {
          this.lose();
        } else {
          this._gameStatus = "A 7 loses and a " + this._point + " wins!";
          this.update();
        }
  }
} else {
  alert("You don't have enough money for that bet.");
  this.resetBet();
}
}
}
var p1 = new Craps(); //new craps game
var player1 = new HiLo(); //new hilo game
