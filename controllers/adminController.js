const {User, Product} = require('../models/index')

class Controller{


    static welcomePage(req, res){
        res.render("homepageAdmin")
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


    static viewProductAdmin(req, res) {
        Product.findAll()
            .then(products => {
                res.render('allProductAdmin', { products })
            })
            .catch((err) => res.send(err))
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