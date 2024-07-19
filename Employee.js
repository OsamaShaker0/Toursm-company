const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  employeeProfit: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
