const express = require("express")
const mongoose = require("mongoose")

const PostSchema = require("../schemas/post.js")
const Post = mongoose.model("Post", PostSchema)
const MailSchema = require("../schemas/mail.js")
const Mail = mongoose.model("Mail", MailSchema)

const { body, validationResult } = require('express-validator');

const router = express.Router()

router.get("/", (req, res) => {
    res.json({version: 1, available: true})
});

router.get("/blog", (req, res) => {
    Post.find({}, (error, posts) => {
        if (error){
            console.log(`Error querying server: ${error}`)
        } else {
            return res.json({blog: posts});
        }
    })
})

router.get("/post/:id", (req, res) => {
    let id = req.params.id
    Post.find({_id: id}, (error, post) => {
        if (error) {
            res.json({error: error})
        } else {
            res.json({Post: post})
        }
    })
})

router.get("/latest", (req, res) => {
    Post.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec((error, post) => {
        if (error) {
            res.status(503).json({error: error})
        } else {
            res.status(200).json({Post: post})
        }
    })
})

router.post("/newsletter", body("mail").isEmail(), (req, res) => {
    
    // validate email address
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    let entry = new Mail({
        email: req.body.mail
    })

    Mail.find({email: req.body.mail}, (error, mails) => {

        if (error) {
            res.status(503).json({error: error})
        } else if ( mails.length != 0 ) {
            res.status(400).json({error: "Already registered"})
        } else {


            entry.save((err) => {
                if (err) {
                    res.status(504).json({error: err})
                } else {
                    res.status(200).json({entry})
                }
            })
        }
    }) 
})

router.delete("/newsletter", body("mail").isEmail(), (req, res) => {

    // validate email address
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    Mail.findOneAndDelete({email: req.body.mail}, (error, mail) => {
        if (error) {
            res.status(504).json({error: error})
        } else {
            res.status(200).json({mail})
        }
    })
})

module.exports = router