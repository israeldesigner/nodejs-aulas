/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const CadastroSchema = new mongoose.Schema({
    email: { type: String, require: true},
    password: { type: String, require: true}
})

const CadastroModel = mongoose.model('Cadastro', CadastroSchema,);

class Cadastro {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }


   async registerCadastro(){
        this.valida();
        if(this.errors.length > 0 ) return;
        await this.userExists();
        if(this.errors.length > 0 ) return;
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await CadastroModel.create(this.body);
    }

    async userExists(){
        const user = await CadastroModel.findOne({email: this.body.email });
        if(user) this.errors.push('usuário já cadastrado, efetue o login');
    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido')
        if(this.body.password.length < 3 || this.body.password.length > 50 ) {
            this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
        }

    }

    cleanUp(){
        for(const key in this.body){
           if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
           }
        }

        this.body = {
            email:this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Cadastro;
