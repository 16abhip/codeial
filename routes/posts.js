const express = require('express');
const { Passport } = require('passport/lib');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');

console.log('post router is up');
router.get('/like', postController.like);
router.post('/create',passport.checkAuthentication, postController.create);
module.exports = router;