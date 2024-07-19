const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'please inter Client name '],
      minlength: 3,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: String,
    },
    agent: {
      type: String,
      required: [true, 'please inter agent name '],
      default: 'No Body',
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      require: true,
    },
    ticketDate: {
      type: String,
      required: [true, `please inter Ticket info `],
    },
    price: {
      type: Number,
      required: [true, `please inter Ticket price `],
    },
    actualPrice: {
      type: Number,
      required: [true, 'please provide actual price'],
    },
    payed: {
      type: Number,
      // require: [true, `please inter Ticket price `],
      default: 0,
    },
    remain: {
      type: Number,
    },

    employee: {
      type: String,
      required: [true, 'please provide employee name '],
    },
    ticketProfit: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
