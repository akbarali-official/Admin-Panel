import express from 'express';
import { getAll, getOne, remove, createMessage } from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Bhejna sab ke liye, dekhna/hatana sirf admin
router.route('/').post(createMessage).get(protect, adminOnly, getAll);
router.route('/:id').get(protect, adminOnly, getOne).delete(protect, adminOnly, remove);

export default router;
