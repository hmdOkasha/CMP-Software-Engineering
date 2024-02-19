const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const index = employee.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res) => {
  const newEmployee = req.body;
  employee.push(newEmployee);
  res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
};
