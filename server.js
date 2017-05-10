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

app.listen(8080);
