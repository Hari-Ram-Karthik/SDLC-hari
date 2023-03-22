document.getElementById("home").addEventListener("click", homeButtonClick);
document.getElementById("logout").addEventListener("click", logoutButtonClick);
let item = document.querySelector("#item");

let data;
let result;
let cartData;
(function () {
  loadData();
})();

async function loadData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = {
    Username: "hari",
  };
  raw = JSON.stringify(raw);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  await fetch("http://127.0.0.1:9000/loadCart", requestOptions)
    .then((response) => response.json())
    .then((result) => (cartData = result))
    .catch((error) => {
      alert("Error couldn't read data from server", error);
      location.reload();
    });
    requestOptions = {
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
  loadCart();
}

function loadCart() {
    document.getElementById("all-item").replaceChildren();
  let itemNumber = 0;
  for (let itemData in cartData.cart) {
      let clone = item.cloneNode(true);
      clone.id = "item" + itemNumber;
      item.before(clone);
      clone.querySelector("#item-name").innerText = data[cartData.cart[itemData].Name].Name;
      clone.querySelector("#item-rate").innerText =  data[cartData.cart[itemData].Name].Rate;
      if(data[cartData.cart[itemData].Name].Stock<10){
        clone.querySelector("#count").setAttribute("max", data[cartData.cart[itemData].Name].Stock);
      }
      clone.querySelector("#buy").id = "buy-" + cartData.cart[itemData].Name;
      clone.querySelector("#count").value = cartData.cart[itemData].Count;
      clone.querySelector("#count").id = "count-" + cartData.cart[itemData].Name;
      clone.querySelector("#item-image").src = "../assets/" + cartData.cart[itemData].Name + ".jpg";
      document.getElementById("all-item").appendChild(clone);
      itemNumber++;
  }
}

function homeButtonClick() {
  window.location = parent.window.document.location.origin + "/homepage";
}

function logoutButtonClick() {
  window.location = parent.window.document.location.origin;
}

async function buyItem(id){
  let name=id.split("-")[1];
  for(let itemData in cartData.cart){
    if(cartData.cart[itemData].Name==name){
      cartData.cart.splice(itemData,1);
      //delete cartData.cart[itemData];
    }
  }
  for(let itemData in data){
    if(itemData==name){
      data[itemData].Stock-=document.getElementById("count-"+name).value;
    }
  }
 await writeData();
 loadData();
}

async function writeData(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = {
    Username: "hari",
    Data:data,
    CartData:cartData
  };
  raw = JSON.stringify(raw);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  await fetch("http://127.0.0.1:9000/writeData", requestOptions)
    .then((response) => response.json())
    .then((result) => (result = result))
    .catch((error) => {
      alert("Error couldn't read data from server", error);
      location.reload();
    });
    
}