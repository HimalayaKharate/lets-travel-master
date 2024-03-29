let express =  require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');
let subRouter = require('./routes/sub');
let buyRouter = require('./routes/buy');
let loginRouter = require('./routes/user_login');
const { render } = require('ejs');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', {useUnifiedTopology: true , useNewUrlParser: true});

app.use(express.json());

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
//app.use(multer({dest: 'public/images'}).single('imageFile'));
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser()); //so that cookies are automatically generated for every request.
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/email-requests',subRouter);
app.use('/buy',buyRouter);
/*That means that when the request is made on the route path which starts with /callback-requests,
then it will be redirected callback-requests.js*/
app.use('/emails', emailsRouter);
app.use('/users', usersRouter); 
app.use('/user_login', loginRouter);
app.get('/sight', async (req, res) =>{
    let id = req.query.id;
    let post = await Post.findOne({id:id});
    var log;
    let token = req.cookies['user_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
       log = 'log out'
    }else{
        log = 'log in'
    }
    res.render('sight', {
        log: log,
        title: post.title,
        imageUrl: post.imageUrl,
        date: post.date,
        text: post.text,
        mapUrl:post.mapUrl,
        price: post.price
    })
})

app.get('/user_login',(req,res)=>{
    res.render('user_login');
})

app.get('/', (req, res)=>{
    var log;
    let token = req.cookies['user_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
       log = 'log out'
    }else{
        log = 'log in'
    }
     res.render('main',{
        log: log
     });
})




app.get('/admin', (req,res) =>{
    /*to read the cookie */
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
        res.render('admin');
    }else{
        res.redirect('/login'); //redirecting sign-in page!
    }
})


app.get('/buy', (req,res) =>{
    /*to read the cookie */
    let token = req.cookies['user_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
        res.render('buy');
    }else{
        res.redirect('/user_login'); //redirecting sign-in page!
    }
})

app.get('/login', (req, res) =>{
    res.render('login');
})

app.get('/finalabout',(req,res)=>{
    var log;
    let token = req.cookies['user_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
       log = 'log out'
    }else{
        log = 'log in'
    }
     res.render('finalabout',{
        log: log
     });
})
app.get('/discover',(req,res)=>{
    var log;
    let token = req.cookies['user_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
       log = 'log out'
    }else{
        log = 'log in'
    }
     res.render('discover',{
        log: log
     });
})

app.get('/image',(req,res)=>{
    var log;
    let token = req.cookies['user_token'];
    if(token && auth.checkToken(token)){ //token should not be empty!
       log = 'log out'
    }else{
        log = 'log in'
    }
     res.render('imagegallary',{
        log: log
     });
})

app.listen(3000, () => console.log('Listening 3000...'));