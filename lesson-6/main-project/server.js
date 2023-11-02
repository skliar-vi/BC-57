const app = require('./app')
const mongoose = require('mongoose')
// const { DB_HOST } = 

const { dbHost, port = 3000 } = require("./config/config.js")

mongoose.connect(dbHost).then(() => {
  app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`)
  })
})
  .catch((err) => {
    console.log(err);
    process.exit(1)
  })

