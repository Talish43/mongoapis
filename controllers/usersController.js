const {validationResult} = require("express-validator");
const UserModal = require("../models/User");
const { hashedPassword, createToken , comparePassword } = require("../services/authServices");

module.exports.register = async (req, res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const { name, email, password } = req.body;
        try {
            const emailExist = await UserModal.findOne({email});
            if(!emailExist){
                const hashed = await hashedPassword(password);
                const user = await UserModal.create({
                    name,
                    email,
                    password:hashed
                });
                const token = createToken({ id:user._id, name:user.name });
                return res.status(201).json({msg:"your account has been created",token:token});
            }
            else{
                return res.status(401).json({errors:[{msg:`${email} is already taken`}]});
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("server internal error");
        }
    }
    else{
        // validation failed
        return res.status(400).json({errors:errors.array()});
    }
    
}


// {
//     "name": "Talish",
//     "email":"mail21@GMAIL.com",
//     "password":"1234567"
// }


module.exports.login = async (req, res)=>{
    const { email, password } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const user = await UserModal.findOne({email});
            if(user){
                if(await comparePassword(password,user.password)){
                    const token = createToken({ id:user._id, name:user.name });
                    if(user.admin){
                        return res.status(201).json({token,admin:true});
                    }
                    else
                    {
                        return res.status(201).json({token,admin:false})
                    }
                }
                else{
                    return res.status(401).json({errors:[{msg:`password not matched`}]});
                }
            }
            else{
                return res.status(401).json({errors:[{msg:`${email} is not found`}]});
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("server internal error");
        }
    }
    else{
        // validation failed
        return res.status(401).json({errors:errors.array()});
    }
    
}