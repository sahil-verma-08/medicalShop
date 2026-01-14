import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required')
];

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', protect, admin, categoryValidation, createCategory);
router.put('/:id', protect, admin, categoryValidation, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;







