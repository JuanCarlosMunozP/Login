import User from "../model/User.model.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function registerService(req,res) {  
    const { fullName,email} = req.body;

    const password = await bcrypt.hash(req.body.password,saltRounds);

    const data = {fullName,email,password};

    const newUser = new User(data);
    
    try {
        let user = await User.findOne({fullName,email});

        if (user) return res.status(400).json({
            message:"Usuario ya existe"
        })

        const savedUser = await newUser.save();

        return res.status(201).json({success:true,message:"Register successfully",data:savedUser});
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message:"Error al registro usuario"
        })
    }
    
}

export async function loginService(req,res) {
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({
            message:"User not exists"
        })

        if (!password) {
            return res.status(400).json({
                message:"Credenciales invalidas"
            })
        }
    } catch (error) {
        console.error('Error al iniciar sesion',error);
    }
}