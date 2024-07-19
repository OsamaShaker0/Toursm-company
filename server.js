require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connectDb');
const ticketsRouter = require('./routes/ticketRoutes');
const agentsRouter = require('./routes/agentRoutes');
const employeesRouter = require('./routes/employeeRoutes');
const express = require('express');
const app = express();
// middlewares
app.use(express.json());

// routes
app.use('/api/v1/tickets', ticketsRouter);
app.use('/api/v1/agents', agentsRouter);
app.use('/api/v1/employees', employeesRouter);

// start
const port = 2000 || process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(2000, () => {
      console.log(`app is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
