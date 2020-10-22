const {User, Product, Transaction} = require('../models/index')

class Controller {


    static welcomePage(req,res){
        //after login page
        // console.log(req.session)
        res.render('homepage-session')
    }

    static signUpForm(req,res) {
        res.render('signUpForm')
    }

    static postRegistration (req,res) {
        const formValue = {
            full_name: req.body.full_name,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password
        }
        User.create(formValue)
        .then(data => {
            res.redirect('/user')
        })
        .catch(err => {
            res.send(err)
        })
    }


    static viewProfile(req,res) {
        //find one profile user
        const id = +req.session.payload.UserId
        
        User.findByPk(id)
        .then(selectedUser=> {
            res.render('viewProfile', {selectedUser})
        })
        .catch(err => {
            res.send(err)
        })
    }


    static getEditForm (req,res){
        //edit profile
        const id = +req.session.payload.UserId

        User.findByPk(id)
        .then(selectedUser=> {
            res.render('editProfile', {selectedUser})
        })
        .catch(err => {
            res.send(err)
        })
    }


    static postUpdate (req,res) {
        //edit profile
        const id = +req.session.payload.UserId
        const formValue = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        }
        User.update(formValue, {
            where: {
                id: id
            }
        })
        .then(updatedProfile => {
            res.redirect(`/user/${id}/profile?alert=Sucessfully edit profile`)
        })
        .catch(err => {
            res.send(err)
        })
    }


    static deleteUser (req,res) {
        //remove item from db
        const id = +req.session.payload.UserId

        User.destroy({
            where: {
                id: id
            }
        })
        .then(data => {
            req.session.payload = {}
            res.redirect('/?alert=Sucess deactive account')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static viewCart (req,res) {
        const id = +req.session.payload.UserId
        // res.send('ini cart page')

        Transaction.findAll({
            where: {
                UserId: id
            },
            include: Product
        })
        .then(purchase => {
            // res.send(purchase)
            res.render('purchaseList', {purchase})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getSignIn (req,res) {
        res.render('logInPage')
    }

    static postSignIn(req,res) {
        const formValue = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: formValue.email
            }
        })
        .then(selectedUser => {
            if(selectedUser.password == formValue.password){
                req.session.payload = {
                    isLogin: true, 
                    UserId : selectedUser.id,
                    role: selectedUser.role
                }
                res.redirect('/user')
            }
            else {
                res.redirect('/user/sign-in')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static restockForm (req,res) {
        const id = +req.params.id
        Transaction.findOne({
            where: {
                ProductId : id      
            }
        })
        .then(restockProduct => {
            res.render('restockForm', {restockProduct})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postRestock (req,res) {

    }

    static logOut (req,res) {
        req.session.payload = {}
        res.redirect('/')
    }

}

module.exports = Controller