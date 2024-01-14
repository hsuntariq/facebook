const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        requried: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Post', postSchema);
