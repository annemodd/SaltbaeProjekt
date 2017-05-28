//express
const express = require('express');
const app = express();
//package for uploading pics
const multer  =   require('multer');
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
    local: {
        verify: (username, password, callback) => {
            //DB name!
            const user = YOUR_DATABASE.findUserByUsername(username);
 
            if (!user || user.password !== password) {
                return callback(null, false);
            }
 
            callback(null, user);
        },
        successRedirect: "/profile",
        failureRedirect: "/",
    },
});

const logout = require('express-passport-logout');


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

//Link to profile page only for logged in users
app.get('/profile', restricted(), function(req, res) {
    const displayname = req.user.displayName;
    //req.user
    res.render('pages/profile',{
        username: `"${displayname}"`,
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
    req.session.destroy();
    res.render('pages/index');
});


//Uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'pages/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});
const upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname);
});

app.post('pages/feed',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading image!");
        }
        res.end("upload image");
    });
});

app.listen(8080);
