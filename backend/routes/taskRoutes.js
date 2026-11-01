import express from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ye shared tools hain: login wala har user dekh aur badal sakta hai
router.use(protect);
router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne).put(update).delete(remove);

export default router;
