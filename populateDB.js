require('dotenv').config();

const connectDb = require('./db/connect');

const UserModel = require('./models/UserModel');

const usersJson = require('./usersData.json');

const start = async () => {
    try {
        await connectDb(process.env.MONGO_DB_URI);
        await UserModel.deleteMany();
        console.log(`all users deleted successfully!`);
        await UserModel.create(usersJson);
        console.log(`all users created successfully!`);
        process.exit(0);
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
};

start();