import { Router } from 'express';
import { validateCourse } from '../controllers/agentController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/validate', authenticate, validateCourse);

export default router;
