import express from 'express'
import { createCurriculum, deleteCurriculum, fetchCurriculumById, getAllCurriculums, updateCurriculum, getCurriculumByCourse } from '../controllers/curriculum.controller.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
const router = express.Router();

router.post('/add-curriculum', createCurriculum)
router.get('/get-curriculums', getAllCurriculums)
router.get("/get-curriculum/:curriculumId", fetchCurriculumById);
router.get('/course/:courseId', getCurriculumByCourse)
router.put('/update-curriculum/:curriculumId', adminMiddleware, updateCurriculum)
router.delete('/delete-curriculum/:curriculumId', adminMiddleware, deleteCurriculum)

export default router