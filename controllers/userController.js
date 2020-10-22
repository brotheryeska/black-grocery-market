const {User, Product, Transaction} = require('../models/index')

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
            res.send(err)
        })
    }


    static getEditForm (req,res){
        const id = +req.session.payload.UserId
        User.findByPk(id)
        .then(selectedUser=> {
            res.render('./user/editProfile', {selectedUser})
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
                res.render("./user/allProduct", { products, trx })
            })
            .catch((err) => res.send(err))
    }

    static viewDetail(req, res) {
        //see spesific product
        Product.findByPk(req.params.id)
            .then(data => {
                res.render("./user/detailFlower", { products: data })
            })
            .catch((err) => res.send(err))
    }

    static getAddProduct(req, res) {
        //get url form product sm quantity
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
            }
        })
            .then(data => {
                if (!data) {
                    return Transaction.create(payload)
                }
                else if (data) {

                    let harga = data.total_price / data.quantity
                    data.total_price += harga
                    data.quantity++
                    data.save()
                    return data
                }
            })
            .then(data => {
                res.redirect('/product')
            })
            .catch(err => {
                res.send(err)
            })

    }

    

    static deleteProductTrx(req, res) {

    }

    // static postAddProduct (req,res) {
    //     //post to db transaction
    // }


}

module.exports = Controller