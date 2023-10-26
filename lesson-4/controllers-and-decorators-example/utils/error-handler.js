const errorHandler = mainFunction => {
    const func = async (req, res, next) => {
        try {
            await mainFunction(req, res, next)
        }
        catch (err) {
            next(err)
        }
    }

    return func
}

module.exports = errorHandler