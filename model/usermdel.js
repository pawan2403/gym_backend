const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    packages: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date
    },
    modified_by: {
        type: String
    }
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;