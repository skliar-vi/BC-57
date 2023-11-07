const handleMongooseSaveError = (err, data, next) => {
    err.status = (err.code === 11000 && err.name === 'MongoServerError') ? 409 : 400

    next(err)
}

module.exports = handleMongooseSaveError
