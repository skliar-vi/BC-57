const messages = {
    404: 'Not found',
    403: 'Not authorized', // || Forbidden
    401: 'Not authenticated',
    400: 'Bad request',
}

const HttpError = (status, message = messages[status]) => {
    const error = new Error(message)
    error.status = status
    return error
}

module.exports = HttpError