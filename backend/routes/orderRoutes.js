import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const orderValidation = [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('address').isObject().withMessage('Address is required'),
  body('address.name').trim().notEmpty().withMessage('Address name is required'),
  body('address.phone').trim().notEmpty().withMessage('Address phone is required'),
  body('address.pincode').trim().notEmpty().withMessage('Pincode is required'),
  body('address.addressLine').trim().notEmpty().withMessage('Address line is required'),
  body('address.city').trim().notEmpty().withMessage('City is required'),
  body('address.state').trim().notEmpty().withMessage('State is required'),
  body('paymentMethod').isIn(['COD', 'ONLINE_TEST']).withMessage('Invalid payment method')
];

router.post('/', protect, orderValidation, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, [
  body('status')
    .isIn([
      'PLACED',
      'PACKED',
      'PH-INVALID',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED'
    ])
    .withMessage('Invalid status')
], updateOrderStatus);


export default router;







