/* eslint-disable no-undef */
exports.middleWareGlobal = ( req, res, next ) => {
    res.locals.errors = req.flash('errors');
    res.locals.success= req.flash('success');
    next()
}

exports.outroMiddleWare = (req, res, next) => {
    console.log('outro middleware');
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    // console.log(req)
    // console.log(res)
    if(err && err.code == 'EBADCSRFTOKEN'){
        console.log(err)
        return res.render('404page');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}