const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    email:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    },
    admin:{
        required:true,
        type:Boolean,
        default:false
    }
});


const UserModal = mongoose.model("user",UserSchema);

module.exports = UserModal;