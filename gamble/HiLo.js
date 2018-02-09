
class HiLo {
  constructor() {
    this._oldNumber;
    this._newNumber;
    this._money = parseInt(localStorage.getItem("money")) || 100;
    this._statement;
    this._bet = 10;
    this._maxBet = parseInt(localStorage.getItem("maxBet")) || 5000;
    this._maxBetCost = parseInt(localStorage.getItem("maxBetCost")) || 1000000;
  }

get oldNumber() {
  return this._oldNumber;
}
get newNumber() {
  return this._newNumber;
}
get money() {
  return this._money;
}
restartGame() {
  if(confirm("Are you sure?")){
    localStorage.clear();
    window.location.reload(false);
  }
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
updateStorage() {
  localStorage.setItem("money", this._money);
  localStorage.setItem("maxBet", this._maxBet);
  localStorage.setItem("maxBetCost", this._maxBetCost);
}
changeMoney(change) {
  this._money += change;
  this.update();
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
    } else if(this._oldNumber === this._newNumber) {
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
};
guessLower() {
  if(this._money >= this._bet){
    this._newNumber = this.generateNumber();
    if(this._oldNumber > this._newNumber) {
      this.changeMoney(this._bet);
      this._statement = "lower.";
    } else if(this._oldNumber === this._newNumber) {
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
};
updateNumber(){
  document.getElementById("newNumberValue").innerHTML = this._newNumber;
  document.getElementById("newNumber").innerHTML = this._statement;
  this._oldNumber = this._newNumber;
  this.update();
}
changeBet(amount) {
  if (this._bet >= 10) {
    if (this._bet >= this._money && amount === 5) {
      alert("You can't bet more than you have.")
    } else if (amount === -5 && this._bet === 10) {
      alert("minimum bet is 10");
    } else if (amount === 5 && this._bet === this._maxBet) {
      alert("maximum bet is " + this._maxBet);
    } else if (amount === this._money) {
      if (amount < this._maxBet){
      this._bet = amount;
      } else {
      this._bet = this._maxBet;
      }
      this.update();
    } else {
    this._bet += amount;
    this.update();
}}};
changeMaxBet() {
  if(this._money >= this._maxBetCost) {
  this._money -= this._maxBetCost;
  this._maxBet *= 10;
  this._maxBetCost *= 10;
  this.update();
} else {
  alert("You don't have enough money.")
}
}
resetMyBet() {
  this._bet = 10;
  this.update();
}
}
var player1 = new HiLo();
 function newGame() {
  player1.makeNewGame();
 }
function restart() {
  player1.restartGame();
}
function higher() {
  player1.guessHigher();
}
function lower() {
  player1.guessLower();
}
function increaseBet() {
  player1.changeBet(5);
}
function decreaseBet() {
  player1.changeBet(-5);
}
function allIn() {
  player1.changeBet(player1.money);
}
function maxBet() {
  player1.changeMaxBet();
}
function resetBet() {
  player1.resetMyBet();
}
