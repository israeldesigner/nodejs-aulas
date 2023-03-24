/* eslint-disable no-undef */
const mongoose = require('mongoose');
const ExcelSchema = new mongoose.Schema({  
    name:{  
        type:String  
    },  
    email:{  
        type:String  
    },    
    age:{  
        type:Number  
    }
});

const ExcelModel = mongoose.model('Excel', ExcelSchema);
module.exports = ExcelModel;