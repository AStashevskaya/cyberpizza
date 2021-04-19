const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')


app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/files', express.static(path.join(__dirname, './files')))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})