const router = require('express').Router()
const controller = require('../controllers/productController')

//list product
router.get('/', controller.allProduct)

//see spesific product
router.get('/detail/:id', controller.viewDetail)

//add item to cart
router.get('/:id/add-item', controller.addItem)
router.post('/:id/add-item', controller.postItem)

module.exports = router