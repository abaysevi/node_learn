const jwt = require("jsonwebtoken")
const { User, Post } = require('./schma');


function auth(req,res,next) {

    let token = req.rawHeaders[1]
    token = token.slice(7)
    if (token) {
        jwt.verify(token, "secretkey",  async(err, verified_token) => {
            if (err) {
                res.send({ error: err })
            }
            else {
                // console.log('yoooo')
                req.tokenid=verified_token
                // console.log(req.tokenid)
                let user = await User.findById(req.tokenid.id)
                req.user=user
                next();
            }
        })

    }
    else{
        res.send({"message":"no token"})
                
    }
}

module.exports =auth;