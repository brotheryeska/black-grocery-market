const {Product} = require('../models/index')
class Controller {

    static allProduct (req, res){
        //list product
        Product.findAll()
        .then((data) => res.render("allProduct", {products: data}))
        .catch((err) => res.send(err))
    }

    static viewDetail (req,res) {
        //see spesific product
        Product.findByPk(req.params.id)
        .then((data) => res.render("detailFlower", {products:data}))
        .catch((err) => res.send(err))
    }

    // static getAddProduct (req,res) {
    //     //get url form product sm quantity
    //     res.render('addProduct')
    // }

    // static postAddProduct (req,res) {
    //     //post to db transaction
    // }



}

module.exports = Controller