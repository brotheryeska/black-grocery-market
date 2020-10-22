let roleAdmin = function (req, res, next) {
    if(req.session.payload.role == 'admin'){
        next()
    }
    else {
        req.session.payload = {}
        res.redirect ('/')
    }
}

module.exports = roleAdmin