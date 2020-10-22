const {User, Product, Transaction} = require('../models/index')
const helper = require('../helper/convertMoney')

class Controller {

    static welcomePage(req, res){
        res.render("./user/homepage")
    }

    static viewProfile(req,res) {
        const id = +req.session.payload.UserId
        User.findByPk(id)
        .then(selectedUser=> {
            res.render('./user/viewProfile', {selectedUser})
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
            res.render('./user/editProfile', {selectedUser})
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
            res.redirect(`/user/profile?alert=Sucessfully edit profile`)
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

    static allProduct(req, res) {
        let session = req.session.payload.UserId
        let products
        Product.findAll()
            .then((data) => {
                products = data
                return Transaction.findAll({
                    include: Product,
                    where: {
                        UserId: session
                    }
                })
            })
            .then(trx => {
                res.render("./user/allProduct", { products, trx, helper})
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
            })
    }

    static viewDetail(req, res) {
        Product.findByPk(req.params.id)
            .then(data => {
                res.render("./user/detailFlower", { products: data })
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
            })
    }


    static getAddProduct(req, res) {

        let session = req.session.payload

        let payload = {
            UserId: session.UserId,
            ProductId: req.params.id,
            quantity: 1,
        }

        Transaction.findOne({
            where: {
                ProductId: payload.ProductId,
                UserId: session.UserId
            }, include: Product
        })
            .then(data => {
                if (!data) {
                    return Transaction.create(payload)
                }
                else if (data) {
                    console.log(data.Product.stock)
                    let harga = data.total_price / data.quantity
                    console.log(currentStock)
                    data.total_price += harga
                    data.quantity++
                    
                    data.save()
                    return data
                }
            })
            .then(data => {
                let currentStock = data.Product.stock - 1
                data.Product.stock = currentStock
                res.redirect('/user/product')
            })
            .catch(err => {
                let tampErr = []
                err.errors.forEach(el => {
                    tampErr.push(el.message)
                })
                res.render('errorPage', {tampErr})
            })
    }

    

    static deleteProductTrx(req, res) {
        const id = +req.params.id
        Transaction.findByPk({
            where: {
                id: id
            }
        })
        .then(data => {
            res.redirect('/user/product?alert=sucess delete from cart')
        })
        .catch(err => {
            let tampErr = []
            err.errors.forEach(el => {
                tampErr.push(el.message)
            })
            res.render('errorPage', {tampErr})
        })
    }

}

module.exports = Controller