const jwt = require("jsonwebtoken")

function authorize(req, res, next) {
    let header = req.headers["authorization"]
    let token = header && header.split(" ")[1]
    console.log("AUTH: " + token)

    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, "b539526ecec5d6863e4bcddddfb3c7caffc59f245e506832600233cdea1694578e7d5ece682bdb8917dff8d4e27f523dccb359900b56a1aceb4e234b78d0fee2", (error, data) => {
        if (error) return res.sendStatus(403)
        req.clidata = data
        next()
    })
}

module.exports = authorize