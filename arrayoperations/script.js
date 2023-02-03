const express = require('express')
const app = express()
const body_parser = require('body-parser')

app.use(body_parser.json())
let data = [];

//this part is to send the data to the array
app.post('/send_ele', (req, res) => {
    let item = req.body
    data.push(item)
    // res.status(201).send(item)
    console.log(data)
    res.json({ 1: item })
})

//this is to find all elements in the array
app.get('/fetch_ele', (req, res) => {
    res.send(data)
})

//this is to find one element
app.post('/find_one_ele', async (req, res) => {
    let item_to_find = req.body
    console.log(req.body)
    let index_val = await data.findIndex(num => num.name == item_to_find.name)
    if (index_val < 0) {
        console.log("item not found")
        res.json({ "item not found": index_val })
        console.log(index_val)
    }
    else {
        res.json({ "item found": index_val })
    }
})

//this is to update a element in array
app.post('/update_a_ele',async (req,res)=> {
    
    console.log(req.body.oldval)
    console.log(req.body.newval)

    let index_val = await data.findIndex(num => num.name == req.body.oldval)
    if (index_val < 0) {
        console.log("item not found")
        res.json({ "item not found": index_val })
        console.log(index_val)
    }
    else {
        data[index_val].name=req.body.newval
        res.send(data)
    }
})


//to delete the value in the array 
app.get('/to_del_ele', async(req,res)=>{
    let todel=req.body
    console.log(todel)
    let index_val = await data.findIndex(num => num.name == todel.name)
    if (index_val < 0) {
        console.log("item not found")
        res.json({ "item not found": index_val })
        console.log(index_val)
    }
    else {
        data.splice(index_val,1)
        res.send(data)
    }

})

app.listen(3000, () => console.log(' listening on port 3000!'))