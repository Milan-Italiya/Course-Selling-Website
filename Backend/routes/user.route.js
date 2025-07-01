import express from 'express';
import { feedback, getusers, login, logout, purchases, signup } from '../controllers/user.controller.js';
import userMiddleware from '../middlewares/user.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)
router.get('/purchased', userMiddleware, purchases); // remove UserMiddleware
router.get('/users', getusers)
router.post('/feedback', feedback)


export default router;