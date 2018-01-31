class Clicker{
  constructor(){
    this._totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
    this._clickBonus = parseInt(localStorage.getItem("clickBonus")) || 1;
    this._upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;
    this._clickerImageSelector = parseInt(localStorage.getItem("clickerImageSelector")) || 0;
    this._clickerImages = [
     "https://coubsecure-s.akamaihd.net/get/b93/p/coub/simple/cw_timeline_pic/00bf8b41367/141c3f734f40c9d7d74c0/med_1471891539_image.jpg",
     "https://i.pinimg.com/originals/fc/a9/5c/fca95ce8f05ff975bd01b3e6de1a2cfd.jpg",
     "https://videogamesftvms2015.files.wordpress.com/2015/02/virt_3.jpeg",
     "https://im-01.gifer.com/7dnI.gif",
     "https://i.ytimg.com/vi/9F8bs_THKiY/maxresdefault.jpg",
     "https://i.imgur.com/NeZ7R.jpg",
     "https://vignette.wikia.nocookie.net/southpark/images/c/cb/WorldofWarcraft11.jpg/revision/latest?cb=20100303001128",
     "https://images1.houstonpress.com/imager/u/original/6368441/stickoftruth1.jpg",
     "https://vignette.wikia.nocookie.net/spsot/images/4/4a/Cartman_Jimmy_the_bard.jpg/revision/latest?cb=20140324003817",
     "http://assets.vg247.com/current//2014/07/south_park_oculus.jpg",
     "http://cdn.mos.cms.futurecdn.net/69f022b412401c0b5acd47395a60e331-480-80.jpg",
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
    if (this._clickerImageSelector >= 11){
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
  if (click1.clickBonus >= 10){
    click1.buyUpgrade(1, 1.25);
  } else {
  click1.buyUpgrade(1, 1.4);
}
}
