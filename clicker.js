class Clicker{
  constructor(){
    this._totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
    this._clickBonus = parseInt(localStorage.getItem("clickBonus")) || 1;
    this._upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 100;
  }
  get totalClicks(){
    return this._totalClicks;
  }
  get clickBonus(){
    return this._clickBonus;
  }
  get upgradeCost(){
    return this._upgradeCost;
  }
  resetClick(){
    if(confirm("Are you sure?")){
      localStorage.clear();
      window.location.reload(false);
    }
  }
  click(){
    this._totalClicks += this._clickBonus;
    this.updateDisplay();
    this.updateStorage();
  }
  buyUpgrade(amount, costIncrement){
    if(this._totalClicks >= this._upgradeCost){
      this.increaseClickBonus(amount);
      this._totalClicks -= this._upgradeCost;
      this.increaseUpgradeCost(costIncrement);
    }
  }
  increaseClickBonus(increment){
    this._clickBonus += increment;
    this.updateDisplay();
    this.updateStorage();
  }
  increaseUpgradeCost(costIncrement){
    this._upgradeCost = Math.floor(this._upgradeCost * costIncrement);
    this.updateDisplay();
    this.updateStorage();
  }
  updateDisplay(){
    document.getElementById("clicks").innerHTML = this._totalClicks;
    document.getElementById("clickBonus").innerHTML = this._clickBonus;
    document.getElementById("upgradeCost").innerHTML = this._upgradeCost;
  }
  updateStorage(){
    localStorage.setItem("totalClicks", this._totalClicks);
    localStorage.setItem("clickBonus", this._clickBonus);
    localStorage.setItem("upgradeCost", this._upgradeCost);
  }
}
let click1 = new Clicker();
function addClick(){
  click1.click();
}
function reset(){
  click1.resetClick();
}
function purchaseUpgrade(){
  click1.buyUpgrade(1, 1.55);
} 
  
  
