import express from 'express';
import { getRecipients, getMails, getMail, sendMail, deleteMail } from '../controllers/mailController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// /recipients ko /:id se PEHLE rakhna zaroori hai
router.get('/recipients', getRecipients);
router.route('/').get(getMails).post(sendMail);
router.route('/:id').get(getMail).delete(deleteMail);

export default router;
