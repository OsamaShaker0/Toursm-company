const Agent = require('../models/Agent');

const getAllAgents = async (req, res) => {
  const agent = await Agent.find({});
  return res.status(200).json({ agents: agent, numOfAgents: agent.length });
};
const createAgent = async (req, res) => {
  const { sells, payed } = req.body;
  req.body.remain = sells - payed;

  const agent = await Agent.create({ ...req.body });

  return res.status(201).json(agent);
};
const updateAgent = async (req, res) => {
  const name = req.params.name;
  const payed = req.body.payed;
  if (!payed) {
    throw new Error('please provide payed ');
  }
  const agent = await Agent.find({ name });

  let sell = agent[0].sells;
  let currentPayed = agent[0].payed;

  const agent1 = await Agent.findOneAndUpdate(
    { name },
    { payed: currentPayed + payed, remain: sell - (currentPayed + payed) },
    { new: true }
  );
  console.log(agent1);
  res.status(200).json(agent1);
};
const deleteAgent = async (req, res) => {
  const name = req.params.name;
  const agent = await Agent.findOneAndDelete({ name });
  if (!agent) {
    throw new Error(`can't find agent with this name : ${name}`);
  }
  res.status(200).json({ deletedAgent: agent });
};
const getSingleAgent = async (req, res) => {
  const name = req.params.name;
  const agent = await Agent.findOne({ name });
  if (!agent) {
    throw new Error('there is no agent with this name ' + name);
  }
  res.status(200).json(agent);
};

module.exports = {
  getAllAgents,
  deleteAgent,
  updateAgent,
  createAgent,
  getSingleAgent
};
