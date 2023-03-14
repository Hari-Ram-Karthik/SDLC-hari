document.getElementById("login").addEventListener("click", loginClick);
document.getElementById("signup").addEventListener("click", signupClick);
let userName = document.getElementById("username");
let password = document.getElementById("password");
let message;

/**
 *Function to login click
 */
async function loginClick(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = {
    Username: userName.value,
    Password: password.value,
  };
  raw = JSON.stringify(raw);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  await fetch("http://127.0.0.1:9000/auth", requestOptions)
  .then((response) =>response.json())
  .then((result) => (message = result))
  .catch((error) => {
    alert("Error couldn't read data from server", error);
    location.reload();
  });
    if(message== true){
      window.location=parent.window.document.location.origin+"/homepage";
    }
}

async function signupClick(){
  window.location=parent.window.document.location.origin+"/signup";
}