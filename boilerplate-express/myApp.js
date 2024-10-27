let express = require("express")
let app = express()

console.log("Hello World!")
console.log("Hello Again!")
console.log("I like typing this.")

app.get("/", function (req, res) {
  app.use("/public", express.static(__dirname + "/public"))
  // res.send('Hello Express');
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" })
})

module.exports = app
