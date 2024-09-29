let Employee = require("../model/employees");

exports.employeeDetaile = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Fetch a single employee by ID
exports.singleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Add a new employee
exports.addEmployee = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    designation,
    mobile,
    joiningdata,
    addresss,
  } = req.body;
  console.log("req.body", req.body);
  const newEmployee = new Employee({
    firstname,
    lastname,
    email,
    designation,
    mobile,
    joiningdata,
    addresss,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Update an employee by ID
exports.updateEmployee = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    designation,
    mobile,
    addresss,
    joiningdata,
    _id,
  } = req.body;

  try {
    // Check if the employee ID exists in the request parameters
    if (!_id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Validate if all fields are present
    if (
      !firstname ||
      !lastname ||
      !email ||
      !designation ||
      !mobile ||
      !addresss ||
      !joiningdata
    ) {
      console.log("first");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find employee by ID and update
    const updatedEmployee = await Employee.findByIdAndUpdate(
      _id,
      {
        firstname,
        lastname,
        email,
        designation,
        mobile,
        addresss,
        joiningdata,
      },
      { new: true, runValidators: true } // return the updated employee and run schema validators
    );

    // Check if the employee was found and updated
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Send success response with updated employee data
    res.status(200).json(updatedEmployee);
  } catch (err) {
    // Handle errors such as invalid ID format or database errors
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
