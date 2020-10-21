const router = require('express').Router()
const controller = require('../controllers/transactionController')


//see purchase list
router.get('/', controller.viewCart)

//edit purchase list
router.get('/:id/edit', controller.editCart)
router.post('/:id/edit', controller.postUpdate)

//delete item from purchase list
router.get('/:id/delete', controller.deleteItem)

module.exports = router