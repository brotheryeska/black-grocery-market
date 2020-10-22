const router = require('express').Router()
const roleAdmin = require('../middleware/roleAdmin')
const controller = require('../controllers/adminController')

router.get('/', controller.welcomePage) 
router.get('/profileAdmin', roleAdmin, controller.viewProfile)
router.get('/product', roleAdmin, controller.viewProductAdmin) // --> awalnya dari /product/admin
router.get('/deleteAdmin', roleAdmin, controller.deleteUser)

//Add Stock for role admin + middleware
router.get('/restock/:id', controller.restockForm) 
router.post('/restock/:id', controller.postRestock) 

//delete stock for role admin + middleware 
router.get('/deleteProduct/', roleAdmin, controller.destroyItem)



module.exports = router