class Clicker{
  constructor(){
    this._totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
    this._clickBonus = parseInt(localStorage.getItem("clickBonus")) || 1;
    this._upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 100;
    this._clickerImageSelector = parseInt(localStorage.getItem("clickerImageSelector")) || 0;
    this._clickerImages = [
     /* 1 */"http://4.images.southparkstudios.com/blogs/southparkstudios.com/files/2014/05/0611_mongolian.jpg?quality=0.8",
     /* 2 */"https://i.pinimg.com/originals/fc/a9/5c/fca95ce8f05ff975bd01b3e6de1a2cfd.jpg",
     /* 3 */"https://videogamesftvms2015.files.wordpress.com/2015/02/virt_3.jpeg",
     /* 4 */"https://im-01.gifer.com/7dnI.gif",
     /* 5 */"https://i.ytimg.com/vi/9F8bs_THKiY/maxresdefault.jpg",
     /* 6 */"https://i.imgur.com/NeZ7R.jpg",
     /* 7 */"https://vignette.wikia.nocookie.net/southpark/images/c/cb/WorldofWarcraft11.jpg/revision/latest?cb=20100303001128",
     /* 8 */"https://images1.houstonpress.com/imager/u/original/6368441/stickoftruth1.jpg",
     /* 9 */"https://vignette.wikia.nocookie.net/spsot/images/4/4a/Cartman_Jimmy_the_bard.jpg/revision/latest?cb=20140324003817",
     /* 10 */"http://assets.vg247.com/current//2014/07/south_park_oculus.jpg",
     /* 11 */"http://cdn.mos.cms.futurecdn.net/69f022b412401c0b5acd47395a60e331-480-80.jpg",
     /* 12 */"https://pbs.twimg.com/media/BemgoZGCYAAp_QU.jpg:large",
     /* 13 */"https://cdn.theatlantic.com/static/mt/assets/international/South%20Park%20banner.jpg",
     /* 14 */"http://media.comicbook.com/2016/07/south-park-fractured-but-whole-header-191801.jpg",
     /* 15 */"http://digitalspyuk.cdnds.net/16/32/480x270/gallery-1471005298-south-park-indiana.jpg",
     /* 16 */"https://i.imgur.com/JQw5TgG.png",
     /* 17 */"http://o.aolcdn.com/hss/storage/midas/b506419d949a9305ba9640f02b2764af/204073011/maxresdefault4rt5z6uihhh.jpg",
     /* 18 */"http://1.images.southparkstudios.com/blogs/southparkstudios.com/files/2014/07/1006-half-bear2.jpg",
     /* 19 */"http://fandomania.com/wp-content/uploads/2009/10/wrestling02-600x297.jpg",
     /* 20 */"http://2.images.southparkstudios.com/images/shows/south-park/clip-thumbnails/season-13/1310/south-park-s13e10c02-the-fine-sport-of-wrastling-16x9.jpg?width=1024&height=576",
     /* 21 */"https://vignette.wikia.nocookie.net/southpark/images/c/ce/209.jpg/revision/latest?cb=20160411024525",
     /* 22 */"https://i.ytimg.com/vi/pspyxUuR6Es/maxresdefault.jpg",
     /* 23 */"https://i.ytimg.com/vi/01tWIKOqQHg/hqdefault.jpg",
     /* 24 */"https://vignette.wikia.nocookie.net/degrassi/images/2/2e/SOUTH-PARK-S15-RoyalPudding-Ike.jpg/revision/latest?cb=20140316024141",
     /* 25 */"http://1.images.southparkstudios.com/images/shows/south-park/clip-thumbnails/season-12/1212/south-park-s12e12c06-dont-jump-ike-4x3.jpg?width=100%&height=100%&quality=0.8",
     /* 26 */"https://vignette.wikia.nocookie.net/southpark/images/2/21/MissTeacherBangsaBoy08.jpg/revision/latest?cb=20100303051752",
     /* 27 */"http://basementrejects.com/wp-content/uploads/2012/09/south-park-season-13-8-dead-celebrities-ike-billy-mays.jpg",
     /* 28 */"http://2.images.southparkstudios.com/images/shows/south-park/clip-thumbnails/season-10/1010/south-park-s10e10c04-afternoon-delight-4x3.jpg?width=100%&height=100%&quality=0.8",
     /* 29 */"http://3.images.southparkstudios.com/images/shows/south-park/clip-thumbnails/season-17/1705/south-park-s17e05c06-come-on-bro-kick-the-baby-16x9.jpg?quality=0.8",
     /* 30 */"https://vignette.wikia.nocookie.net/southpark/images/4/47/TamingStrangePromo.jpg/revision/latest?cb=20131028161640",
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
