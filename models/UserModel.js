const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'must provide first name'],
        trim: true,
        maxLength: [20, 'first name not more than 20 characters']
    },
    lastName:String,
    dateOfBirth:String,
    userName:String,
    password:String,
    contactNumber:String,
    isAdmin: {
        type:Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);