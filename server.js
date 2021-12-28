const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const router = require("./api/api.js")

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error running Mongoose:"));

const app = express()

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.use("/api", router)

const port = process.env.API_PORT || 8080
app.listen(port)

console.log(`🚀 Launched API on port ${port}`)
console.log(`DB Connection: ${process.env.DB_URL}`)