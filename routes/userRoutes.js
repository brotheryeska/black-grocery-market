const router = require('express').Router()
const controller = require('../controllers/userController')


//welcome page after login
router.get('/', controller.welcomePage) //done

//signUp
router.get('/sign-up', controller.signUpForm) //done
router.post('/sign-up', controller.postRegistration) //done

router.get('/sign-in', controller.getSignIn)
router.post('/sign-in', controller.postSignIn)

//see profile page
router.get('/:id/profile', controller.viewProfile) //done

//edit profile page
router.get('/:id/edit', controller.getEditForm) //done
router.post('/:id/edit', controller.postUpdate) //done

//add item to purchase ist
router.get('/:id/add-item', controller.addItem)
router.post('/:id/add-item', controller.postItem)

//deactive user
router.get('/:id/delete', controller.deleteUser) //done

//see purchase transaction list
router.get(':id/purchase-list', controller.viewCart)//blm di cek karena blm ada datanya


module.exports = router