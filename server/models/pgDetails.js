const mongoose = require('mongoose');
const User = require("../models/userModels")
const Owner = require("../models/ownersModel")

const pgSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String, 
        required: true,
    },
    furnished: {
        type: String,
        required: true,
    },
    addToFavorites: {
        type: Boolean,
        default: false,
    },
    numberOfRooms: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    facilities: [String],
    availableRooms: {
        type: Number,
        required: true,
    },  
    ratings: [
        {
            rating: {
                type: Number,
                required: true,
            },
            review: String,
            ratedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User, 
            },
        },
    ],
    images: [{ type: String }],
    description: String,
    rules: [String],
    nearbyLandmarks: [String],
    area: [{
        name: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
    },],
    city:{
        type:String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    RoomType:{
        type:String,
        required: true
    },
    ElectricityCharge:{
        type:Boolean , 
        required:true
    },
    FoodAvailable:[ String ],
    FoodChargesInclude:{
        type:Boolean ,
        required:true
    },
        securityDeposit: [
      {   price: Number ,
         duration: String , 
    }],
    independent: {
        type: Boolean,
        required: true,
    },
    extraCharges: [String],
    numberOfBathrooms: {
        type: Number,
        required: true,
    },
    numberOfBalconies: {
        type: Number,
        required: true,
    },
});



const PG = mongoose.model('PG', pgSchema);

module.exports = PG;
