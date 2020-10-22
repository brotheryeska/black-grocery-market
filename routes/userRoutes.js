const router = require('express').Router()
const controller = require('../controllers/userController')
const roleUser = require('../middleware/index')


//welcome page after login + middleware
router.get('/', controller.welcomePage) //done

//signUp
router.get('/sign-up', controller.signUpForm) //done
router.post('/sign-up', controller.postRegistration) //done

//sign-in
router.get('/sign-in', controller.getSignIn) 
router.post('/sign-in', controller.postSignIn)

router.get('/sign-out', controller.logOut) //+ middleware

//see profile page + middleware
router.get('/profile', roleUser, controller.viewProfile) //done

//edit profile page + middleware
router.get('/edit', roleUser, controller.getEditForm) //done
router.post('/edit', roleUser, controller.postUpdate) //done

//deactive user + middleware
router.get('/delete', roleUser, controller.deleteUser) //done

//see purchase transaction list + middleware
router.get('/purchase-list', roleUser, controller.viewCart)//blm di cek karena blm ada datanya



//Add Stock for role admin + middleware
router.get('/:id/restock', controller.restockForm)
router.post('/:id/restock', controller.postRestock)




module.exports = router