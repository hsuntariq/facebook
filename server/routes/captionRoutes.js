const express = require('express');
const { postCaption } = require('../controllers/captionController');
const router = express.Router();

router.post('/post-caption', postCaption);

module.exports = router