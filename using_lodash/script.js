const express = require('express')
const app = express()
const body_parser = require('body-parser')
const ld =require('lodash')


app.use(body_parser.json())
let data = [];

//this part is to send the data to the array    
app.post('/send_ele', (req, res) => {
    let toadd=req.body
    let newArray =ld.concat(data, toadd)
    data=newArray
    res.send(data)

})

//this is to find all elements in the array
app.get('/fetch_ele', (req, res) => {
    res.send(data)

})

//this is to find one element
app.post('/find_one_ele', async (req, res) => {
    let tofind=ld.findIndex(data, val=>val.name ==req.body.name)
    if (tofind<0){
        console.log("value not found")
    }
    else{
        res.json({"item_found":tofind})
    }

})

//this is to update a element in array
app.post('/update_a_ele',async (req,res)=> {
    console.log(req.body.oldval)
    console.log(req.body.newval)
    let tofind=ld.findIndex(data, val=>val.name ==req.body.oldval)
    if (tofind<0){
        console.log("value not found")
    }
    else{
        ld.fill(data, {"name":req.body.newval}, tofind,tofind+1);
        res.send(data)
    }

})

//to delete the value in the array 
app.get('/to_del_ele', async(req,res)=>{
let to_del=req.body
console.log(to_del)
ld.remove(data, val=>val.name==to_del.name)
res.send(data)
})

app.listen(3000, () => console.log(' listening on port 3000!'))