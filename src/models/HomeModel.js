/* eslint-disable no-undef */
const mongoose = require('mongoose');
const HomeSchema = new mongoose.Schema({
    titulo:{ type: String, require: true},
    descricao: String
})

const HomeModel = mongoose.model('home', HomeSchema);
module.exports = HomeModel;