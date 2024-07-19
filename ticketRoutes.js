const express = require('express');
const router = express.Router();
const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicketRemain,
  deleteTicket,
  updateTicketPrice
} = require('../controllers/ticketController');

router.route('/').get(getAllTickets).post(createTicket);
router
  .route('/:id')
  .get(getSingleTicket)
  .patch(updateTicketRemain)
  .delete(deleteTicket);
  router.route('/updatePrice/:id').patch(updateTicketPrice)

module.exports = router;
