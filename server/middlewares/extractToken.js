const jwt = require('jsonwebtoken');
const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const extract = AsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
            req.user = await User.findById(decode.id)
            // console.log(req)
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Wrong Token')
        }
    } else {
        res.status(401);
        throw new Error('No token')
    }
})

module.exports = extract