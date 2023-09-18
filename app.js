const express = require('express');
const path=require('path');
const app=express();
var mongoose = require("mongoose")
const bodyparser=require("body-parser")
mongoose.connect("mongodb://127.0.0.1/contactdance", { useNewUrlParser: true });
const port=8000;


// define mongoose schema
var contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    desc: String
});

//model
var Contact= mongoose.model('Contact', contactSchema);


// express specific
app.use("/static",express.static('static')) //serves static files
app.use(express.urlencoded())

// pug specific
app.set('view engine','pug') //set view engine as pug
app.set('views',path.join(__dirname,'views'))

//endpoints
app.get('/',(req,res)=>{
    const par={}
    res.status(200).render('home.pug',par);
})

app.get('/contact',(req,res)=>{
    const par={}
    res.status(200).render('contact.pug',par);
})

app.post('/contact',(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})


// start the server
app.listen(port,()=>{
    console.log(`This application started successfully on port ${port}`);
})