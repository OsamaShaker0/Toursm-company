const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

router.route('/').get(getAllEmployees).post(createEmployee);
router.route('/:name').patch(updateEmployee).delete(deleteEmployee);

module.exports = router;
