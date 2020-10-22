const { User } = require('../models')

class Controller {

    static landingPage(req, res) {
        res.render('landingPage')
    }

    static signUpForm(req, res) {
        res.render('signUpForm')

    }

    static postRegistration(req, res) {
        const formValue = {
            full_name: req.body.full_name,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password
        }
        User.create(formValue)
            .then(data => {
                if (formValue.role === "user") {
                    res.redirect('/user')
                } else if (formValue.role === "admin") {
                    res.redirect('/admin')
                }
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
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
                if(req.session.payload.role == "user"){
                    res.redirect('/user')
                } else {
                    res.redirect('/admin')
                }    
            }
            else {
                res.redirect('/user/sign-in')
            }
        })
        .catch(err => {
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
        })
    }

    static logOut (req,res) {
        req.session.payload = {}
        res.redirect('/')
    }
}

module.exports = Controller