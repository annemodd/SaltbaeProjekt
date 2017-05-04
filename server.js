//express
const express = require('express');
const app = express();

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

// Verlinkung me page
app.get('/me', function(req, res) {
    res.render('pages/me');
});

app.listen(8080);
