// Routing Requests to the Correct Endpoints


import express from 'express';
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  assignTicket
} from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.patch('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.patch('/:id/assign', assignTicket);

export default router;
