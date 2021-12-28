const mongoose = require("mongoose")

const MailSchema = new mongoose.Schema({
    email: String
})

module.exports = MailSchema