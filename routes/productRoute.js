const router = require('express').Router()
const controller = require('../controllers/productController')
const roleUser = require('../middleware/roleUser')
const roleAdmin = require('../middleware/roleAdmin')


//ADMIN
router.get('/admin', roleAdmin, controller.viewProductAdmin )



//////USER///////
//list product
router.get('/user', roleUser, controller.allProduct)

//see spesific product
router.get('/detail/:id', controller.viewDetail)

//add item to cart
router.get('/:id/add-item', controller.getAddProduct)

//delete trx
router.get('/:id/delete-item', controller.deleteProductTrx)

module.exports = router