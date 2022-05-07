const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/sign-up',passport.checkSignIn, usersController.signUp);
router.get('/sign-in', passport.checkSignIn, usersController.signIn);
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);
// for any further routes, access from here
// router.use('/routerName', require("./routerfile"))

//use passport as a middleware to auth.

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

module.exports = router; 