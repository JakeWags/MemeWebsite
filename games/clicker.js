class Clicker{
  constructor(){
    this._totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
    this._clickBonus = parseInt(localStorage.getItem("clickBonus")) || 1;
    this._upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 100;
    this._clickerImageSelector = parseInt(localStorage.getItem("clickerImageSelector")) || 0;
    this._clickerImages = [
     /* 1 */"clickerImages/southpark1.jpg",
     /* 2 */"clickerImages/southpark2.jpg",
     /* 3 */"clickerImages/southpark3.jpeg",
     /* 4 */"clickerImages/southpark4.gif",
     /* 5 */"clickerImages/southpark5.jpg",
     /* 6 */"clickerImages/southpark6.jpg",
     /* 7 */"clickerImages/southpark7.jpg",
     /* 8 */"clickerImages/southpark8.jpg",
     /* 9 */"clickerImages/southpark9.jpg",
     /* 10 */"clickerImages/southpark10.jpg",
     /* 11 */"clickerImages/southpark11.jpg",
     /* 12 */"clickerImages/southpark12.jpg_large",
     /* 13 */"clickerImages/southpark13.jpg",
     /* 14 */"clickerImages/southpark14.jpg",
     /* 15 */"clickerImages/southpark15.jpg",
     /* 16 */"clickerImages/southpark16.png",
     /* 17 */"clickerImages/southpark17.jpg",
     /* 18 */"clickerImages/southpark18.jpg",
     /* 19 */"clickerImages/southpark19.jpg",
     /* 20 */"clickerImages/southpark20.jpg",
     /* 21 */"clickerImages/southpark21.jpg",
     /* 22 */"clickerImages/southpark22.jpg",
     /* 23 */"clickerImages/southpark23.jpg",
     /* 24 */"clickerImages/southpark24.jpg",
     /* 25 */"clickerImages/southpark25.jpg",
     /* 26 */"clickerImages/southpark26.jpg",
     /* 27 */"clickerImages/southpark27.jpg",
     /* 28 */"clickerImages/southpark28.jpg",
     /* 29 */"clickerImages/southpark29.jpg",
     /* 30 */"clickerImages/southpark30.jpg",
   ]
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
  get clickerImageSelector(){
    return this._clickerImageSelector;
  }
  update(){
    this.updateStorage();
    document.getElementById("clicks").innerHTML = this._totalClicks;
    document.getElementById("clickBonus").innerHTML = this._clickBonus;
    document.getElementById("upgradeCost").innerHTML = this._upgradeCost;
    document.getElementById("clicker").src = this._clickerImages[this._clickerImageSelector];
  }
  updateStorage(){
    localStorage.setItem("totalClicks", this._totalClicks);
    localStorage.setItem("clickBonus", this._clickBonus);
    localStorage.setItem("upgradeCost", this._upgradeCost);
    localStorage.setItem("clickerImageSelector", this._clickerImageSelector);
  }
  resetClick(){
    if(confirm("Are you sure?")){
      localStorage.clear();
      window.location.reload(false);
    }
  }
  click(){
    this._totalClicks += this._clickBonus;
    this.update();
  }
  buyUpgrade(increment, costIncrement){
    if(this._totalClicks >= this._upgradeCost){
      this.increaseClickBonus(increment);
      this._totalClicks -= this._upgradeCost;
      this.increaseUpgradeCost(costIncrement);
      this.changePicture();
    }
  }
  increaseClickBonus(increment){
    this._clickBonus += increment;
  }
  increaseUpgradeCost(costIncrement){
    this._upgradeCost = Math.floor(this._upgradeCost * costIncrement);
  }
  changePicture(){
    this._clickerImageSelector++;
    if (this._clickerImageSelector >= this._clickerImages.length){
      this._clickerImageSelector = 0;
    }
  this.update();
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
  if (click1.clickBonus >= 10 && click1.clickBonus< 20){
    click1.buyUpgrade(1, 1.25);
  } else if(click1.clickBonus >= 20 && click1.clickBonus < 30){
    click1.buyUpgrade(1, 1.10);
  } else if(click1.clickBonus >= 30){
    click1.buyUpgrade(1, 1.05);
  }
   else {
  click1.buyUpgrade(1, 1.4);
}
}
