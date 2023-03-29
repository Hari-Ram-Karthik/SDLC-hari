document.querySelector("#search-bar").addEventListener("change", optonChange);
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

let item = document.querySelector("#item");
let itemOptions = document.getElementById("items");
let optionSelected = document.getElementById("search-bar");
let data = [];
let vegetable = [];
let fruits = [];
let cookware = [];
let others = [];
let isvalid;

(function () {
  loadData();
})();

/**
 *Function to load data from server
 */
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
  itemOptions.innerHTML = "";
  for (let itemData in data) {
    itemOptions.innerHTML =
      itemOptions.innerHTML + '<option value="' + data[itemData].Name + '">';
  }
  allButtonClick();
}

/**
 *Function to load data to the page(displaying items)
 */
function createItems(category) {
  document.getElementById("all-item").replaceChildren();
  for (let itemData in data) {
    if (data[itemData].Category == category || category == "all") {
      let clone = item.cloneNode(true);
      clone.id = "item-" + itemData;
      item.before(clone);
      clone.querySelector("#item-name").innerText = data[itemData].Name;
      clone.querySelector("#item-rate").innerText = data[itemData].Rate;
      if (data[itemData].Stock <= 0) {
        clone.querySelector("#add-to-cart").setAttribute("disabled", "");
        clone.querySelector("#warning").innerText = "Out of stock";
      } else if (data[itemData].Stock < 10) {
        clone.querySelector("#count").setAttribute("max", data[itemData].Stock);
        clone.querySelector("#warning").innerText =
          "Only " + data[itemData].Stock + " left in stock";
      }
      clone.querySelector("#add-to-cart").id = "add-to-cart-" + itemData;
      clone.querySelector("#count").id = "count-" + itemData;
      clone.querySelector("#item-image").src = "../assets/" + itemData + ".jpg";
      document.getElementById("all-item").appendChild(clone);
    }
  }
}

/**
 *Function to load data to the page(displaying items) when search bar is used
 */
function optonChange() {
  allButtonClick();
  for (let itemData in data) {
    if (data[itemData].Name == optionSelected.value) {
      document.getElementById("all-item").replaceChildren();
      let clone = item.cloneNode(true);
      clone.id = "item-" + itemData;
      item.before(clone);
      clone.querySelector("#item-name").innerText = data[itemData].Name;
      clone.querySelector("#item-rate").innerText = data[itemData].Rate;
      if (data[itemData].Stock <= 0) {
        clone.querySelector("#add-to-cart").setAttribute("disabled", "");
        clone.querySelector("#warning").innerText = "Out of stock";
      } else if (data[itemData].Stock < 10) {
        clone.querySelector("#count").setAttribute("max", data[itemData].Stock);
        clone.querySelector("#warning").innerText =
          "Only " + data[itemData].Stock + " left in stock";
      }
      clone.querySelector("#add-to-cart").id = "add-to-cart-" + itemData;
      clone.querySelector("#count").id = "count-" + itemData;
      clone.querySelector("#item-image").src = "../assets/" + itemData + ".jpg";
      document.getElementById("all-item").appendChild(clone);
    }
  }
}

/**
 *Function to execute when all button is clicked
 */
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

/**
 *Function to execute when vegetable button is clicked
 */
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

/**
 *Function to execute when fruits button is clicked
 */
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

/**
 *Function to execute when cookware button is clicked
 */
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

/**
 *Function to execute when others button is clicked
 */
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

/**
 *Function to execute when cart button is clicked
 */
function cartButtonClick() {
  window.location = parent.window.document.location.origin + "/cart";
}

/**
 *Function to execute when logout button is clicked
 */
function logoutButtonClick() {
  window.location = parent.window.document.location.origin;
}

/**
 *Function to execute when add to cart button is clicked
 * Update data to server
 */
async function addtocart(id) {
  let countId = "count-" + id.split("-")[3];
  var myHeaders = new Headers();
  if (document.getElementById(countId).value > 0) {
    myHeaders.append("Content-Type", "application/json");
    var raw = {
      Username: window.localStorage.getItem("Username"),
      Name: id.split("-")[3],
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
      .then((response) => response.json())
      .then((result) => (isvalid = result))
      .catch((error) => {
        alert("Error couldn't read data from server", error);
        location.reload();
      });
    document.getElementById(countId).value = 0;
  } else {
    alert("Specify quantity to add to cart");
  }
}
