//express
const express = require('express');
const bodyparser = require('body-parser');
//package for uploading pics
const multer  = require('multer');
/*var busboy = require('connect-busboy');
var path = require('path');     //used for file path
var fs = require('fs-extra');*/

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
const { findUserPosts } = require('./lib/services/reader');



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
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Verlinkung feed page
app.get('/feed', function(req, res) {
    //findAllPhotos()
      //  .then((photos) => 
        res.render('pages/feed');
});

//Link to profile page only for logged in users
app.get('/profile', restricted(), function(req, res) {
    const displayname = req.user.displayName;
    //req.user
    findUserPosts()
    .then((posts) =>
        res.render('pages/profile',{
            username: `"${displayname}"`,
            suggestions: "#bla,#bla2,#bla3",
            posts,
        })
    );
});


//Handle new entry
app.post('/profile', function(req, res) {
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

app.get('/logout', function(req, res){
    req.session.destroy();
    res.render('pages/index');
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


/*app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('photo'),(req, res) => {

        
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
    
    persistPhoto(filename, mimetype, size).
        then(() =>
            res.redirect('/feed')
        );

});

    
app.listen(8080);
