const fs = require("fs");
const { appendFileSync } = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
//let user;
const userData = [];
const data = require("../assets/data.json");
const PORT = 9000;

///to send html page
app.get("/", (req, res) => {
  userFileRead();
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "../view/login.html"));
});

app.get("/homepage", (req, res) => {
  userFileRead();
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "../view/homepage.html"));
});

app.get("/signup", (req, res) => {
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "../view/signup.html"));
});

app.get("/cart", (req, res) => {
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "../view/cartpage.html"));
});

///to verify username and password
app.post("/auth", (req, res) => {
  let isvalid;
  for (let user in userData) {
    if (
      req.body.Username == userData[user].Name &&
      req.body.Password == userData[user].Password
    ) {
      isvalid = true;
    }
  }
  if (isvalid != true) {
    isvalid = false;
  } else {
    let obj = {
      cart: [],
    };
    fs.exists("./assets/" + req.body.Username + ".json", function (doesExist) {
      if (doesExist) {
        fs.readFile(
          "./assets/" + req.body.Username + ".json",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              obj = JSON.parse(data);
              let json = JSON.stringify(obj);
              fs.writeFile(
                "./assets/" + req.body.Username + ".json",
                json,
                (error) => {
                  if (error) {
                    console.log(error);
                    return;
                  }
                }
              );
            }
          }
        );
      } else {
        let json = JSON.stringify(obj);
        console.log(json);
        fs.writeFile(
          "./assets/" + req.body.Username + ".json",
          json,
          (error) => {
            if (error) {
              console.log(error);
              return;
            }
          }
        );
      }
    });
  }
  res.json(isvalid);
  return;
});

app.post("/newuser", (req, res) => {
  const csv = `\n${req.body.Name},${req.body.MailId},${req.body.Password}`;
  try {
    appendFileSync(path.join(__dirname, "../assets/user.csv"), csv);
    message = "ok";
  } catch (err) {
    console.error(err);
    message = "no";
  }
  //user = req.body.userName;
  userFileRead();
  res.json(message);
  return;
});

app.post("/loadCart", (req, res) => {
  let cartData = require("../assets/" + req.body.Username + ".json");
  res.json(cartData);
  return;
});

app.post("/load", (req, res) => {
  let data = require("../assets/data.json");
  res.json(data);
  return;
});

app.post("/writeData", (req, res) => {
  fs.writeFile(
    "./assets/" + req.body.Username + ".json",
    JSON.stringify(req.body.CartData),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
    }
  );
  fs.writeFile("./assets/data.json", JSON.stringify(req.body.Data), (error) => {
    if (error) {
      console.log(error);
      return;
    }
  });
  res.send({});
  return;
});

app.post("/addtocart", (req, res) => {
  fs.readFile(
    "./assets/" + req.body.Username + ".json",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        let added = false;
        for (let cartDetails in obj.cart) {
          if (obj.cart[cartDetails].Name == req.body.Name) {
            obj.cart[cartDetails].Count += Number(req.body.Count);
            added = true;
          }
        }
        if (!added) {
          obj.cart.push({
            Name: req.body.Name,
            Count: Number(req.body.Count),
          });
        }
        let json = JSON.stringify(obj);
        fs.writeFile(
          "./assets/" + req.body.Username + ".json",
          json,
          (error) => {
            if (error) {
              console.log(error);
              return;
            }
          }
        );
      }
    }
  );
  res.json("bye");
  return;
});

function userFileRead() {
  userData.length = 0;
  fs.createReadStream(path.join(__dirname, "../assets/user.csv"))
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      userData.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log("parsed csv userData:");
      console.log(userData);
    });
}
app.listen(PORT, (error) => {
  if (error) console.log("Error occurred, server can't start", error);
});
console.log(`Server running at http://127.0.0.1:${PORT}/`);
