//express
const express = require('express');
const app = express();

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

app.get('css', function(req, res){
    res.render('pages/css/main.css');
});

app.get('/upload', function(req, res){
    res.render('pages/upload');
});

app.get('/user', function(req, res){
    res.render('pages/user');
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

app.listen(8080);
