//express
const express = require('express');
const bodyparser = require('body-parser');
//package for uploading pics
const multer  = require('multer');

const app = express();

//package for login
const sso = require('@akoenig/sso');

const restricted = sso(app, {
    facebook: {
        clientID        : '1162182387237775',
        clientSecret    : '0417ba8a1f0392dc48c5aba3eaa41dea',
        callbackURL     : 'http://localhost:8080/auth/facebook/callback',
        successRedirect: "/profile",
        failureRedirect: "/",
    },
});

const logout = require('express-passport-logout');


const { persistPhoto, persistUser, persistText } = require('./lib/services/persister');
//const { findAllPhotos } = require('./lib/services/reader');



const upload = multer({ dest: `./uploads`});
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use('/uploads', express.static('./uploads'));



// set view
app.set('view engine', 'ejs');




// Verlinkung index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// Verlinkung about page
app.get('/about',restricted(), function(req, res) {
    res.render('pages/about');
});

// Verlinkung feed page
app.get('/feed', restricted(), function(req, res) {
    //findAllPhotos()
      //  .then((photos) => 
        res.render('pages/feed');
});

//Link to profile page only for logged in users
app.get('/profile', restricted(), function(req, res) {
    const displayname = req.user.displayName;
     persistUser(req.user.displayName, req.user.id).
        then(() =>
            res.redirect('/profile')
        );
    //req.user
    res.render('pages/profile',{
        username: `"${displayname}"`,
        entry: "Some entry: a text or a pic",
        suggestions: "# suggestion 1, suggestion2 oder no suggestions"
    });
});


//Handle new entry
app.post('/profile', restricted(), function(req, res) {
     res.render('pages/profile',{
        username: "User",
        entry: "Some entry: a text or a pic",
        suggestions: "# suggestion 1, suggestion2 oder no suggestions"
    });
});


app.get('css', function(req, res){
    res.render('pages/css/main.css');
});

app.get('/upload', function(req, res){
    res.render('pages/upload');
});

app.get('/logout',restricted(), function(req, res){
    req.session.destroy();
    res.render('pages/index');
});

app.post('/upload', upload.single('photo'),restricted(), (req, res)=> {
   const {filename, mimetype, size} = req.file;
    
    persistPhoto(filename, mimetype, size).
        then(() =>
            res.redirect('/feed')
        );

});

    
app.listen(8080);
