//express
const express = require('express');
const app = express();
const multer  =   require('multer');

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
    res.render('pages/profile');
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
