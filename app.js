const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', router)
app.listen(port, () => {
    console.log(`Happy-Fresh listen to http://localhost:${port}`)
})