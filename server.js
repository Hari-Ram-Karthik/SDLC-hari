const fs = require("fs");
const { appendFileSync } = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const userData = [];
const data = require("./src/assets/data.json");
const PORT = 9000;

///to send login page
app.get("/", (req, res) => {
  userFileRead();
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "./src/view/login.html"));
});

///to send homepage page
app.get("/homepage", (req, res) => {
  userFileRead();
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "./src/view/homepage.html"));
});

///to send signup page
app.get("/signup", (req, res) => {
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "./src/view/signup.html"));
});

///to send cart page
app.get("/cart", (req, res) => {
  app.use(express.static("./"));
  res.sendFile(path.join(__dirname, "./src/view/cartpage.html"));
});

///to verify username and password and create cart file if doesnot exist
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
    fs.exists("./src/assets/" + req.body.Username + ".json", function (doesExist) {
      if (doesExist) {
        fs.readFile(
          "./src/assets/" + req.body.Username + ".json",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              obj = JSON.parse(data);
              let json = JSON.stringify(obj);
              fs.writeFile(
                "./src/assets/" + req.body.Username + ".json",
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
        fs.writeFile(
          "./src/assets/" + req.body.Username + ".json",
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

///to add user
app.post("/newuser", (req, res) => {
  const csv = `\n${req.body.Name},${req.body.MailId},${req.body.Password}`;
  try {
    appendFileSync(path.join(__dirname, "./src/assets/user.csv"), csv);
    message = "ok";
  } catch (err) {
    console.error(err);
    message = "no";
  }
  userFileRead();
  res.json(message);
  return;
});

///to send cart data
app.post("/loadCart", (req, res) => {
  let cartData = require("./src/assets/" + req.body.Username + ".json");
  res.json(cartData);
  return;
});

///to senditem data
app.post("/load", (req, res) => {
  let data = require("./src/assets/data.json");
  res.json(data);
  return;
});

///to send write items to file
app.post("/writeData", (req, res) => {
  fs.writeFile(
    "./src/assets/" + req.body.Username + ".json",
    JSON.stringify(req.body.CartData),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
    }
  );
  fs.writeFile("./src/assets/data.json", JSON.stringify(req.body.Data), (error) => {
    if (error) {
      console.log(error);
      return;
    }
  });
  res.send({});
  return;
});

///to add items in cart file
app.post("/addtocart", (req, res) => {
  fs.readFile(
    "./src/assets/" + req.body.Username + ".json",
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
          "./src/assets/" + req.body.Username + ".json",
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

/**
 *to read user details
 */
function userFileRead() {
  userData.length = 0;
  fs.createReadStream(path.join(__dirname, "./src/assets/user.csv"))
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      userData.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
    });
}

///to listen to port
app.listen(PORT, (error) => {
  if (error) console.log("Error occurred, server can't start", error);
});
console.log(`Server running at http://127.0.0.1:${PORT}/`);
