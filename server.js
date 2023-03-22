/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(process.env.CONNECTIONSTRING);
        console.log("conectei a base de dados");
        app.emit("pronto");
    })
    .catch((e) => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./route.js');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middleWareGlobal, checkCsrfError, csrfMiddleware} = require ('./src/middlewares/middleware.js');

// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({  extend: true }));
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use('/cadastro', express.static(__dirname + '/dist'));

const sessionOptions = session({
    secret: 'fdslsdlsdjkfsjkdlf90f00djajbflfkdllkjfdjlkdfs',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middleWareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(4200, () => {
        console.log('acessar http://localhost:4200')
        console.log("servidor está executando");
    });
})