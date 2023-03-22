let item = document.querySelector("#item");
let data = [];
let vegetable = [];
let fruits = [];
let cookware = [];
let others = [];
let isvalid;

document.getElementById("all-button").addEventListener("click", allButtonClick);
document
  .getElementById("vegetable-button")
  .addEventListener("click", vegetableButtonClick);
document
  .getElementById("fruit-button")
  .addEventListener("click", fruitButtonClick);
document
  .getElementById("cookware-button")
  .addEventListener("click", cookwareButtonClick);
document
  .getElementById("other-button")
  .addEventListener("click", otherButtonClick);
document.getElementById("cart").addEventListener("click", cartButtonClick);
document.getElementById("logout").addEventListener("click", logoutButtonClick);

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

function createItems(category) {
  document.getElementById("all-item").replaceChildren();
  let itemNumber = 0;
  for (let itemData in data) {
    if (data[itemData].Category == category || category == "all") {
      let clone = item.cloneNode(true);
      clone.id = "item" + itemNumber;
      item.before(clone);
      clone.querySelector("#item-name").innerText = data[itemData].Name;
      clone.querySelector("#item-rate").innerText = data[itemData].Rate;
      if(data[itemData].Stock<=0){
        clone.querySelector("#add-to-cart").setAttribute("disabled", "");
        clone.querySelector("#out-of-stock").innerText="Out of stock";
      }
      else if(data[itemData].Stock<10){
        clone.querySelector("#count").setAttribute("max", data[itemData].Stock );
      }
      clone.querySelector("#add-to-cart").id = "add-to-cart-" + itemData;
      clone.querySelector("#count").id = "count-" + itemData;
      clone.querySelector("#item-image").src = "../assets/" + itemData + ".jpg";
      document.getElementById("all-item").appendChild(clone);
      itemNumber++;
    }
  }
}

function allButtonClick() {
  createItems("all");
  document
    .getElementById("all-button")
    .setAttribute("style", "background-color:cyan");
  document
    .getElementById("vegetable-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("fruit-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("cookware-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("other-button")
    .setAttribute("style", "background-color:azure");
}

function vegetableButtonClick() {
  createItems("Vegetables");
  document
    .getElementById("all-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("vegetable-button")
    .setAttribute("style", "background-color:cyan");
  document
    .getElementById("fruit-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("cookware-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("other-button")
    .setAttribute("style", "background-color:azure");
}

function fruitButtonClick() {
  createItems("Fruits");
  document
    .getElementById("all-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("vegetable-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("fruit-button")
    .setAttribute("style", "background-color:cyan");
  document
    .getElementById("cookware-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("other-button")
    .setAttribute("style", "background-color:azure");
}

function cookwareButtonClick() {
  createItems("Cookware");
  document
    .getElementById("all-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("vegetable-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("fruit-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("cookware-button")
    .setAttribute("style", "background-color:cyan");
  document
    .getElementById("other-button")
    .setAttribute("style", "background-color:azure");
}

function otherButtonClick() {
  createItems("Others");
  document
    .getElementById("all-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("vegetable-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("fruit-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("cookware-button")
    .setAttribute("style", "background-color:azure");
  document
    .getElementById("other-button")
    .setAttribute("style", "background-color:cyan");
}

function cartButtonClick() {
  window.location = parent.window.document.location.origin + "/cart";
}

function logoutButtonClick() {
  window.location = parent.window.document.location.origin;
}

async function addtocart(id) {
  let countId = "count-" + id.split("-")[3];
  var myHeaders = new Headers();
  if( document.getElementById(countId).value>0){
    myHeaders.append("Content-Type", "application/json");
    var raw = {
      Username:"hari",
      Name:id.split("-")[3],
      Count: document.getElementById(countId).value,
    };
    raw = JSON.stringify(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch("http://127.0.0.1:9000/addtocart", requestOptions)
    .then((response) =>response.json())
    .then((result) => (isvalid = result))
    .catch((error) => {
      alert("Error couldn't read data from server", error);
      location.reload();
    });
    document.getElementById(countId).value = 0;
  }
 else{
  alert("Specify quantity to add to cart");
 }
}
