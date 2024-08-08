import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';


export const createTokens = (user) => {
    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      "jwtsecretplschange",
      { expiresIn: "7d" }
    );
  
    return accessToken;
};
  

export const validateToken = async(req, res, next) => {
    const accessToken =  req.header("Authorization")
    
  
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });
  
    try { 
      const validToken = jwt.verify(accessToken, "jwtsecretplschange");
      const user = await User.findById(validToken?.id).select("-password")
      if (validToken) {
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        return next();
      }
    } catch (err) {
        console.log(err)
      return res.status(400).json({ error: err });
    }
  };