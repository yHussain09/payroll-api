const asyncWrapper = require("../middleware/async");
const moment = require("moment");
const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel");

const createAttendance = asyncWrapper(async (req, res) => {
  const { employeeId } = req.body;
  const date = moment().format();
  let checkInTime = moment().format();
  let checkOutTime = moment().add(8, "hours").format();

  // Create a new attendance record
  const attendance = await Attendance.create({
    employee: employeeId,
    date,
    checkInTime,
    checkOutTime,
  });
  if (!attendance) {
    res.status(400);
    throw new Error("Error creating attendance");
  }
  res.status(201).json({
    data: attendance,
    message: "Attendance record created successfully",
  });
});

const calculateSalary = (hoursWorked, perHourRate) => {
  return hoursWorked * perHourRate;
};

const generateSalarySlips = asyncWrapper(async (req, res) => {
  const month = moment().month() + 1;
  const year = moment().year();

  const startDate = moment(`${year}-${month.toString().padStart(2, "0")}-01`)
    .startOf("month")
    .format();

  const endDate = moment(`${year}-${month.toString().padStart(2, "0")}-01`)
    .endOf("month")
    .format();

  const attendanceRecords = await Attendance.find({
    date: { $gte: startDate, $lte: endDate },
  }).populate("employee");

  const totalHoursWorked = {};
  attendanceRecords.forEach(({ employee, checkInTime, checkOutTime }) => {
    const checkInMoment = moment(checkInTime);
    const checkOutMoment = moment(checkOutTime);
    const duration = moment.duration(checkOutMoment.diff(checkInMoment));
    const hoursWorked = duration.asHours();

    totalHoursWorked[employee._id] =
      (totalHoursWorked[employee._id] || 0) + hoursWorked;
  });

  const salarySlips = Object.keys(totalHoursWorked).map((employeeId) => {
    const hoursWorked = totalHoursWorked[employeeId];

    const employee = attendanceRecords.find(
      (record) => record.employee.id == employeeId
    ).employee;
    const perHourRate = employee.rate || 1000;

    // Calculate the salary using the separate function
    const salary = calculateSalary(hoursWorked, perHourRate);

    return {
      employeeId: employee._id,
      employeeName: employee.name,
      hoursWorked,
      salary,
    };
  });

  if (salarySlips.length === 0) {
    const error = new Error("Error generating salary slips");
    console.error(error);
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ salarySlips });
});

const createEmployee = asyncWrapper(async (req, res) => {
  const employee = await Employee.create(req.body);
  if (!employee) {
    res.status(400);
    throw new Error("Error creating employee");
  }
  res.status(201).json({ data: employee });
});

module.exports = { createEmployee, createAttendance, generateSalarySlips };
