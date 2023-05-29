const express = require('express');
const employeeRouter = express.Router();

const { getEmployees } = require('../controllers/employeeController');

employeeRouter.route("/").get(getEmployees);

module.exports = employeeRouter;