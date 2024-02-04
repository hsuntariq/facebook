const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: [true, 'Please enter name']
    },
    l_name: {
        type: String,
        required: [true, 'Please enter l_name']
    },
    m_mail: {
        type: String,
        required: [true, 'Please enter mobile number']
    },

    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    DOB: {
        type: String,
        required: [true, 'Please enter date of birth']
    },
    gender: {
        type: String,
        required: [true, 'Please choose gender']
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    expirationTime: {
        type: Date,
        default: null
    }

})

module.exports = mongoose.model('User', userSchema)
