const express = require('express');
const { registerUser, loginUser, getAllUser, sendResetLink, resetPassword } = require('../controllers/userController');
const router = express.Router()

router.post('/register-user', registerUser)

router.post('/login-user', loginUser)
router.get('/get-users', getAllUser);
router.post('/get-reset-link', sendResetLink);
router.post('/update-password', resetPassword);

module.exports = router;