const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

console.log('post router is up');
router.get('/like', postController.like);
router.post('/create', postController.create);
module.exports = router;