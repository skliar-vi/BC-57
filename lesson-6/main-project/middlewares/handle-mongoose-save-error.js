const handleMongooseSaveError = (err, data, next) => {
    err.status = 400
    next(err)
}

module.exports = handleMongooseSaveError
