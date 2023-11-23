const Joi = require("joi");
const {joiPasswordExtendCore} = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const JoiSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .lowercase()
        .required(),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .message('Please enter a valid phone number')
        .required(),

    password: joiPassword.string()
        // .custom(joiPassword) // Use joiPassword as a custom validator without additional arguments
        .required(),
});

const validate = (req, res, next) => {
    const { error } = JoiSchema.validate(req.body);
    if (error) {
        return res.json({ success: false, msg: error.details[0].message });
    } else {
        next();
    }
}

module.exports = { validate };