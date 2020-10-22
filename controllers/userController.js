const {User, Product, Transaction} = require('../models/index')

class Controller {


    static welcomePage(req,res){
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
        Transaction.findAll({
            where: {
                UserId: id
            },
            include: Product
        })
        .then(purchase => {
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
        const role = req.session.payload.role
        const id = +req.params.id
        console.log(role)
        if(role === 'admin'){
            Product.findByPk(id)
            .then(restockProduct => {
                res.render('restockForm', {restockProduct})
            })
            .catch(err => {
                res.send(err)
            })
        }
        else {
            res.send(err)
        }
    }


    static postRestock (req,res) {
        const formValue = {
            name_product: req.body.name_product,
            stock: +req.body.stock
        }
        const id = +req.params.id
        Product.update(formValue, {
            where: {
                id: id
            }
        })
        .then(data => {
            console.log(data)
            res.redirect('/product/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logOut (req,res) {
        req.session.payload = {}
        res.redirect('/')
    }

    static destroyItem (req,res) {
        const role = req.session.payload.role
        const id = +req.params.id
        if(role == 'admin'){
            Product.findByPk({
                where: {
                    id:id
                }
            })
            .then(deletedItem => {
                res.redirect('/product?alert=Sucess delete product')
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            res.redirect('/product?alert=Permission denied')
        }
    }

}

module.exports = Controller