const express = require('express');
const { createPosts } = require('../controllers/postController');
const extract = require('../middlewares/extractToken');
const router = express.Router();

router.post('/create-post', extract, createPosts);


module.exports = router