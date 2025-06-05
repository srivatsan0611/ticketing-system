import express from 'express';
import { addComment, getComments } from '../controllers/comments.js';

const router = express.Router();

router.post('/:ticketId', addComment);
router.get('/:ticketId', getComments);

export default router;
