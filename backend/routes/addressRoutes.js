import express from 'express';
import { body } from 'express-validator';
import {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
} from '../controllers/addressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const addressValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('pincode').trim().notEmpty().withMessage('Pincode is required'),
  body('addressLine').trim().notEmpty().withMessage('Address line is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').trim().notEmpty().withMessage('State is required')
];

router.get('/', protect, getAddresses);
router.get('/:id', protect, getAddressById);
router.post('/', protect, addressValidation, createAddress);
router.put('/:id', protect, addressValidation, updateAddress);
router.delete('/:id', protect, deleteAddress);

export default router;







