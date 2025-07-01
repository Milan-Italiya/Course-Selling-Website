import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";

export const orderData = async (req, res) => {
    const order = req.body;
    try {
        const orderInfo = await Order.create(order);
        console.log("Order Info", orderInfo);

        const userId = orderInfo?.userId;
        const paymentId = orderInfo?.paymentId;
        const courseId = orderInfo?.courseId;

        console.log("All information", userId, paymentId, courseId);

        if (orderInfo) {
            const newPurchase = new Purchase({ userId, paymentId, courseId });
            await newPurchase.save();
        }

        // ✅ Send response after all DB operations are done
        res.status(201).json({ message: "Order and Purchase created successfully", orderInfo });

    } catch (error) {
        console.error("Error in order creation:", error);
        res.status(500).json({ error: "Error in order creation" });
    }
};

export const orders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({ message: "All orders", orders });
    } catch (error) {
        console.log("Error in getting orders", error.message)
        return res.status(500).json({ errors: error.message });
    }
}

export const revenues = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            { $match: { status: "succeeded" } },
            { $group: { _id: "$courseId", totalRevenue: { $sum: "$amount" } } }
        ]);
        const totalRevenue = orders.length > 0 ? orders[0].totalRevenue : 0;
        res.status(200).json({ message: "Total revenue", totalRevenue, success: true });
    } catch (error) {
        console.log("Error in getting revenues", error.message)
        return res.status(500).json({ errors: error.message, success: false });
    }
}

export const revenueChart = async (req, res) => {
    try {
        const revenues = await Order.aggregate([
            {
                $group: {
                    _id: { courseId: "$courseId", title: "$courseTitle" },
                    totalRevenue: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    courseId: "$_id.courseId",
                    title: "$_id.title",
                    totalRevenue: 1
                }
            }
        ])
        res.status(200).json({ message: "Revenue chart", revenues: revenues, success: true });
    } catch (error) {
        console.log("Error in getting revenue chart", error.message)
        res.status(500).json({ errors: error.message, success: false });
    }
}

export const recentOrders = async (req, res) => {
    try {
        const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('courseId').populate('userId');
        res.status(200).json({ message: "Recent orders", recentOrders: recentOrders, success: true });
    } catch (error) {
        console.log("Error in getting recent orders", error.message)
        res.status(500).json({ errors: error.message, success: false });
    }
}