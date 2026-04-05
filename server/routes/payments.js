import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/create-order', authenticate, createOrder);
router.post('/verify', authenticate, verifyPayment);

export default router;
