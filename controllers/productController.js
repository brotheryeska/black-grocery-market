
const { Product, Transaction } = require('../models/index')
class Controller {

    static allProduct(req, res) {
        let session = req.session.payload
        let products 
        Product.findAll()
            .then((data) => {
                products = data
                return Transaction.findAll({
                    include: Product,
                    where: { 
                        UserId: session.UserId 
                    }
                })
            })
            .then(trx => res.render("allProduct", {products, trx} ))
            .catch((err) => res.send(err))
        }
    
    
    

    static viewDetail(req, res) {
        //see spesific product
        Product.findByPk(req.params.id)
            .then(data => {
                res.render("detailFlower", {products: data})
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
                    
                    let harga = data.total_price/data.quantity
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
        

    static deleteProductTrx(req, res){
        
    }

    // static postAddProduct (req,res) {
    //     //post to db transaction
    // }



}

module.exports = Controller