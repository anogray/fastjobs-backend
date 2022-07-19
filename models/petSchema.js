const mongoose= require('mongoose');

const petSchema = new mongoose.Schema({
    Name:{type: String, required:true},
    Type:{type: String, required:true},
    Breed:{type: String, required:true},
    Age:{type:Number, required:true}
});

const Pet = mongoose.model("pet", petSchema);
module.exports = Pet