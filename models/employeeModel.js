const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, `employee's name must be provided`]
    },
    age: {
        type: Number,
        required: [true, `employee's age must be provided`]
    },
    department: {
        type: String,
        enum: { 
            values: ['IT', 'Admin', 'HR'], 
            message: '{VALUE} is not supported' 
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Employee', employeeSchema);