import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required(), 
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password_confirmation: Joi.ref('password'),
    role:  Joi.string().valid("admin", "User").required()  
}).with('password', 'password_confirmation');

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

