const express = require('express');
const router = express.Router();
const {
  getAllAgents,
  deleteAgent,
  updateAgent,
  createAgent,
  getSingleAgent
} = require('../controllers/agentController');

router.route('/').get(getAllAgents).post(createAgent);
router.route('/:name').patch(updateAgent).delete(deleteAgent).get(getSingleAgent);

module.exports = router;
