/* eslint-disable no-undef */
const mongoose = require('mongoose');
const ExcelSchema = new mongoose.Schema({  
    id:{  
        type:String  
    },  
    name:{  
        type:String  
    },  
    address:{  
        type:String  
    },    
    age:{  
        type:Number  
    }
});

const ExcelModel = mongoose.model('Excel', ExcelSchema);
module.exports = ExcelModel;