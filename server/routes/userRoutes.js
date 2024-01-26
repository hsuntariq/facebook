const express = require('express');
const { registerUser, loginUser, getAllUser } = require('../controllers/userController');
const router = express.Router()

router.post('/register-user', registerUser)

router.post('/login-user', loginUser)
router.get('/get-users', getAllUser);

module.exports = router;