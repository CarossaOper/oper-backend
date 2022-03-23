const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const api = require("./api/api.js")
const cors = require("cors")

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error running Mongoose:"));

const app = express()

app.use(cors())

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.use("/api", api)

const port = process.env.PORT
app.listen(port)

console.log(`🚀 Launched API on port ${port}`)
console.log(`DB Connection: ${process.env.DB_URL}`)