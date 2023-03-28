document.getElementById("signup").addEventListener("click", signupClick);
document.getElementById("login").addEventListener("click", loginClick);
let name_ = document.getElementById("name");
let mailId = document.getElementById("mailid");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmpassword");
let message;

/**
 *Function to login click
 */
async function loginClick() {
  window.location = parent.window.document.location.origin;
}

async function signupClick() {
  if (
    name_.value == "" ||
    mailId.value == "" ||
    password.value == "" ||
    confirmPassword.value == ""
  ) {
    document.getElementById("warning").innerText = "All fields are mandatory";
  } else {
    document.getElementById("warning").innerText = "";
    if (!mailId.value.match("[a-z0-9.]+@[a-z]+.[a-z]{2,3}")) {
      document.getElementById("warning").innerText += "Invalid mail id\n";
    }
    if (name_.value.length <= 3) {
      document.getElementById("warning").innerText +=
        "Name should have atleast 4 characters\n";
    }
    if (
      !password.value.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ) {
      document.getElementById("warning").innerText +=
        "Password should be minimum eight characters, at least \none uppercase letter, one lowercase letter, one special character\n and one number\n";
    } else if (password.value != confirmPassword.value) {
      document.getElementById("warning").innerText += "Password should match\n";
    }
    if (document.getElementById("warning").innerText == "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = {
        Name: name_.value,
        Password: password.value,
        MailId: mailId.value,
      };
      raw = JSON.stringify(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      await fetch("http://127.0.0.1:9000/newuser", requestOptions)
        .then((response) => response.json())
        .then((result) => (message = result))
        .catch((error) => {
          alert("Error couldn't read data from glitch", error);
          //location.reload();
        });
      if (message === "ok") {
        window.localStorage.setItem("Username", name_.value);
        window.location = parent.window.document.location.origin;
      }
    }
  }
}
