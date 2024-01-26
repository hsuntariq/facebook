const express = require('express');
const { createPosts, getPosts } = require('../controllers/postController');
const extract = require('../middlewares/extractToken');
const router = express.Router();

router.post('/create-post', createPosts);
router.get('/get-posts', getPosts)


module.exports = router