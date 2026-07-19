import express from 'express';
import { deleteuser, feedback, getUserById, getusers, login, logout, purchases, signup, updateuser } from '../controllers/user.controller.js';
import userMiddleware from '../middlewares/user.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)
router.get('/purchased', userMiddleware, purchases);
router.get('/users', getusers)
router.delete('/delete/:id', deleteuser)
router.get('/:id',getUserById)
router.put('/update/:id', updateuser)
router.post('/feedback', feedback)


export default router;