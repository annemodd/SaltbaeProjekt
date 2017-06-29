//express
const express = require('express');
const bodyparser = require('body-parser');
//package for uploading pics
const multer  = require('multer');

const app = express();
const ArrayList = require('arraylist');
//package for login
const sso = require('@akoenig/sso');

const restricted = sso(app, {
    facebook: {
        clientID        : '1162182387237775',
        clientSecret    : '0417ba8a1f0392dc48c5aba3eaa41dea',
        callbackURL     : 'http://localhost:8080/auth/facebook/callback',
        successRedirect: "/feed",
        failureRedirect: "/",
    },
});

const logout = require('express-passport-logout');
const { persistPhoto, persistUser, persistText, deleteEntry, persistHashtag } = require('./lib/services/persister');
const { findUserPosts, findAllPosts , findAllHashtags } = require('./lib/services/reader');


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

app.get('/feed', restricted(), (req, res)=>{
    findAllPosts()
        .then((posts) => 
        res.render('pages/feed',{
            posts
        }));
      /* findAllHashtags()
    .then((hashtags)=>
        res.render('pages/feed',{
            hashtags
        }));*/

});

//Link to profile page only for logged in users
app.get('/profile', restricted(), function(req, res) {
    const displayname = req.user.displayName;
     persistUser(req.user.displayName, req.user.id);
    findUserPosts(req.user.id)
    .then((posts) =>
        res.render('pages/profile',{
            username: `"${displayname}"`,
            suggestions: "#bla,#bla2,#bla3",
            posts,
        })
    );
});

app.get('/delete/:id', async function(req,res){
    const id = req.params.id;
    await deleteEntry(id);
    res.redirect('/profile');
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

app.post('/uploadFile', upload.single('photo'), (req, res) => {
    const {filename, mimetype, size} = req.file;
    
    persistPhoto(filename, mimetype, size, req.user.id).
        then(() =>
            res.redirect('/feed')
        );
});

app.post('/uploadText',upload.single('text'), (req, res) => {
     const inputText = req.body.inputText;

    persistText(inputText,req.user.id).
        then(() => {
            res.redirect('/feed')
        });
});

app.post('/feed', upload.single('hashtag'), (req, res) => {
    const hashtag = req.body.hashtag;
    const postid = req.params.id;
    persistHashtag(postid, hashtag).then(()=>res.redirect('/feed'));
}
);

app.listen(8080, (err) => {
    if (err) {
        return console.error(err);
    }

    console.log(`Saltbae is running ...`);
});
