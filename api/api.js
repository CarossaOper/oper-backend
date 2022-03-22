const express = require("express")
const mongoose = require("mongoose")

const PostSchema = require("../schemas/post.js")
const Post = mongoose.model("Post", PostSchema)
const MailSchema = require("../schemas/mail.js")
const Mail = mongoose.model("Mail", MailSchema)

const auth = require("../middleware/authorization.js")

const { query, validationResult, check } = require('express-validator');

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

router.post("/post/new", auth, (req, res) => {
    let newpost = new Post(req.body.post)

    newpost.save((error) => {
        if (error) res.sendStatus(503)
        else res.sendStatus(201)
    })
})

router.post("/post/delete", auth, (req, res) => {
    Post.findOneAndDelete({_id: req.body._id}, (error) => {
        if (error) {
            res.sendStatus(503)
        } else {
            res.sendStatus(200)
        }
    })
})

router.post("/post/update", auth, (req, res) => {
    console.log(req.body.post)
    Post.updateOne({_id: req.body.post._id}, req.body.post, (error) => {
        if (error) res.sendStatus(503)
        else res.sendStatus(202)
    })
})

router.post("/newsletter", query("mail").isEmail(), check("mail"), (req, res) => {
    
    // validate email address
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    let entry = new Mail({
        email: req.query.mail,
    })

    Mail.find({email: req.query.mail}, (error, mails) => {

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

router.delete("/newsletter", query("mail").isEmail(), check("mail"), (req, res) => {

    // validate email address
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    Mail.findOneAndDelete({email: req.query.mail}, (error, mail) => {
        if (error) {
            res.status(504).json({error: error})
        } else {
            res.status(200).json({mail})
        }
    })
})

module.exports = router