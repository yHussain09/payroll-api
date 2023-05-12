const UserModel = require('../models/UserModel');

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json({ users });
    }
    catch(error) {
        res.status(500).json({ msg:error });
    }
    
    res.status(200).send({ users });
}

const createUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json({ user });
    }
    catch(error) {
        res.status(500).json({ msg:error });
    }
    
}

const getUser = async (req, res) => {
    try {
        const { id: userID } = req.params;
        // const user = await UserModel.findById(req.params.id);
        const user = await UserModel.findOne({ _id: userID });
        if(!user) {
            return res.status(404).json(`No User found with an ID: ${ userID }`);
        }
        res.status(200).json({ user });
    }
    catch(error) {
        res.status(500).json({ msg:error });
    }
    
    
}

const updateUser = async (req, res) => {
    try {
        const { id: userID } = req.params;
        const user = await UserModel.findOneAndUpdate({ _id: userID}, req.body, {new: true, runValidators: true});
        if(!user) {
            return res.status(404).json(`No User found with an ID: ${ userID }`);
        }
        res.status(200).json({ user });
    }
    catch(error) {
        res.status(500).json({ msg:error });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id: userID } = req.params;
        const user = await UserModel.findOneAndDelete({ _id: userID });
        if(!user) {
            return res.status(404).json(`No User found with an ID: ${ userID }`);
        }
        res.status(200).json({ user });
    }
    catch(error) {
        res.status(500).json({ msg:error });
    }
}

const editUser = async (req, res) => {
    try {
        const { id: userID } = req.params;
        const user = await UserModel.findOneAndUpdate({ _id: userID}, req.body, {new: true, runValidators: true});
        if(!user) {
            return res.status(404).json(`No User found with an ID: ${ userID }`);
        }
        res.status(200).json({ user });
    }
    catch(error) {
        res.status(500).json({ msg:error });
    }
}

module.exports = {
    getUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser,
    editUser
}