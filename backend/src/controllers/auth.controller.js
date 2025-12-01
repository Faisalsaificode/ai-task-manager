import User from '../models/User.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register =  async(req, res, next) =>{
    try{
        const{name, email, password} = req.body;

        if(!email || !password) return res.status(400).json({message: 'email and password required'});

        const existing = await User.findOne({email});

        if(existing) return res.status(400).json({message: 'Email already used'});

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, passwordHash: hash});

        res.status(201).json({id:user_id,email: user.email});
    }catch(err){next(err);}
};

export const login = async(req,res,next)=>{
    try{
        const { email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(401).json({message: "Invalid credentials"});
        const ok = await bcrypt.compare(password, user.passwordHash);
        if(!ok) return res.status(401).json({message: "Invalid credentials"});
        const token = jwt.sign({ userId: user._id, role: user,role}, process.env.JWT_SECRET,{expiresIn: '1h'});
        res.json({accessToken: token});

    }catch(err){next(err);}
};