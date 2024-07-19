const Ticket = require('../models/Ticket');
const Agent = require('../models/Agent');
const Employee = require('../models/Employee');
//SECTION -
const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({});
  res.status(200).json({ tickets, numOfTickets: tickets.length });
  return;
};
//!SECTION
const getSingleTicket = async (req, res) => {
  const id = req.params.id;
  const ticket = await Ticket.findById({ _id: id });
  if (!ticket) {
    throw new Error(`there is no tickets with this id : ${id}`);
  }
  res.status(200).json({ ticketInfo: ticket });
};
//SECTION -
const createTicket = async (req, res) => {
  const { clientName, from, to, price, payed, employee, actualPrice } =
    req.body;

  if (
    !clientName ||
    !from ||
    !to ||
    !price ||
    !actualPrice ||
    !payed ||
    !employee
  ) {
    throw new Error('plase inter all info');
    return;
  }
  let ticketProfit = price - actualPrice;
  req.body.ticketProfit = ticketProfit;
  req.body.remain = price - payed;
  const ticket = await Ticket.create(req.body);
  //NOTE -  emolyee
  const employeee = await Employee.findOne({ name: employee });

  const newProfit = price - actualPrice;

  if (employeee.name === 'malik') {
    let update = await Employee.findOneAndUpdate(
      { name: employeee.name },
      { employeeProfit: employeee.employeeProfit + newProfit },
      { new: true }
    );
  }
  if (employeee.name === 'abdallah') {
    let update = await Employee.findOneAndUpdate(
      { name: employeee.name },
      { employeeProfit: newProfit },
      { new: true }
    );
  }
  //NOTE -  agent
  if (ticket.agent === 'No Body') {
    return res.status(200).json({ ticket });
  }
  const findAgent = await Agent.findOne({ name: ticket.agent });
  if (!findAgent) {
    throw new Error(`there are no agent with this name ${ticket.agent}`);
  }
  let agentSells = price + findAgent.sells;
  let agentPayed = payed + findAgent.payed;
  let agentRemain = agentSells - agentPayed;
  const agent = await Agent.updateOne(
    { name: findAgent.name },
    { sells: agentSells, payed: agentPayed, remain: agentRemain },
    { new: true }
  );

  res.status(200).json({ ticket: ticket, agentInfo: agent });
};
//SECTION -
const updateTicketRemain = async (req, res) => {
  const id = req.params.id;
  const { payed } = req.body;
  let ticketPrice = await Ticket.findOne({ _id: id });

  const price = ticketPrice.price;
  const allPayed = payed + ticketPrice.payed;
  const remain = price - allPayed;
  const ticket = await Ticket.findOneAndUpdate(
    { _id: id },
    { payed: payed + ticketPrice.payed, remain: remain },
    { new: true }
  );

  if (!ticket) {
    throw new Error(`there are no ticket with this id ${id}`);
    return;
  }
  if (ticket.agent === 'No Body') {
    return res.status(200).json({ ticket });
  }
  const findAgent = await Agent.findOne({ name: ticket.agent });
  if (!findAgent) {
    throw new Error(`there are no agent with name  ${ticket.agent}`);
    return;
  }
  let agentSells = price + findAgent.sells;
  let agentPayed = payed + findAgent.payed;
  let agentRemain = findAgent.remain - payed;
  const agent = await Agent.updateOne(
    { name: findAgent.name },
    { payed: agentPayed, remain: agentRemain },
    { new: true }
  );
  return res.status(200).json({ ticket, agent });
};
const updateTicketPrice = async (req, res) => {
  //NOTE - ticket
  const id = req.params.id;
  const { price } = req.body;
  let ticket = await Ticket.findOne({ _id: id });
  if (!ticket) {
    throw new Error(`there are no ticket with this id: ${id}`);
  }
  let oldPrice = ticket.price;
  const priceDiff = oldPrice - price;

  const ticket1 = await Ticket.findOneAndUpdate(
    { _id: id },
    { price: price, remain: price - ticket.payed },
    { new: true }
  );
  //NOTE -  employee
  const employee = await Employee.findOne({ name: ticket.employee });
  let newProfit = employee.employeeProfit - priceDiff;
  if (employee.name === 'malik') {
    let update = await Employee.updateOne(
      { name: employee.name },
      { employeeProfit: newProfit }
    );
  }
  if (employee.name === 'abdallah') {
    let update = await Employee.updateOne(
      { name: employee.name },
      { employeeProfit: newProfit }
    );
  }
  if (ticket.agent === 'No Body') {
    return res.status(200).json({ ticket1 });
  }
  //NOTE - agnet
  let agent = await Agent.findOne({ name: ticket.agent });
  if (!agent) {
    throw new Error(`there are no agent with this name: ${ticket.agent}`);
  }

  let agent1 = await Agent.findOneAndUpdate(
    { name: ticket.agent },
    { sells: agent.sells - priceDiff, remain: price - agent.payed },
    { new: true }
  );

  res.status(200).json({ ticket1 });
};
//SECTION -
const deleteTicket = async (req, res) => {
  const id = req.params.id;

  const ticket = await Ticket.findOne({ _id: id });
  if (!ticket) {
    throw new Error(`there is no ticket with this id ${id}`);
  }
  if (ticket.agent === 'No Body') {
    await Ticket.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ msg: 'ticket deleted ', deletedTicketInfo: ticket });
  }
  const findAgent = await Agent.findOne({ name: ticket.agent });
  if (!findAgent) {
    await Ticket.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ msg: 'ticket deleted ', deletedTicketInfo: ticket });
  }
  let agentSells = findAgent.sells - ticket.price;
  let agentPayed = findAgent.payed - ticket.payed;
  let agentRemain = agentSells - agentPayed;
  const agent = await Agent.updateOne(
    { name: findAgent.name },
    { payed: agentPayed, remain: agentRemain }
  );
  await Ticket.deleteOne({ _id: id });
  return res.status(200).json({ deletedTicket: ticket, agent });
};
module.exports = {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicketRemain,
  deleteTicket,
  updateTicketPrice,
};
