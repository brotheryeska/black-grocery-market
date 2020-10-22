const router = require('express').Router()
const controller = require('../controllers/userController')
const roleUser = require('../middleware/roleUser')
const roleAdmin = require('../middleware/roleAdmin')


//welcome page after login + middleware
router.get('/', controller.welcomePage) //done

//signUp
router.get('/sign-up', controller.signUpForm) //done
router.post('/sign-up', controller.postRegistration) //done

//sign-in
router.get('/sign-in', controller.getSignIn) //done
router.post('/sign-in', controller.postSignIn) //done

//sign-out
router.get('/sign-out', controller.logOut) //done

//see profile page + middleware
router.get('/profile', roleUser, controller.viewProfile) //done
router.get('/profileAdmin', roleAdmin, controller.viewProfile)


//edit profile page + middleware
router.get('/edit', roleUser, controller.getEditForm) //done
router.post('/editAdmin', roleUser, controller.postUpdate) //done

//deactive user + middleware
router.get('/delete', roleUser, controller.deleteUser) //done
router.get('/deleteAdmin', roleAdmin, controller.deleteUser) //done

//Add Stock for role admin + middleware
router.get('/restock/:id', controller.restockForm) //done
router.post('/restock/:id', controller.postRestock) //done

//delete stock for role admin + middleware 
router.get('/deleteProduct/', roleAdmin, controller.destroyItem)




module.exports = router