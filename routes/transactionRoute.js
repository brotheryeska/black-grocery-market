const router = require('express').Router()
const controller = require('../controllers/transactionController')


//edit purchase list
router.get('/:id/edit', controller.editCart)
router.post('/:id/edit', controller.postUpdate)

//delete item from purchase list
router.get('/:id/delete', controller.deleteItem)

//bikin rute checkout
router.get('/:id/check-out', controller.viewCart)
router.post('/:id/check-out', controller.checkOut)

module.exports = router