const rolesPermissions = require("../const/rolesPermissions")
const { HttpError } = require("../helpers")

const can = (permission) => {
    return (req, res, next) => {
        const { role } = req.user

        const usersPermisions = rolesPermissions[role]

        if (!usersPermisions.includes(permission)) {
            next(HttpError(403))
        }

        next()
    }
}

module.exports = can