const AsyncHandler = require('express-async-handler');
const Caption = require('../models/captionModel')
const postCaption = AsyncHandler(async (req, res) => {
    const { user_id, caption } = req.body;
    try {
        const createdCaption = await Caption.create({
            user_id,
            caption,
        })
        res.send(createdCaption)
    } catch (error) {
        console.log(error)
    }

})

module.exports = {
    postCaption
}