let item = document.querySelector("#item");
let data = [];
let vegetable = [];
let fruits = [];
let cookware = [];
let others = [];

document.getElementById("all-button").addEventListener("click",allButtonClick);
document.getElementById("vegetable-button").addEventListener("click",vegetableButtonClick);
document.getElementById("fruit-button").addEventListener("click",fruitButtonClick);
document.getElementById("cookware-button").addEventListener("click",cookwareButtonClick);
document.getElementById("other-button").addEventListener("click",otherButtonClick);

(function () {
  loadData();
})();

async function loadData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  await fetch("http://127.0.0.1:9000/load", requestOptions)
    .then((response) => response.json())
    .then((result) => (data = result))
    .catch((error) => {
      alert("Error couldn't read data from server", error);
      location.reload();
    });
  console.log(data);
  allButtonClick();
}

function createItems(category){
  document.getElementById("all-item").replaceChildren();
  let itemNumber = 0;
  for (let itemData in data) {
    if(data[itemData].Category==category || category=="all"){
      let clone = item.cloneNode(true);
      clone.id = "item" + itemNumber;
      item.before(clone);
      clone.querySelector("#item-name").innerText = data[itemData].Name;
      clone.querySelector("#item-rate").innerText =data[itemData].Rate;
      clone.querySelector("#add-to-cart").id ="add-to-cart-"+itemData;
      clone.querySelector("#count").id ="count-"+itemData;
      clone.querySelector("#item-image").src ="../assets/"+itemData+".jpg";
      document.getElementById("all-item").appendChild(clone);
      itemNumber++;
    }
    
 }
}

function allButtonClick(){
  createItems("all");
  document.getElementById("all-button").setAttribute("style", "background-color:cyan");
  document.getElementById("vegetable-button").setAttribute("style", "background-color:azure");
  document.getElementById("fruit-button").setAttribute("style", "background-color:azure");
  document.getElementById("cookware-button").setAttribute("style", "background-color:azure");
  document.getElementById("other-button").setAttribute("style", "background-color:azure");
}

function vegetableButtonClick(){
  createItems("Vegetables");
  document.getElementById("all-button").setAttribute("style", "background-color:azure");
  document.getElementById("vegetable-button").setAttribute("style", "background-color:cyan");
  document.getElementById("fruit-button").setAttribute("style", "background-color:azure");
  document.getElementById("cookware-button").setAttribute("style", "background-color:azure");
  document.getElementById("other-button").setAttribute("style", "background-color:azure");
}

function fruitButtonClick(){
  createItems("Fruits");
  document.getElementById("all-button").setAttribute("style", "background-color:azure");
  document.getElementById("vegetable-button").setAttribute("style", "background-color:azure");
  document.getElementById("fruit-button").setAttribute("style", "background-color:cyan");
  document.getElementById("cookware-button").setAttribute("style", "background-color:azure");
  document.getElementById("other-button").setAttribute("style", "background-color:azure");
}

function cookwareButtonClick(){
  createItems("Cookware");
  document.getElementById("all-button").setAttribute("style", "background-color:azure");
  document.getElementById("vegetable-button").setAttribute("style", "background-color:azure");
  document.getElementById("fruit-button").setAttribute("style", "background-color:azure");
  document.getElementById("cookware-button").setAttribute("style", "background-color:cyan");
  document.getElementById("other-button").setAttribute("style", "background-color:azure");
}

function otherButtonClick(){
  createItems("Others");
  document.getElementById("all-button").setAttribute("style", "background-color:azure");
  document.getElementById("vegetable-button").setAttribute("style", "background-color:azure");
  document.getElementById("fruit-button").setAttribute("style", "background-color:azure");
  document.getElementById("cookware-button").setAttribute("style", "background-color:azure");
  document.getElementById("other-button").setAttribute("style", "background-color:cyan");
}
