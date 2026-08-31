const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    logo:String,

    established: {
        type: Number,
        required: true
    },

    // connects to the registered user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
});

const NGO = mongoose.model("NGO", ngoSchema);

module.exports = NGO;