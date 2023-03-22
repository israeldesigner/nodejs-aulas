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
    if(err && err.code == 'EBADCSRFTOKEN'){
        return res.render('404page');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}