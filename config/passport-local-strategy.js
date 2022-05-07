const passport = require('passport');
const User = require('../models/user');
const user  = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// authe using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    }, 
    function(email, password, done)
    {
        // find a user and establish the identity
         User.findOne({email: email},function(err, user) {
             if(err)
             {
                console.log('Error in finding user ==> Passport: ', err);
                return done(err);
             }
             if(!user || user.password != password)
             {
                 console.log('Invalid Username/Password');
                 return done(null ,false);
             }
             else{
                 return done(null, user);
             }

         });
    }
));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done)
{
    done(null, user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done)
{
    User.findById(id, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user ==> Passport: ', err);
            return done(err);
        }
        return done(null ,user);
    });
});

//check if the user is authenciated

passport.checkAuthentication = function(req, res, next)
{
    // if the user the sign in then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not sign in
    return res.redirect('/users/sign-in');
};


passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed inn user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

passport.checkSignIn = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    next();
};

module.exports = passport;