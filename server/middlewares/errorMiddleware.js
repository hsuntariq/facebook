const errorHandler = (err, req, res, next) => {
    res.json({
        error: err.message
    })
}

module.exports = errorHandler