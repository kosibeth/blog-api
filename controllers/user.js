import jwt from "jsonwebtoken"
import Joi from 'joi'
import User from "../models/user.js"
import { env } from '../env.js';


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const payload = { 
      id: user.id, 
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
    }

    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '1h' });

    res.json({ token: token })
  } catch (error) {
    return errorJson(res, error)
  }
};


export const RegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required()
});

export const register = async (req, res) => {
  try {
    const toRegister = new User({ 
      email: req.body.email, 
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name    
    });
  
    await User.register(toRegister, req.body.password);
  
    return res.send({ message: "Successful" });
  } catch (error) {
    return errorJson(res, error)
  }

};
