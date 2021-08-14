// importing modules
const express = require("express");
const path = require('path');
// const fs = require('fs');

// tut88------------------
// > npm install body-parser
const bodyparser = require("body-parser");

// Mongoose related stuff------------------------------------
const mongoose = require('mongoose');
// to connect to db and created a new contactDance database
mongoose.connect('mongodb://localhost:27017/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
// to define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});
//   compilling schema into model(Contact)
var Contact = mongoose.model('Contact', contactSchema);
// tut88 till here only(mongoose)-----------------

const app = express(); // creating an express app 
const port = 8000; // making port variable to run the app at port 8000


// EXPRESS specific stuff----------------------------------

// for serving static files
app.use('/static', express.static('static')); // '/static' is url and 'static' is folder
app.use(express.urlencoded()); //this helps in getting the form data to express, to extract the data from website to this app74.js

// PUG SPECIFIC STUFF------------------------

app.set('view engine', 'pug') // to set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    // const con = "This is the content added via variable "
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
        const params = {}
        res.status(200).render('contact.pug', params)
    })
    // whenever post request is hit on /contact page of our website then,.............
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body); //creating new Contact object from the incoming request from body, extract data from body via request
    myData.save().then(() => { /* .save will return a promise so to handle it we'll use .then  as everything in node.js is asynchronous */
        res.send("This form has been saved to the database.")
    }).catch(() => {
        res.status(400).send("Form wasn't saved to the database.");
    })


    // res.status(200).render('contact.pug')
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The app started succesfully on port ${port}`);
});


// in terminal
// PS C:\Users\Meet\My VScode\Web_Dev> cd .\75-79_88_Dance_Website\
// and then 
// PS C:\Users\Meet\My VScode\Web_Dev\75-79_88_Dance_Website> nodemon app.js