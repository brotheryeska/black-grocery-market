const router = require('express').Router()
const controller = require('../controllers/productController')
const roleAdmin = require('../middleware/roleAdmin')
//see spesific product
router.get('/detail/:id', controller.viewDetail)

//add item to cart
router.get('/:id/add-item', controller.getAddProduct)

// router.post('/:id/add-item', controller.postAddProduct)
router.get('/:id/delete-item', controller.deleteProductTrx)

module.exports = router