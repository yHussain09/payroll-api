const Employee = require('../models/employeeModel');

const getEmployees = async (req, res) => {
    const employees = await Employee.find({});
    res.status(200).json({ employees });
}

module.exports = { getEmployees };