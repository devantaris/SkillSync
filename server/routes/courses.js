import { Router } from 'express';
import { listCourses, getCourse, createCourse, updateCourse, deleteCourse, enrollCourse } from '../controllers/courseController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, listCourses);
router.get('/:id', optionalAuth, getCourse);
router.post('/', authenticate, createCourse);
router.put('/:id', authenticate, updateCourse);
router.delete('/:id', authenticate, deleteCourse);
router.post('/:id/enroll', authenticate, enrollCourse);

export default router;
