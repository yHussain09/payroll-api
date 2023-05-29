const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'must provide organization name'],
        trim: true,
    },
    email: {
        type: String
    },
    contactNumber: {
        type: String
    },
    webLink: {
        type: String
    },
    location: {
        type: String
    },
    address: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Organization', OrganizationSchema);