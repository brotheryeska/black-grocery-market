const {User, Product} = require('../models/index')
const helper = require('../helper/convertMoney')

class Controller{


    static welcomePage(req, res){
        res.render("./admin/homepageAdmin")
    }


    static viewProfile(req,res) {
        const id = +req.session.payload.UserId
        User.findByPk(id)
        .then(selectedUser=> {
            res.render('./admin/viewProfileAdmin', {selectedUser})
        })
        .catch(err => {
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
        })
    }


    static viewProductAdmin(req, res) {
        Product.findAll()
            .then(products => {
                res.render('./admin/allProductAdmin', { products, helper })
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
            })
    }

    static getEditForm (req,res){
        const id = +req.session.payload.UserId
        User.findByPk(id)
        .then(selectedUser=> {
            res.render('./admin/editProfileadmin', {selectedUser})
        })
        .catch(err => {
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
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
            res.redirect(`/admin/profile?alert=Sucessfully edit profile`)
        })
        .catch(err => {
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
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
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
        })
    }
    

    static restockForm (req,res) {
        const role = req.session.payload.role
        const id = +req.params.id
    
        if(role === 'admin'){
            Product.findByPk(id)
            .then(restockProduct => {
                res.render('./admin/restockForm', {restockProduct})
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
            })
        }
        else {
            res.render('errorPage')
        }
    }


    static postRestock (req,res) {
        const id = +req.params.id
        Product.findByPk(id)
        .then(data => {
            const formValue = {
                name_product: req.body.name_product,
                stock: +req.body.stock + data.stock
            }
            return Product.update(formValue, {
                where: {
                    id: id
                }
            })
        })
        .then(data => {
            res.redirect('/admin/product?alert=sucess add product')
        })
        .catch(err => {
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
        })
    }



    static destroyItem (req,res) {
        const role = req.session.payload.role
        const id = +req.params.id
        if(role == 'admin'){
            Product.destroy({
                where: {
                    id: id
                }
            })
            .then(deletedItem => {
                res.redirect('/admin/product?alert=Sucess delete product')
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
            })
        }else{
            res.redirect('/product?alert=Permission denied')
        }
    }

}

module.exports = Controller