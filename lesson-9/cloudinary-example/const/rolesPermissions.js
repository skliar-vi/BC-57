const { Create, Read, Update, Delete } = require("./permissions")

const rolesPermissions = {
    admin: [Create, Read, Update, Delete],
    editor: [Create, Read, Update],
    guest: [Read],
}

module.exports = rolesPermissions