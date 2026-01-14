import express from 'express';
import { initPayUPayment, handlePayUResponse } from '../controllers/payuController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Order create hone ke baad yaha se PayU init hoga
router.post('/payu/init', protect, initPayUPayment);

// PayU ka callback – yaha auth nahi lagayenge (PayU ke server se aayega)
router.post('/payu/response', handlePayUResponse);

export default router;
