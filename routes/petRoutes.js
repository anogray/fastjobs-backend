const express       = require("express"),
      router        = express.Router(),
      path          = require('path'),
      multer        = require('multer'),
      storage       = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, path.join(__dirname, '../uploads/'));
        },
        filename: (req,file,cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
        }
        }),
      upload        = multer({storage: storage}),
      mongooseId = require("mongoose").Types.ObjectId,
      csvtojson = require('csvtojson'),
      Pet = require("../models/petSchema");
      const {clearPetCsvFile, validatePetCsv} = require("../utils");


//getAll Pets

router.get("/pet",async(req,res)=>{

try{
    
    const response = await Pet.find();

    return res.status(200).json({success:true, dataMessage:response});
    
}catch(err){
    
    return res.status(404).json({success:false, errorMessage:err.message});
    
}

})
      

//get Pet be Id

router.get("/pet/:petId",async(req,res)=>{
          
    try{
        if(!req.params?.petId || !mongooseId.isValid(req.params.petId)){
            throw Error("Need a valid pet id")
        }
        
        const response = await Pet.findById(req.params.petId);
        
        if(!response){
            throw Error("Document not found !")
        }
        
        return res.status(200).json({success:true, dataMessage:response});
        
    }catch(err){
        return res.status(404).json({success:false, errorMessage:err.message});
        
    }
    
})

//Post csv doc having pets information and store into db

router.post("/pet", upload.single('dogFileCsv'), async(req,res)=>{

    try{

        let localpath = process.cwd() + '/uploads/' + req.file.filename;

        const jsonArray= await csvtojson().fromFile(localpath);

        //validate csv fields if errors don't proceed to write in db, throw errors present in csv
        const validPetData = validatePetCsv(jsonArray);

        if(validPetData.length>0){
            clearPetCsvFile(req);
            return res.status(404).json({success:false, errorMessage:{message:'Csv file has an issue', data:validPetData}});
        }

        const response = await Pet.insertMany(jsonArray);

        clearPetCsvFile(req);

        return res.status(200).json({success:true, dataMessage:response});

    }catch(err){
        clearPetCsvFile(req)
        return res.status(404).json({success:false, errorMessage:err.message});

    }

})


//Patch modify the pet information by sending the petId and the fields to update

router.patch("/pet/:petId",async(req,res)=>{

    try{

        if(!req.params?.petId  || !mongooseId.isValid(req.params.petId)){
            throw Error("Need a valid pet id")
        }

        let obj={};

        if(req.body.Name){
            obj.Name=req.body.Name;
        }

        if(req.body.Breed){
            obj.Breed=req.body.Breed; 
        }
        if(req.body.Age){
            obj.Age=req.body.Age;
        }

        if(!obj.Name && !obj.Breed && !obj.Age){
            throw Error("Please send some field like Name/Breed/Age");
        }

        const response = await Pet.findByIdAndUpdate(req.params.petId, obj,{new:true});

        if(!response){
            throw Error("Document not found !")
        }

        return res.status(200).json({success:true, dataMessage:response});

    }catch(err){

        return res.status(404).json({success:false, errorMessage:err.message});

    }

})

//delete pet document by id

router.delete("/pet/:petId",async(req,res)=>{

    try{

        if(!req.params?.petId  || !mongooseId.isValid(req.params.petId)){
            throw Error("Need a valid pet id")

        }

        const response = await Pet.findByIdAndDelete(req.params.petId);
        
        if(!response){
            throw Error("Document not found !")
        }
        return res.status(200).json({success:true, dataMessage:response});

    }catch(err){

        return res.status(404).json({success:false, errorMessage:err.message});

    }

})






module.exports=router;