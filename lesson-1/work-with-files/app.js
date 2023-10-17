// const { readFile } = require('fs')
// const fs = require('fs')

// readFile('./files/file1.txt', (some_error, data) => {
//     console.log(some_error);
//     console.log(data.toString());
// })

const { readFile, writeFile, appendFile } = require('fs').promises

const runAction = async () => {
    // const data = await readFile('./files/file1.txt', 'utf-8')
    // console.log(data)

    const data = "Hello, world!"

    // await writeFile('./files/file1.txt', data)

    appendFile('./files/file1.txt', '\tanother data')
}

runAction()

// readFile('./files/file1.txt', 'utf-8')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))