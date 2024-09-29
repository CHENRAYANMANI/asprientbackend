const mongoose = require("mongoose");

const employeeDetails = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  addresss: {
    type: String,
    require: true,
  },
  joiningdata: {
    type: String,
    require: true,
  },
  designation: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("employeedetailss", employeeDetails);
