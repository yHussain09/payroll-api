const express = require('express');
const employeeRouter = express.Router();

const { getAllEmployees } = require('../controllers/employeeController');

employeeRouter.route("/").get(getAllEmployees);

module.exports = employeeRouter;