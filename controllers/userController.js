const UserModel = require('../models/UserModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../error/custom-error');

const getUsers = asyncWrapper(async (req, res) => {
    const users = await UserModel.find({});
    res.status(200).json({ users });
}); 

const createUser = asyncWrapper(async (req, res) => {
    const user = await UserModel.create(req.body);
    res.status(201).json({ user });    
});

const getUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params;
    // const user = await UserModel.findById(req.params.id);
    const user = await UserModel.findOne({ _id: userID });
    if(!user) {
        return new createCustomError(`No User found with an ID: ${ userID }`, 404);
        // const error = new Error('Not Found');
        // error.statusCode(404)
        // return next(error);
        // return res.status(404).json(`No User found with an ID: ${ userID }`);
    }
    res.status(200).json({ user });
});

const updateUser = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params;
    const user = await UserModel.findOneAndUpdate({ _id: userID}, req.body, {new: true, runValidators: true});
    if(!user) {
        return res.status(404).json(`No User found with an ID: ${ userID }`);
    }
    res.status(200).json({ user });
});

const deleteUser = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params;
    const user = await UserModel.findOneAndDelete({ _id: userID });
    if(!user) {
        return res.status(404).json(`No User found with an ID: ${ userID }`);
    }
    res.status(200).json({ user });
});

const editUser = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params;
    const user = await UserModel.findOneAndUpdate({ _id: userID}, req.body, {new: true, runValidators: true, overwrite: true});
    if(!user) {
        return res.status(404).json(`No User found with an ID: ${ userID }`);
    }
    res.status(200).json({ user });
});

module.exports = {
    getUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser,
    editUser
}