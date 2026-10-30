import express from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/growthController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dekhna sab ke liye khula hai, badalna sirf admin ke liye
router.route('/').get(getAll).post(protect, adminOnly, create);
router
  .route('/:id')
  .get(getOne)
  .put(protect, adminOnly, update)
  .delete(protect, adminOnly, remove);

export default router;
