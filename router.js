const express = require("express");
const route = express.Router();
const getEmployee = require("./controller/employeeDetail");

route.get("/employee", getEmployee.employeeDetaile);
route.post("/employee", getEmployee.addEmployee);
route.put("/empedit", getEmployee.updateEmployee);
route.delete("/empdelete", getEmployee.deleteEmployee);

module.exports = route;
