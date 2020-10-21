const router = require('express').Router()
const product = require('./productRoute')
const user = require('./userRoutes')
const transaction = require('./transactionRoute')

router.get('/', (req, res) => {
    res.render('homepage')
})
router.get('/product', product)
router.get('/user', user)
router.get('/transaction', transaction)


module.exports = router