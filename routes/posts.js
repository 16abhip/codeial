const express = require('express');

const router = express.Router();
const PostController = require('../controllers/posts_controller');

console.log('post router is up');
router.get('/like', PostController.like);

module.exports = router;