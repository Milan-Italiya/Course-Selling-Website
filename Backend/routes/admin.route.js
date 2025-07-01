import express from 'express';
import {  Getadmins, login, logout, signup } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/logout', logout)
router.get('/admins',Getadmins)

export default router;