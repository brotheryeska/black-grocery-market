
const { Product, Transaction } = require('../models/index')
class Controller {

    static allProduct(req, res) {
        let products 
        Product.findAll()
            .then((data) => {
                products = data
                return Transaction.findAll({
                    include: Product,
                    where: { UserId: 6 }
                })
            })
            // .then(data => res.send(data))
            .then(trx => res.render("allProduct", {products, trx} ))
            .catch((err) => res.send(err))
    }

    static viewDetail(req, res) {
        //see spesific product
        Product.findByPk(req.params.id)
            .then((data) => res.render("detailFlower", { products: data }))
            .catch((err) => res.send(err))
    }

    static getAddProduct(req, res) {
        let payload = {
            UserId: 6,
            ProductId: req.params.id,
            quantity: 1,
        }

        Transaction.findOne({
            where: {
                ProductId: payload.ProductId,
                UserId: 6
            }
        })
            .then((data) => {
                if (!data) {
                    return Transaction.create(payload)
                } else if (data) {
                    console.log(data)
                    let harga = data.total_price / data.quantity
                    data.total_price += harga
                    data.quantity++
                    data.save()
                    return data
                }
            })
            .then((data) => {
                res.redirect('/product')
            })
            .catch((err) => res.send(err))
        // Transaction.create()
    }

    static deleteProductTrx(req, res){

    }

    // static postAddProduct (req,res) {
    //     //post to db transaction
    // }



}

module.exports = Controller