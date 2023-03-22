/* eslint-disable no-undef */
const Login = require('../models/LoginModel');
exports.index = (req, res) => {
    res.render('login');
    return
}

exports.login =  async (req, res) =>{

    try {
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length  > 0 ){
            req.flash('errors', login.errors);
            req.session.save(function(){
              return  res.redirect('back');
            })
            return
        }

        req.flash('success', 'login com sucesso');
        req.session.user = login.user;
        req.session.save(function(){
            return  res.redirect('back');
        })
        // return res.send(cadastro.user);
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

