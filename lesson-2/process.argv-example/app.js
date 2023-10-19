const { getAllBooks, getById, updateById, createBook, deleteBook } = require('./books/index')

const invokeAction = async ({ action, id, title, author }) => {
    switch (action) {
        case 'list':
            const books = await getAllBooks()
            // return console.log('I can return list of all books')
            return console.log(books)
        // break;
        case 'getById':
            const book = await getById(id)

            return console.log(book)
        case 'updateById':
            const updatedBook = await updateById(id, { title, author })

            return console.log(updatedBook);
        case 'createBook':
            const createdBook = await createBook({ title, author })

            return console.log(createdBook);
        case 'deleteBook':
            const deletedBook = await deleteBook(id)

            return console.log(deletedBook);
        default:
            return console.log('Action not found');
    }
}

// invokeAction({ action: 'list' })
// invokeAction({ action: 'getById', id: 'e1Tpn_I3wBkLRdEY6wG0lb' })
// invokeAction({
//     action: 'updateById',
//     id: 'e1Tpn_I3wBkLREY6wG0lb',
//     title: 'Very interesting book',
//     author: 'Somebody'
// // })
// invokeAction({
//     action: 'createBook',
//     title: 'Very interesting book',
//     author: 'Somebody else'
// })
// invokeAction({
//     action: 'deleteBook',
//     id: 'CTHE0f1kkWwqS5sL2tI8_'
// })

// console.log(process.argv);
const actionIndex = process.argv.indexOf('--action')

if (actionIndex !== -1) {
    const action = process.argv[actionIndex + 1]

    invokeAction({ action })
}


