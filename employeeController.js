const Employee = require('../models/Employee');
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});
  if (employees.length === 0) {
    throw new Error('No Employees Created Yet!!');
  }
  res.status(200).json({ employees });
};
const createEmployee = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new Error('Please Provide Emplyee Name');
  }
  const employee = await Employee.create(req.body);
  res.status(201).json({ CreatedEmployee: employee });
};
const updateEmployee = async (req, res) => {
  const name = req.params.name;
  const newProfit = req.body.newProfit;
  console.log(newProfit)
  const employee = await Employee.findOne({ name });
  if (!employee) {
    throw new Error(`There Is No Emplyee With This Name: ${name}`);
  }
  console.log(employee)
  const updatedEmployee = await Employee.findOneAndUpdate(
    { name: employee.name },
    { employeeProfit: employee.employeeProfit + newProfit },{new:true}
  );
 
  res.status(200).json(updatedEmployee);
};
const deleteEmployee = async (req, res) => {
  const name = req.params.name;
  const deletedEmployee = await Employee.findOneAndDelete({ name: name });
  if (!deleteEmployee) {
    throw new Error(`There Is No Emplyee With This Name: ${name}`);
  }
  res.status(200).json({ deletedEmployee: deletedEmployee });
};
module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
