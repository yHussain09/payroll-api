const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://rootadmin:rootadmin@payroll-api.rhu0cp7.mongodb.net/PAYROLL-API?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to Mongo DB.')
    })
    .catch((err) => {console.error(err)});
}

module.exports = connectDB;