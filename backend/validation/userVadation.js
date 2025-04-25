import Joi from "joi";
import resposne from "../middleware/resposne.js";

const userRegister = Joi.object({

    username: Joi.string().required().messages({
        "string.empty": "username is not allowed to be empty",
        "any.required": "username is required",
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is not allowed to be empty.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(8).max(16).required().messages({
        "string.empty": "Password is not allowed to be Empty",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password must not exceed 16 characters.",
        "any.required": "Password is required",
    }),
});

export const validateUser = (req, res, next) => {
    const { error } = userRegister.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({
                status: resposne.successFalse,
                message: error.details[0].message
            });
    }
    next();
};

const userLogin = Joi.object({
    username: Joi.string().optional().messages({
        "string.empty": "Username cannot be empty",
    }),
    email: Joi.string().email().optional().messages({
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.',
    }),
    password: Joi.string().min(8).max(16).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password must not exceed 16 characters.",
        "any.required": "Password is required",
    }),
})
    .xor('email', 'username');

export const validateUserLogin = (req, res, next) => {
    const { error } = userLogin.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: resposne.successFalse,
            message: error.details[0].message
        });
    }
    next();
};
