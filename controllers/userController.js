const {User, Product, Transacion} = require('../models/index')

class Controller {


    static welcomePage(req,res){
        //after login page
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
        const id = +req.params.id
        
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
        const id = +req.params.id

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
        const id = +req.params.id
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


    static addItem (req,res) {
        //add item to purchaselist
    }


    static postItem (req,res) {
        //update db transaction
    }


    static deleteUser (req,res) {
        //remove item from db
        const id = +req.params.id

        User.destroy({
            where: {
                id: id
            }
        })
        .then(data => {
            res.redirect('/?alert=Sucess deactive account')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static viewCart (req,res) {
        const id = +req.params.id

        Transacion.findOne({
            where: {
                id:id
            },
            include: [Product]
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
    }

}

module.exports = Controller