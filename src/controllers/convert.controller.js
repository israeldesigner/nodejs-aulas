/* eslint-disable no-console */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const ExcelModel = require('../models/ConvertModel.js');  

exports.index = (req, res) => {
    res.render('convert');
    return
}

exports.uploadfile = (req, res) => {
    // res.render('/converter')
    try{
        console.log(`./uploads/${req.file.filename}`);
        importExcelData2MongoDB(`./uploads/${req.file.filename}`);
        // Import Excel File to MongoDB database
       async function importExcelData2MongoDB(filePath){
            // -> Read Excel File to Json Data

            const excelData = excelToJson({
                sourceFile: filePath,
                header:{
                    rows: 1
                },
                columnToKey: {
                    '*': '{{columnHeader}}'
                }
            });
            // -> Log Excel Data to Console
            await ExcelModel.deleteMany({})
            console.log(excelData);
            await Object.values(excelData).forEach((val) =>{ 
                console.log(typeof(val));
                console.log(val);
                ExcelModel.insertMany(val).then(
                    (result) => {
                        console.log(result)
                       console.log("Items added succesfully");
                    }
                  ).catch(
                    (err) => {
                       console.log(err);
                    }
                )
            });
            res.json(req.body);
            
            

            

            // Insert Json-Object to MongoDB
            // await ExcelModel.insertMany(jsObj,(err,data)=>{  
            // if(err){  
            //     console.log(err);  
            // }else{  
            //     console.log("cheguei aqui") 
            // }  
            // }); 
            // fs.unlinkSync(filePath);
        }
    }catch(e){
        console.log(e)
    }

}