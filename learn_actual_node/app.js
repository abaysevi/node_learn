
const express =require("express")
const app=express();
const bodyParser= require("body-parser")
const path = require("path")

const adminRoutes =require('./routes/admin')

const shopRoutes = require("./routes/shop")

app.use(express.static(path.join(__dirname,'./views')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin",adminRoutes);

app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404)
    res.sendFile(__dirname + '/views/error.html');
})

app.listen(3000,()=>{
    console.log("port running on loaclhost 3000")
})