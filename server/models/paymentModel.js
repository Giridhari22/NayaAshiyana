const mongoose = require("mongoose");

const BookPgSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId, // Using ObjectId to represent references
        ref: 'User', // This should match the name of your user model in MongoDB
        required: true,
      },
      PgId: {
        type: mongoose.Schema.Types.ObjectId, // Using ObjectId to represent references
        ref: 'PG', // This should match the name of your product model in MongoDB
        required: true,
      },
    //   productCount: {
    //     type: Number,
    //     required: true,
    //   },
      price: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Bookpg = mongoose.model('BookPg', BookPgSchema);

module.exports = Bookpg;
