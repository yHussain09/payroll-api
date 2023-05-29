const express = require("express");
const employeeRouter = express.Router();

const {
  createEmployee,
  createAttendance,
  generateSalarySlips,
} = require("../controllers/employeeController");

employeeRouter.route("/").post(createEmployee);
employeeRouter.route("/attendance").post(createAttendance);
employeeRouter.route("/salary-slips").post(generateSalarySlips);

module.exports = employeeRouter;
