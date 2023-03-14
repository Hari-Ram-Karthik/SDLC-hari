const fs = require("fs");
const { appendFileSync } = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
//let user;
const data = [];

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

///to verify username and password
app.post("/auth", (req, res) => {
  let message;
  for(let userdata in data){
    if(req.body.Username==data[userdata].Name && req.body.Password==data[userdata].Password){
      message=true;
    }
  }
  if(message!=true){
    message=false;
  }
  res.json(message);
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

function userFileRead() {
  data.length=0;
  fs.createReadStream(path.join(__dirname, "../assets/user.csv"))
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log("parsed csv data:");
      console.log(data);
    });
}
app.listen(PORT, (error) => {
  if (error) console.log("Error occurred, server can't start", error);
});
console.log(`Server running at http://127.0.0.1:${PORT}/`);
