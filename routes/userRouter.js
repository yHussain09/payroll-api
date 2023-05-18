const express = require('express');
const userRouter = express.Router();


const { getUsers, createUser, getUser, updateUser, deleteUser, editUser} = require('../controllers/userController');

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser).put(editUser); // put = replace and patch change

module.exports = userRouter;