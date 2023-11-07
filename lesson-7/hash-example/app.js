const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    // console.log(await bcrypt.genSalt())
    // const result = await bcrypt.hash(password, await bcrypt.genSalt());
    const result = await bcrypt.hash(password, 10);

    const compareResult1 = await bcrypt.compare(password, result)
    console.log(compareResult1);

    const compareResult2 = await bcrypt.compare('12345', result)
    console.log(compareResult2);
}

hashPassword('12345678')