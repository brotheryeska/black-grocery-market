let roleUser = function (req, res, next) {
    console.log(req.session.payload)
    if(req.session.payload == 'user'){
        next()
    }
    else {
        req.session.payload = {}
        res.redirect ('/')
    }
}
module.exports = roleUser