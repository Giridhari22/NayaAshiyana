const { number } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "Please enter your name"],
        trim: true, // Remove leading/trailing whitespace
        minlength: 2, // Minimum length of 2 characters
        maxlength: 50, // Maximum length of 50 characters
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,     
    },
    phone: {
        type: String, // Changed to String to support various phone number formats
        // required: [true, "Please enter your phone number"],
     
    },
    password: {
        type: String,
        // required: [true, "Please enter a password"],
     
    },
    // role:{
    //     type:Number,
    //     /**1 => user 2 => */
    // },
    otp: {
        type: String
    },
    googleId:{
        type:String
    },
    providerName:{
        type:String
    },
    githubId :{
        type:String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
