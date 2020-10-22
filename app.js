const express = require('express')
const router = require('./routes/index')
const app = express()
const session = require('express-session')
const port = process.env.PORT || 4000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))
app.use('/', router)
app.listen(port, () => {
    console.log(`Happy-Fresh listen to http://localhost:${port}`)
})