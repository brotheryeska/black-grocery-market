const router = require('express').Router()
const roleAdmin = require('../middleware/roleAdmin')
const controller = require('../controllers/adminController')

router.get('/', controller.welcomePage) 
router.get('/profile', roleAdmin, controller.viewProfile)
//edit profile page + middleware
router.get('/edit', roleAdmin, controller.getEditForm) 
router.post('/edit', roleAdmin, controller.postUpdate) 

router.get('/product', roleAdmin, controller.viewProductAdmin)
router.get('/deleteAdmin', roleAdmin, controller.deleteUser)

//Add Stock for role admin + middleware
router.get('/restock/:id', roleAdmin, controller.restockForm) 
router.post('/restock/:id', roleAdmin, controller.postRestock) 

//delete stock for role admin + middleware 
router.get('/deleteProduct/:id', roleAdmin, controller.destroyItem)



module.exports = router