import jwt from "jsonwebtoken";

export default function auth(req,res,next){
    const authHeader =  req.header.authorization;
    if(!authHeader) return res.status(401).json({message: 'Unauthorized'});
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }catch(err){
        res.status(401).json({message: 'Invalid token'});
    }
}