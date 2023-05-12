const express = require('express');
const router = express.Router();


const { getUsers, createUser, getUser, updateUser, deleteUser, editUser} = require('../controllers/userController');

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser).put(editUser);

module.exports = router;