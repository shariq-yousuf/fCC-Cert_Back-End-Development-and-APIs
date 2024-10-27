const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")

console.log("Hello World!")
console.log("Hello Again!")
console.log("I like typing this.")

app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)

  next()
}
app.use(logger)

app.get("/", function (req, res) {
  // res.send('Hello Express');
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE

  res.json({
    message:
      messageStyle === "uppercase" ? "Hello json".toUpperCase() : "Hello json",
  })
})

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString()
    next()
  },
  (req, res) => {
    res.json({ time: req.time })
  }
)

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word })
})

app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query.first
    const lastName = req.query.last
    const response = { name: firstName + " " + lastName }

    res.json(response)
  })
  .post((req, res) => {
    const firstName = req.body.first
    const lastName = req.body.last
    const response = { name: firstName + " " + lastName }

    res.json(response)
  })

module.exports = app
