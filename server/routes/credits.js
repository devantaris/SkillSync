import { Router } from 'express';
import { getBalance, getTransactions } from '../controllers/creditController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/balance', authenticate, getBalance);
router.get('/transactions', authenticate, getTransactions);

export default router;
