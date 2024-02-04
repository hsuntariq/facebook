const User = require('../models/userModel')
const AsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const nodeMailer = require('nodemailer')
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

        res.json(
            {
                _id: createdUser._id,
                f_name,
                l_name,
                m_mail,
                DOB,
                gender,
                image,
                token: generateToken(createdUser._id)
            }
        )
    }

})

const loginUser = AsyncHandler(async (req, res) => {
    // get the data from the user
    const { m_mail, password } = req.body;
    if (!m_mail || !password) {
        res.status(400)
        throw new Error('Please enter the fields')
    }
    const findUser = await User.findOne({ m_mail })
    if (!findUser) {
        res.status(404);
        throw new Error('User not found')
    }
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
        res.status(200);
        res.send({
            _id: findUser._id,
            f_name: findUser.f_name,
            l_name: findUser.l_name,
            m_mail: findUser.m_mail,
            DOB: findUser.DOB,
            gender: findUser.gender,
            image: findUser.image,
            token: generateToken(findUser._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid Credentials')
    }
})


const getAllUser = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users);
})


const sendResetLink = AsyncHandler(async (req, res) => {

    //  get the email
    const { email } = req.body;
    // get the user with the provided email
    const findUser = await User.findOne({ m_mail: email });
    // check if user exists
    if (!findUser) {
        res.status(404)
        throw new Error('Invalid Email address')
    } else {
        const token = uuidv4();
        const expireToken = new Date(Date.now() + 3600);
        // update the user
        findUser.resetToken = token;
        findUser.expirationTime = expireToken;
        await findUser.save();

        // send the mail
        // 1.create the configurations
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "hassan130799@gmail.com",
                pass: "qzbuunjppbcxijar"
            }
        })

        // 2. create the mail options
        const mailOptions = {
            from: "hassan130799@gmail.com",
            to: email,
            subject: "Reset your password",
            html: `
            <img width='200px' height='200px' src='https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/logo.png?raw=true' style='display:block;margin:auto;border-radius:50%;'/><br>
            <h3>Following is the reset link</h3>
            <h4>http://localhost:3000/reset-password/${token}</h4>  
            `
        }


        try {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info.response)
                }
            })
        } catch (error) {
            console.log(error)
        }

        res.send('Email sent successfully!')


    }

})


const resetPassword = AsyncHandler(async (req, res) => {
    const { token, password } = req.body;
    const findUser = await User.findOne({ resetToken: token })
    if (!findUser) {
        res.status(404);
        throw new Error('Token Expired')
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        findUser.password = hashedPassword
        findUser.resetToken = null;
        await findUser.save()
        res.send('Password updated successfully')
    }
})





const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    sendResetLink,
    resetPassword
}