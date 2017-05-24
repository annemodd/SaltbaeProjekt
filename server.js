//express
const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');
//const ObjectId = require('mongodb').ObjectID;
//const url = 'mongodb://localhost:27017/192.168.99.100:32768';


const multer  = require('multer');
var busboy = require('connect-busboy');
var path = require('path');     //used for file path
var fs = require('fs-extra');

const upload = multer({
    dest: './uploads',
});

app.use(express.static("./assets"));
app.use('/uploads', express.static('./uploads'));


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



/*var upload = multer({ dest: './uploads' });

app.post('/uploads',upload.single('profileimage'),function(req,res,next){

    if (req.file) {
        console.log('Uploading File');
        var profileImageOriginlName=req.file.originalname;
        var profileImageName=req.file.name;
        var profileImageMime=req.file.mimetype;
        var profileImagePath=req.file.path;
        var profileImageExt=req.file.extension;
        var profileImageSize=req.file.size;
    }
    else
    {
        var profileImageName='noimage.png';
    }

});*/

/*app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.route('/feed')
    .post(function (req, res, next) {

        
        req.pipe(req.busboy);
        req.busboy.on('photo', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
            file.pipe(fstream);
            persistPhoto(filename, size, MimeType);
            fstream.on('close', function () {    
                console.log("Finished uploading " + filename);              
                res.redirect('/feed');      
            });
        });
    });*/


app.post('/upload', upload.single('photo'), (req, res)=> {
    const {filename, mimetype, size} = req.file;
    
    persistPhoto(filename, mimetype,size).
        then(() =>
            res.redirect('/feed')
        );
});



    
app.listen(8080);
