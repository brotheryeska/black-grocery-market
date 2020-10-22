const router = require('express').Router()
const user = require('./userRoutes')
const admin = require('./adminRoutes')
const controller = require('../controllers/index')

//landing page
router.get('/', controller.landingPage) //done

//signUp
router.get('/sign-up', controller.signUpForm) //done
router.post('/sign-up', controller.postRegistration) //done

//sign-in
router.get('/sign-in', controller.getSignIn) //done
router.post('/sign-in', controller.postSignIn) //done

//sign-out
router.get('/sign-out', controller.logOut) //done

//to specific url
// router.use('/product', product)
router.use('/admin', admin)
router.use('/user', user)
// router.use('/transaction', transaction)


module.exports = router