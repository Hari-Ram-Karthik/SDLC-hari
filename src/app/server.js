const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());

const PORT = 9000;

///to send html page
app.get("/", (req, res) => {
    app.use(express.static("./"));
    res.sendFile(path.join(__dirname, "../view/index.html"));
});

app.listen(PORT, (error) => {
  if (error) console.log("Error occurred, server can't start", error);
});
console.log(`Server running at http://127.0.0.1:${PORT}/`);