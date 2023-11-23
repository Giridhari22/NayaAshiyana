const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true, 
        minlength: 2, 
        maxlength: 50, 
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,     
    },
    phone: {
        type: Number, 
        required: [true, "Please enter your phone number"],
     
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
     
    },
    otp: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
