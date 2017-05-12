//express
const express = require('express');
const app = express();
const multer  =   require('multer');
const uploading = multer(
  { 
    dest: './uploads', 
    limits: {
       fields: 1,
       files: 1,
       fileSize: 512000
    }
  })

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/192.168.99.100:32768';

app.use(express.static("./assets"));

// set view
app.set('view engine', 'ejs');


// Verlinkung index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// Verlinkung about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Verlinkung feed page
app.get('/feed', function(req, res) {
    res.render('pages/feed');
});

// Verlinkung profile page
app.get('/profile', function(req, res) {
    res.render('pages/profile',{
        username: "User",
        entry: "Some entry: a text or a pic",
        suggestions: "# suggestion 1, suggestion2 oder no suggestions"
    });
});

//Handle new entry
app.post('/profile', function(req, res) {
     res.render('pages/profile',{
        username: "User",
        entry: "Some entry: a text or a pic",
        suggestions: "# suggestion 1, suggestion2 oder no suggestions"
    });
});
/*
app.post('/profile', (req,res) => {
    res.render('pages/successful', {
        message:'Thank you! Your new entry has been successfully uploaded!'
    });
});
*/

app.get('css', function(req, res){
    res.render('pages/css/main.css');
});

app.get('/upload', function(req, res){
    res.render('pages/upload');
});

app.get('/logout', function(req, res){
    res.render('pages/logout');
});

app.get('/loginFa', function(req, res){
    res.render('pages/loginFa');
});

app.get('/loginGoogle', function(req, res){
    res.render('pages/loginGoogle');
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    const originalname = file.originalname;
    const extension = originalname.split(".");
    filename = Date.now() + '.' + extension[extension.length-1];
    callback(null, filename);
  }
});

app.post('/upload', uploading.single('file'), function (req, res, next) {  
  const userInput = new userInput ({
    imageName: req.file.imageName,
    originalname: req.file.originalname,
    extension: req.file.extension,
  })
  userInput.save(function(err){
    if (err){console.log(err)}
    else {
      res.redirect('pages/upload');
    }
  })
});

const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  fimageName: String,
  originalname: String,
  extension: String,
});
const userInput = mongoose.model('userInput', inputSchema);

module.exports = userInput;


app.listen(8080);
