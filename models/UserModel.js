const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    dateOfBirth:String,
    userName:String,
    password:String,
    contactNumber:String,
});

module.exports = mongoose.model('User', UserSchema);