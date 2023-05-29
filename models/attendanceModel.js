const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  date: {
    type: String,
    default: "",
  },
  checkInTime: {
    type: String,
    default: "",
  },
  checkOutTime: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
