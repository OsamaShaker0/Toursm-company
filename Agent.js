const mongoose = require('mongoose');
const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide agent name '],
    },
    sells: {
      type: Number,
      required: [true, 'please provide sells number'],
    },
    payed: {
      type: Number,
      required: [true, 'please provide payed number'],
    },
    remain: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', agentSchema);
