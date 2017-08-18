//express
const express = require('express');
const bodyparser = require('body-parser');
//package for uploading pics
const multer  = require('multer');

const app = express();
const ArrayList = require('arraylist');
//package for login
const sso = require('@akoenig/sso');

//Database user
//Secret

const restricted = sso(app, {
    facebook: {
        clientID        : '1162182387237775',
        clientSecret    : '0417ba8a1f0392dc48c5aba3eaa41dea',
        callbackURL     : 'https://hausaufgabe.now.sh/auth/facebook/callback',
        successRedirect: "/auth/callback",
        failureRedirect: "/",
    },
});

const logout = require('express-passport-logout');
const { persistPhoto, persistUser, persistText, deleteEntry, persistHashtag } = require('./lib/services/persister');
const { findUserPosts, findAllPosts, findCategory } = require('./lib/services/reader');
const { isImagetype, isValidHashtag, isValidPostText} = require('./lib/services/validator');

const FB = require('fb');


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
    const login = req.isAuthenticated();
     res.render('pages/about',{
        login
    });
});

//Link to error page
app.get('/error', function(req,res) {
    //when an error occurs the user will be logged out
    req.session.destroy();
    res.render('pages/error');
    
});


//Link to check user
app.get('/auth/callback',restricted(), async(req,res)=>{
    try{
        await persistUser(req.user.displayName, req.user.id);
        res.redirect('/feed');
    }catch(err){
        console.error(err);
        res.redirect('/error');

    }
});

// Verlinkung feed page
app.get('/feed', restricted(), async(req, res)=>{
    try{
        const posts = await findAllPosts();
        //const posts = await findCategory(req.body.option);
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/funny', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('funny');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/selfie', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('selfie');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/nature', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('nature');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/animals', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('animals');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/travel', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('travel');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/food', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('food');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/technology', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('technology');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/politics', restricted(), async(req, res)=>{
    try{
        const posts = await findCategory('politics');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.get('/news', restricted(), async(req, res)=>{
    try {
        const posts = await findCategory('news');
        res.render('pages/feed',{
                posts
        });
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

//Link to profile page only for logged in users
app.get('/profile', restricted(), async(req, res) => {
    try{
        const displayname = req.user.displayName;
        const posts = await findUserPosts(req.user.id);
        res.render('pages/profile',{
            username: `"${displayname}"`,
            posts,
        })
    }catch(err){
        console.error(err);
        res.send("Ooops something went wrong...");
    }
});

app.get('/delete/:id', async function(req,res){
    try{
        const id = req.params.id;
        await deleteEntry(id);
        res.redirect('/profile');
     }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});


app.get('css', function(req, res){
    res.render('pages/css/main.css');
});

app.get('/upload', restricted(), function(req, res){
    res.render('pages/upload');
});

app.get('/logout', function(req, res){
    req.session.destroy();
    res.render('pages/index');
});

app.post('/uploadFile', upload.single('photo'), async(req, res) => {
    try{
        const {filename, mimetype, size} = req.file;
        const category = req.body.categories;
        if(isImagetype(mimetype)){
            await persistPhoto(filename, mimetype, size, req.user.id, category);
            res.redirect('/feed');
        }else{
            res.redirect('/upload');
        } 
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.post('/uploadText', upload.single('text'), async(req, res) => {
    const inputText = req.body.inputText;
    const category = req.body.categories;
    try{
        if(isValidPostText(inputText));
            await persistText(inputText,req.user.id, category);
        res.redirect('/feed')
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
});

app.post('/feed', upload.single('hashtag'), async(req, res) => {
    const hashtag = req.body.hashtag;
    const postid = req.body.postid;
    try{
        if((isValidHashtag(hashtag))){
            await persistHashtag(postid, hashtag);
        }
        res.redirect('/feed');
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
}
);


/*app.post('/share/:id?', function(req,res) {
 const url = 'https://graph.facebook.com/me/feed';
 const params = {
  access_token: req.session.access_token,
  message: req.body.text,
   link: req.body.url
  
 };
 request.post({url: url, qs: params}, function(err, resp, body) {
  if (err) {
   console.error(err)
    return;
  }
  const user_id = req.user.id;
  const post_id = req.post_id;
  const post_url = "https://www.facebook.com/"+user_id+"/posts/"+post_id;
  res.send(post_url);
  res.redirect('/profile');
 });
});*/


app.listen(8080, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Saltbae is running ...`);
});
