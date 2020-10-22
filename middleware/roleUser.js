let roleUser = function (req, res, next) {

    if(req.session.payload.role == 'user'){
       next()
    }
    else {
        req.session.payload = {}
        res.redirect ('/')
    }
}
module.exports = roleUser