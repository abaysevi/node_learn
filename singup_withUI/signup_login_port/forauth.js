const jwt = require("jsonwebtoken")
const { User, Post } = require('./schma');
// const config = process.env;

function auth(req,res,next) {
    console.log(req)
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.rawHeaders[1];
    token = token.slice(7)
    console.log(`this is token ${token}`)
    if (token) {
        jwt.verify(token, 'secretkey',  async(err, verified_token) => {
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