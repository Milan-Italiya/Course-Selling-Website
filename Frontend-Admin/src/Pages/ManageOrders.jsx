import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderContext } from "../Context/OrderContext";
import { toast, ToastContainer } from "react-toastify";

import "../css/Orders.css";

import Sidebar from "../components/Sidebar";
import OrderSkeleton from "../components/Skeleton/OrderSkeleton";

const ManageOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { fetchOrders, orders, ordersByCount, fetchOrdersByCount } =
    useContext(OrderContext);

  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchOrders();
        await fetchOrdersByCount();
      } catch (error) {
        console.log("Failed to fetch orders:", error.message);
        toast.error("Failed to fetch orders");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (location.state?.createMessage || location.state?.updateMessage) {
      const msg = location.state.createMessage || location.state.updateMessage;

      toast.dismiss();
      toast.success(msg);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getStatusColor = (status) => {
    if (status === "Succeeded") return "#22c55e";
    if (status === "Pending") return "#facc15";
    if (status === "Processing") return "#f97316";
    if (status === "Cancelled") return "#ef4444";
    if (status === "Refunded") return "#a855f7";
    if (status === "Failed") return "#dc2626";
    return "#ffffff";
  };

  const isFinalOrderStatus = (status) => {
    return ["Succeeded", "Refunded", "Cancelled", "Failed"].includes(status);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div id="divider" className={collapsed ? "sidebar-collapsed" : ""}>
        <div className="left-sidebar">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <div className="right-content"> 
          {loading ? (
            <OrderSkeleton orderCount={ordersByCount} />
          ) : (
            <div className="order-container">
              <h2 className="order-heading">Orders</h2>

              <div className="order-list">
                {orders?.length > 0 ? (
                  orders.map((order) => {
                    const isFinalStatus = isFinalOrderStatus(order.status);

                    return (
                      <div className="order-card" key={order._id}>
                        <h3>{order.name}</h3>

                        <p>
                          <strong>Email:</strong> {order.email}
                        </p>

                        <p>
                          <strong>Course:</strong> {order.courseTitle}
                        </p>

                        <p>
                          <strong>Amount:</strong> ₹ {order.amount}
                        </p>

                        <p>
                          <strong>Payment ID:</strong> {order.paymentId}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          <span
                            style={{
                              color: getStatusColor(order.status),
                            }}
                            className={`status ${capitalizeFirstLetter(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </p>

                        {!isFinalStatus && (
                          <div className="order-btn-container">
                            <button
                              type="button"
                              className="order-btn"
                              onClick={() =>
                                navigate(`/admin/update-order/${order._id}`)
                              }
                            >
                              <i className="fa-solid fa-pen-to-square"></i>{" "}
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="order-error">No orders found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageOrders;