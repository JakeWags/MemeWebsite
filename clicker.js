var totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
//the OR zero just means that if localStorage.getItem("clicks") doesn't exist, use 0 instead
var clickBonus = parseInt(localStorage.getItem("clickBonus")) || 1;\
var upgradeCost = 100;

function addClick(){
    totalClicks += clickBonus;
    document.getElementById("clicks").innerHTML = totalClicks;
    localStorage.setItem("totalClicks", totalClicks);
}
function increaseClickBonus(amount){
    clickBonus += amount;
    document.getElementById("clickBonus").innerHTML = clickBonus;
    localStorage.setItem("clickBonus", clickBonus);
}
function reset(){
  if(confirm("Are you sure?")){
    localStorage.clear();
    window.location.reload(false);
  }
}
function buyUpgrade(){
  if (totalClicks >= upgradeCost){
    increaseClickBonus(1);
    upgradeCost *= 1.1;
    document.getElementById("upgradeCost").innerHTML = upgradeCost;
  }
  else{
    document.getElementById("error").innerHTML = "Not enough money.";
  };
};
