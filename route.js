const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home.controller.js');
const loginController = require('./src/controllers/login.controller.js');
const cadastroController = require('./src/controllers/cadastro.controller.js')
const testeController = require('./src/controllers/teste.controller.js');
const convertController = require('./src/controllers/convert.controller.js');

//rotas da  home
route.get('/', homeController.index);
//rotas de login
route.get('/login', loginController.index);
route.post('/login/login', loginController.login);

//rotas de cadastro
route.get('/cadastro', cadastroController.index);
route.post('/cadastro/register', cadastroController.register);

//rotas de teste
route.get('/cadastro/teste', testeController.index);

//convert
route.get('/converter', convertController.index);
route.post('/uploadfile', convertController.uploadfile);

module.exports = route;
