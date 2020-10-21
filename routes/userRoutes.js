const router = require('express').Router()
const controller = require('../controllers/userController')


//welcome page after login
router.get('/', controller.welcomePage)

//see profile page
router.get('/:id/profile', controller.viewProfile)

//edit profile page
router.get('/:id/edit', controller.getEditForm)
router.post('/:id/edit', controller.postUpdate)

//add item to purchase ist
router.get('/:id/add-item', controller.addItem)
router.post('/:id/add-item', controller.postItem)

//delete item from purchase list
router.get('/:id/delete', controller.deleteItem)

module.exports = router