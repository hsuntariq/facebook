const User = require('../models/userModel')
const AsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const registerUser = AsyncHandler(async (req, res) => {
    const { f_name, l_name, m_mail, password, DOB, gender, image } = req.body;
    // check if user already exists
    const checkUser = await User.findOne({ m_mail })
    if (checkUser) {
        res.status(400);
        throw new Error('User already exists!');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await User.create(
            {
                f_name,
                l_name,
                m_mail,
                password: hashedPassword,
                DOB,
                gender,
                image
            }
        )

        res.send(createdUser)
    }

})

const loginUser = AsyncHandler(async (req, res) => {
    const { m_mail, password } = req.body;
    const findUser = await User.findOne({ m_mail })
    if (!findUser) {
        res.status(404);
        throw new Error('User does not exist');
    } else {
        if (await bcrypt.compare(password, findUser.password)) {
            res.send('Logged in successfully')
        } else {
            res.status(401);
            res.send('Invalid Credentials')
        }
    }

})

module.exports = {
    registerUser,
    loginUser
}