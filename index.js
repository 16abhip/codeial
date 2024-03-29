const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
// app.use(cookieParser());


app.use(expressLayouts);
// use express router

// extract style and script from sub pages into the layout

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// static files

app.use(express.static('./assets'));

// set up the view engine

app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store session cooki ein th edb
app.use(session({
    name: 'codeial',
    // to do secrete befor deployment
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_development',
            mongooseConnection:db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));


app.listen(port, function(err)
{
    if(err)
    {
        return console.log(`Error in running in server: ${err}`);
    }
    return console.log(`Server is up and running on port: ${port}`);
});

