/* eslint-disable no-undef */
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email:    { type: String, require: true},
    password: { type: String, require: true}
})

const LoginModel = mongoose.model('Login', LoginSchema, 'cadastros');

class Login {

    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0 ) return;
        this.user = await LoginModel.findOne({email: this.body.email});
        console.log(this.user);
        if(!this.user) {
            this.errors.push("usuário ou senhas inválido");
            return;
        }
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push("senha inválida");
            this.user = null
            console.log(this.user);
            return;
        }

    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido')
        if(this.body.password.length < 3 || this.body.password.length > 50 ) this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string') this.body[key] = ''
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;