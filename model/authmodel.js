const mongoose = require('mongoose');
// const validator = require('validator');

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },

});

const authModel = mongoose.model('authentication', authSchema);

module.exports = authModel