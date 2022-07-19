const fs = require('fs');

function clearPetCsvFile(req){

    const file = process.cwd() + '/uploads/' + req.file.filename;
    fs.stat(file, function (err, stats) {
       if (err) {
           return;
       }
    
       fs.unlink(file, function(err){
            if(err) return;
            console.log('file deleted successfully');
       });  
    });
 
}

function validatePetCsv(petsArray){

    if(!petsArray.length){
        throw Error("Csv file data is empty !");
    }

    let idx = 0 ;
    
    const resultErrors = petsArray.reduce((acc,curr)=>{
        let currError='';
        if(!curr?.Name){
            currError+=' Name of pet is needed';
        }
        if(!curr?.Type){
            currError+=' Type of pet is needed';
          }
        if(!curr?.Breed){
            currError+=' Breed of pet is needed';
        }
        if(!curr?.Age){
            currError+=' Age of pet is needed';
        }else if(curr?.Age && PetAge(curr.Age)){
            currError+=' Valid Age of pet is needed';
        }

        if(currError.length>0){
            acc.push({lineNumber:idx,errorMessage:currError});
        }
        idx++;
        return acc;
    }
    ,[])


    return resultErrors;
}


function PetAge(val){
    let currAge = Number(val);

    if(typeof currAge!=='number' || currAge<0 || isNaN(currAge)){
        return true;
    }


    return false;
}

 module.exports.clearPetCsvFile=clearPetCsvFile;
 module.exports.validatePetCsv=validatePetCsv;
