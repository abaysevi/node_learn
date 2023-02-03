const express = require('express')
const app = express()
const body_parser = require('body-parser')
const ld =require('lodash')

app.use(body_parser.json())
let data = [];

//this part is to send the data to the array    
app.post('/send_ele', (req, res) => {
    let toadd=req.body
    let newArray = _.concat(data, toadd)
    data=newArray

})

//this is to find all elements in the array
app.get('/fetch_ele', (req, res) => {

})

//this is to find one element
app.post('/find_one_ele', async (req, res) => {

})

//this is to update a element in array
app.post('/update_a_ele',async (req,res)=> {
    
})


//to delete the value in the array 
app.get('/to_del_ele', async(req,res)=>{

})

app.listen(3000, () => console.log(' listening on port 3000!'))