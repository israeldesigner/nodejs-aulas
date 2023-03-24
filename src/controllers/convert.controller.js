/* eslint-disable no-undef */
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const ExcelModel = require('../models/ConvertModel.js');
const storage = multer.diskStorage({  
    destination:(req,file,cb)=>{  
    cb(null,'./public/uploads');  
    },  
    filename:(req,file,cb)=>{  
    cb(null,file.originalname);  
    }  
});  
const uploads = multer({storage:storage});   

exports.index = (req, res) => {
    res.render('convert');
    return
}

exports.uploadfile = (req, res) => {
    res.render('uploadfile');
    importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
    console.log(res);
    // Import Excel File to MongoDB database
    function importExcelData2MongoDB(filePath){
        // -> Read Excel File to Json Data
        const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
        // Excel Sheet Name
        name: 'Customers',
        // Header Row -> be skipped and will not be present at our result object.
        header:{
        rows: 1
        },
        // Mapping columns to keys
        columnToKey: {
        A: '_id',
        B: 'name',
        C: 'address',
        D: 'age'
        }
        }]
        });
        // -> Log Excel Data to Console
        console.log(excelData);
        /**
        { 
        Customers:
        [ 
        { _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
        { _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
        { _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
        { _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
        { _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
        ] 
        }
        */  
        // Insert Json-Object to MongoDB
        ExcelModel.insertMany(jsonObj,(err,data)=>{  
        if(err){  
            console.log(err);  
        }else{  
        res.redirect('/');  
        }  
        }); 
        fs.unlinkSync(filePath);
    }

}