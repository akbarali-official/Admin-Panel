import express from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/postController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dekhna: login zaroori. Badalna: sirf admin.
router.route('/').get(protect, getAll).post(protect, adminOnly, create);
router
  .route('/:id')
  .get(protect, getOne)
  .put(protect, adminOnly, update)
  .delete(protect, adminOnly, remove);

export default router;
