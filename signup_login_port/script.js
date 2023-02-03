const express = require('express')
const app = express()
const body_parser = require('body-parser')
const { User, Post } = require('./schma');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const auth = require("./forauth");


mongoose.connect('mongodb://127.0.0.1:27017/singup_data')


app.use(body_parser.json())
app.post('/enter', async (req, res) => {
    // console.log(req.body.name)
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        res.send({ email: "user is already there" })
        console.log(user)
    }
    else {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.send({ error: err })
            }
            let newuser = User(
                {
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPass,
                    role: req.body.role
                });
            newuser.save()
            res.send({ newuser })
        })

    }
})



app.post('/login', async (req, res) => {

    useremail = req.body.email
    userpassword = req.body.password

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        bcrypt.compare(userpassword, user.password, function (err, noerr) {

            if (err) {

                res.send({ error: err })
            }
            if (noerr) {
                let token = jwt.sign({ id: user._id }, "secretkey")
                res.send({
                    message: "login successful",
                    token
                })

            }
            else {
                res.send({ message: "password don't match" })
            }
        })
    }
    else {
        res.send({ respons: `user with eamil ${req.body.email} not found in the logindata` })
    }

})

app.get('/currentuser', auth, async (req, res) => {

    // console.log(verified_token);
    // console.log(req.tokenid)
    // let user = await User.findById(req.tokenid.id);
    current_user = req.user
    // console.log(current_user)
    res.send({ currentuseris: current_user.name, currentUser_role: current_user.role })


})

app.get('/logout', (req, res) => {
    req.rawHeaders[1] = "";
    res.send({ message: "logged out yeahh" })
})

app.post('/update', auth, async (req, res) => {

    current_user = req.user

    if (current_user.role == "admin" || req.body.email == current_user.email) {

        let toupdate_usr = await User.findOne({ email: req.body.email })
        toupdate_usr.name = req.body.name;
        let return_val= await  toupdate_usr.save();
        console.log(return_val)
        res.send(return_val)

    }
    else {
        res.send({ msg: "user cannot edit" })
    }
})
app.post('/create_post', auth, async (req, res) => {
    current_user = req.user
    let newPost = Post({
        user_id: current_user._id,
        post_media_url: req.body.url,
        created_date: Date(Date.now()).toString(),
        updated_date: "not yet",
        post_title: req.body.post_title,
        post_descri: req.body.post_descri

    })
    let return_val = await newPost.save()
    console.log(return_val)
    res.send(return_val)

})

app.post('/update_post/:id', auth, async (req, res) => {
    current_user = req.user
    req.params.id
    let findpost = await Post.findOne({ _id: req.params.id, user_id: current_user._id })
    if (findpost == null) {
        res.send({ msg: "no user post found" })
    }
    else {
        findpost.post_title = req.body.new_title;
        findpost.updated_date = Date(Date.now()), toString()
        let return_val = await findpost.save();
        console.log(return_val)
        res.send(return_val)
    }

})
app.post('/delete_post/:id', auth, async (req, res) => {
    post_id = req.params.id
    Post.deleteOne({ id: post_id })
    res.send({ msg: "post deleted" })
})

app.get('/fetch_all_post', auth, async (req, res) => {
    all_post = await Post.find()
    res.send(all_post)
})


app.listen(3000, () => console.log(' listening on port 3000!'))