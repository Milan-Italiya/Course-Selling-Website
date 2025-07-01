import express from 'express'
import { orderData, orders, recentOrders, revenueChart, revenues } from '../controllers/order.controller.js';
import userMiddleware from '../middlewares/user.middleware.js';

const router = express.Router()

router.post('/', userMiddleware, orderData);
router.get('/orders', orders)
router.get('/revenue',revenues)
router.get('/recent-orders',recentOrders)
router.get('/revenue-chart',revenueChart)

export default router;