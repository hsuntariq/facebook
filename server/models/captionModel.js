const mongoose = require('mongoose');

const captionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Caption', captionSchema);