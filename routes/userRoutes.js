const router = require('express').Router()
const controller = require('../controllers/userController')
const roleUser = require('../middleware/roleUser')


//welcome page after login + middleware
router.get('/', controller.welcomePage) 

//see profile page + middleware
router.get('/profile', roleUser, controller.viewProfile)

//list product//
router.get('/product', roleUser, controller.allProduct)

//edit profile page + middleware
router.get('/edit', roleUser, controller.getEditForm) 
router.post('/edit', roleUser, controller.postUpdate) 

//deactive user + middleware
router.get('/delete', roleUser, controller.deleteUser) //done

router.get('/check-out', roleUser, controller.checkOut)

//see spesific product
router.get('/detail/:id', controller.viewDetail)

//add item to cart
router.get('/:id/add-item', controller.getAddProduct)

//delete trx
router.get('/:id1/:id2/delete-item', controller.deleteProductTrx)



module.exports = router