/* eslint-disable no-undef */
const Cadastro = require('../models/CadastroModel');

exports.index = (req, res) => {
    res.render('cadastro');
}

exports.register =  async (req, res) =>{

    try {
        const cadastro = new Cadastro(req.body);
        await cadastro.registerCadastro();
        if(cadastro.errors.length  > 0 ){
            req.flash('errors', cadastro.errors);
            req.session.save(function(){
              return  res.redirect('back');
            })
            return
        }

        req.flash('success', 'seu usuário foi criado com sucesso');
        req.session.save(function(){
          return res.render('login');
        })
        // return res.send(cadastro.user);
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

