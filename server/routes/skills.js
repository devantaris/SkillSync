import { Router } from 'express';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getSkills);
router.post('/', authenticate, addSkill);
router.put('/:id', authenticate, updateSkill);
router.delete('/:id', authenticate, deleteSkill);

export default router;
