import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";

export const createOrder = async (req, res) => {
  let order = req.body;

  const validStatuses = [
    "Pending",
    "Processing",
    "Succeeded",
    "Cancelled",
    "Refunded",
    "Failed",
  ];

  try {
    console.log("Incoming Status:", order.status);

    // Normalize status
    if (order.status) {
      order.status =
        order.status.charAt(0).toUpperCase() +
        order.status.slice(1).toLowerCase();
    } else {
      order.status = "Pending";
    }

    if (!validStatuses.includes(order.status)) {
      return res.status(400).json({
        message: "Invalid status value",
        success: false,
      });
    }

    const orderInfo = await Order.create(order);

    console.log("Order Info:", orderInfo);

    const userId = orderInfo.userId;
    const paymentId = orderInfo.paymentId;
    const courseId = orderInfo.courseId;
    const amount = orderInfo.amount || 0;
    const status = orderInfo.status || "Pending";

    console.log("User ID:", userId);
    console.log("Payment ID:", paymentId);
    console.log("Course ID:", courseId);
    console.log("Final Status:", status);

    // Create or update purchase for every status
    const purchaseInfo = await Purchase.findOneAndUpdate(
      {
        userId,
        courseId,
      },
      {
        $set: {
          userId,
          courseId,
          paymentId,
          amount,
          status,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("Purchase Saved / Updated:", purchaseInfo);

    return res.status(201).json({
      message: "Order created successfully",
      orderInfo,
      purchaseInfo,
      success: true,
    });
  } catch (error) {
    console.error("Error in order creation:", error);

    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  let { status } = req.body;

  const validStatuses = [
    "Pending",
    "Processing",
    "Succeeded",
    "Cancelled",
    "Refunded",
    "Failed",
  ];

  // Normalize status
  if (status) {
    status =
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase();
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
      success: false,
    });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    // Allowed status transitions
    const allowedTransitions = {
      Pending: ["Pending", "Processing", "Cancelled", "Failed", "Succeeded"],
      Processing: ["Processing", "Succeeded", "Failed", "Cancelled"],
      Succeeded: ["Succeeded", "Refunded"],
      Failed: ["Failed"],
      Cancelled: ["Cancelled"],
      Refunded: ["Refunded"],
    };

    const currentStatus = order.status;

    console.log("Current Status:", currentStatus);
    console.log("Requested Status:", status);

    if (!allowedTransitions[currentStatus]?.includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${currentStatus} to ${status}`,
        success: false,
      });
    }

    // Update order status
    order.status = status;
    await order.save();

    // Update purchase status also
    const purchaseInfo = await Purchase.findOneAndUpdate(
      {
        userId: order.userId,
        courseId: order.courseId,
      },
      {
        $set: {
          userId: order.userId,
          courseId: order.courseId,
          paymentId: order.paymentId,
          amount: order.amount || 0,
          status,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("Purchase Status Updated:", purchaseInfo);

    return res.status(200).json({
      message: "Order updated successfully",
      order,
      purchaseInfo,
      success: true,
    });
  } catch (error) {
    console.log("Error in updating order", error.message);

    return res.status(500).json({
      errors: error.message,
      success: false,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    // Delete purchase record
    await Purchase.findOneAndDelete({
      paymentId: order.paymentId,
    });

    // Delete order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleting order", error.message);

    res.status(500).json({
      errors: error.message,
      success: false,
    });
  }
};

export const orderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ errors: "Order not found" });
    }
    res.status(200).json({ message: "Order details", order, success: true });
  } catch (error) {
    console.log("Errors in getting order details.", error);
    return res.status(500).json({ errors: error.message, success: false });
  }
};

export const orders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ message: "All orders", orders });
  } catch (error) {
    console.log("Error in getting orders", error.message);
    return res.status(500).json({ errors: error.message });
  }
};

export const revenues = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      { $match: { status: { $in: ["Succeeded", "succeeded"] } } },
      {
        $group: {
          _id: null, // group all orders together
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = orders.length > 0 ? orders[0].totalRevenue : 0;

    res.status(200).json({
      message: "Total revenue",
      totalRevenue,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting revenues", error.message);
    return res.status(500).json({ errors: error.message, success: false });
  }
};

export const revenueChart = async (req, res) => {
  try {
    const revenues = await Order.aggregate([
      {
        $group: {
          _id: { courseId: "$courseId", title: "$courseTitle" },
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          courseId: "$_id.courseId",
          title: "$_id.title",
          totalRevenue: 1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    res
      .status(200)
      .json({ message: "Revenue chart", revenues: revenues, success: true });
  } catch (error) {
    console.log("Error in getting revenue chart", error.message);
    res.status(500).json({ errors: error.message, success: false });
  }
};

export const recentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("courseId")
      .populate("userId");
    res.status(200).json({
      message: "Recent orders",
      recentOrders: recentOrders,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting recent orders", error.message);
    res.status(500).json({ errors: error.message, success: false });
  }
};
