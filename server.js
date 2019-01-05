let express = require("express");
let app = express();

app.use("/public", express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("API app started");
});
