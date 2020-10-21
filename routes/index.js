const router = require('express').Router()
const product = require('./productRoute')
const user = require('./userRoutes')
const transaction = require('./transactionRoute')

router.get('/', (req, res) => {
    res.render('homepage')
})
router.use('/product', product)
router.use('/user', user)
router.use('/transaction', transaction)


module.exports = router