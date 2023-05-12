const UserModel = require('../models/UserModel');

const getUsers = (req, res) => {
    const users = UserModel.find();
    res.status(200).send({ users });
}

const createUser = async (req, res) => {
    const user = await UserModel.create(req.body);
    res.status(201).json({ user });
}

const getUser = (req, res) => {
    res.json(`user id: ${req.params.id}`);
}

const updateUser = (req, res) => {
    res.send(`update an existing user from user's controller`);
}

const deleteUser = (req, res) => {
    res.send(`delete an existing user from user's controller`);
}

module.exports = {
    getUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser
}