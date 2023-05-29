const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `employee's name must be provided`],
    },
    attendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
    // age: {
    //   type: Number,
    //   required: [true, `employee's age must be provided`],
    // },
    // department: {
    //   type: String,
    //   enum: {
    //     values: ["IT", "Admin", "HR"],
    //     message: "{VALUE} is not supported",
    //   },
    // },
    // checkInTime: {
    //   type: String,
    //   default: "",
    // },
    // checkOutTime: {
    //   type: String,
    //   default: "",
    // },
    // totalHoursWorked: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
