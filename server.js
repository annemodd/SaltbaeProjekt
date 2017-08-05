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
        successRedirect: "/auth/callback",
        failureRedirect: "/",
    },
});

const logout = require('express-passport-logout');
const { persistPhoto, persistUser, persistText, deleteEntry, persistHashtag } = require('./lib/services/persister');
const { findUserPosts, findAllPosts, findCategory } = require('./lib/services/reader');
const { isImagetype} = require('./lib/services/validator');


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


//Link to check user
app.get('/auth/callback',restricted(), async(req,res)=>{
    await persistUser(req.user.displayName, req.user.id);
    res.redirect('/feed');
});

// Verlinkung feed page
app.get('/feed', restricted(), async(req, res)=>{
    const posts = await findAllPosts();
    //const posts = await findCategory(req.body.option);
    res.render('pages/feed',{
            posts
    });
});

app.get('/funny', restricted(), async(req, res)=>{
    const posts = await findCategory('funny');
    res.render('pages/feed',{
            posts
    });
});

app.get('/selfie', restricted(), async(req, res)=>{
    const posts = await findCategory('selfie');
    res.render('pages/feed',{
            posts
    });
});

app.get('/nature', restricted(), async(req, res)=>{
    const posts = await findCategory('nature');
    res.render('pages/feed',{
            posts
    });
});

app.get('/animals', restricted(), async(req, res)=>{
    const posts = await findCategory('animals');
    res.render('pages/feed',{
            posts
    });
});

app.get('/travel', restricted(), async(req, res)=>{
    const posts = await findCategory('travel');
    res.render('pages/feed',{
            posts
    });
});

app.get('/food', restricted(), async(req, res)=>{
    const posts = await findCategory('food');
    res.render('pages/feed',{
            posts
    });
});

app.get('/technology', restricted(), async(req, res)=>{
    const posts = await findCategory('technology');
    res.render('pages/feed',{
            posts
    });
});

app.get('/politics', restricted(), async(req, res)=>{
    const posts = await findCategory('politics');
    res.render('pages/feed',{
            posts
    });
});

app.get('/news', restricted(), async(req, res)=>{
    const posts = await findCategory('news');
    res.render('pages/feed',{
            posts
    });
});

//Link to profile page only for logged in users
app.get('/profile', restricted(), async(req, res) => {
    const displayname = req.user.displayName;
    const posts = await findUserPosts(req.user.id);
    res.render('pages/profile',{
        username: `"${displayname}"`,
        posts,
    })
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

app.post('/uploadFile', upload.single('photo'), async(req, res) => {
    const {filename, mimetype, size} = req.file;
    const category = req.body.categories;
    //if mimetype not undefined
    if(isImagetype(mimetype)){
        await persistPhoto(filename, mimetype, size, req.user.id, category);
        res.redirect('/feed');
    }else{
        res.redirect('/upload');
        //Error message to user
    }
});


app.post('/uploadText',upload.single('text'), async(req, res) => {
    const inputText = req.body.inputText;
    const category = req.body.categories;
    if(inputText.length >= 5 && inputText.length <= 5000)
        await persistText(inputText,req.user.id, category);
    res.redirect('/feed')
});

app.post('/feed', upload.single('hashtag'), async(req, res) => {
    const hashtag = req.body.hashtag;
    const postid = req.body.postid;
    console.log('Matches:'+ hashtag.match(/[^A-Za-z]/));
    if(hashtag.match(/[^A-Za-z]/) === null 
        && hashtag.length >= 2
        && hashtag.length <= 50){
        await persistHashtag(postid, hashtag);
    }
    res.redirect('/feed');
}
);

app.listen(8080, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Saltbae is running ...`);
});
