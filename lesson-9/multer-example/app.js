const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const { nanoid } = require('nanoid')
const app = express()
const fs = require('fs/promises')

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const tempDirPath = path.join(__dirname, 'temp')

// const multerConfig = multer.diskStorage({
//     destination: tempDirPath,
//     filename: (req, file, cb) => {
//         cb(null, `covers-${nanoid()}-${file.originalname}`)
//     }
// })

const multerConfig = multer.memoryStorage({})

const upload = multer({
    storage: multerConfig,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 mb
    }
})

const books = []
const coversDirPath = path.join(__dirname, 'public', 'covers')

app.get('/api/books', (req, res, next) => {
    res.json(books)
})
// upload.single('cover') - 1 field - 1 file
// upload.array('cover', 3) - 1 filed n - files
// upload.fields([{ name: 'cover', maxCount: 3 }, { name: 'avatar', maxCount: 1 }]) - n fileds - n files

app.post('/api/books', upload.single('cover'), async (req, res, next) => {
    try {
        // const { path: tempPath, filename } = req.file

        // const uploadPath = path.join(coversDirPath, filename)

        // await fs.rename(tempPath, uploadPath)

        const { buffer, originalname } = req.file

        const uploadPath = path.join(coversDirPath, originalname)

        fs.writeFile(uploadPath, buffer)

        const newBook = {
            title: req.body.title,
            id: nanoid(),
            cover: path.join('covers', originalname)
        }

        books.push(newBook)

        res.json(newBook)
    } catch (err) {
        await fs.unlink(req.file.path)
        next(err)
    }
})

app.listen(3000)