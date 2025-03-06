const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },

    email: {
        required: true,
        type: String
    },

    password: {
        required: true,
        type: String
    },

    address: {
        required: true,
        type: String
    },

    contact: {
        required: true,
        type: Number
    },

    bloodgroup: {
        required: true,
        type: String
    },

    image: {
        type: String,
        default: ''
    },

    image_id: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        default: 'active'
    },

    lastdonatedate: {
        type: String,
        default: ''
    },
})

module.exports = mongoose.model('Donorregistration', dataSchema)