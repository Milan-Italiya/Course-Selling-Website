import express from 'express'
import { createOrder, deleteOrder, orderDetails, orders, recentOrders, revenueChart, revenues, updateOrder } from '../controllers/order.controller.js';
import userMiddleware from '../middlewares/user.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router()

router.post('/', userMiddleware, createOrder);
router.put('/update/:orderId', adminMiddleware, updateOrder)
router.delete('/delete/:orderId', adminMiddleware, deleteOrder)
router.get('/orders', orders)
router.get('/recent-orders', recentOrders)
router.get('/revenue', revenues)
router.get('/revenue-chart', revenueChart)
router.get('/:orderId', orderDetails)

export default router;