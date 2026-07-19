import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../css/UpdateOrder.css";
import Sidebar from "../components/Sidebar";
import FormSkeleton from "../components/Skeleton/FormSkeleton";
import { OrderContext } from "../Context/OrderContext";

const UpdateOrder = () => {
  const { orderId } = useParams();

  const {
    fetchOrderDetails,
    fetchUpdateOrder,
  } = useContext(OrderContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courseTitle: "",
    amount: "",
    paymentId: "",
    status: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    courseTitle: "",
    amount: "",
    paymentId: "",
    status: "",
  });

  const [pageLoading, setPageLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  /* FETCH ORDER DETAILS */
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderDetails(orderId);

        const order = data?.order;

        if (order) {
          const loadedData = {
            name: order.name || "",
            email: order.email || "",
            courseTitle: order.courseTitle || "",
            amount: order.amount?.toString() || "",
            paymentId: order.paymentId || "",
            status: order.status || "",
          };

          setFormData(loadedData);
          setOriginalData(loadedData);
        } else {
          toast.error("Order not found");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch order");
      } finally {
        setTimeout(() => {
          setPageLoading(false);
        }, 1500);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* CHECK CHANGES */
  const isChanged = Object.keys(formData).some(
    (key) => formData[key] !== originalData[key]
  );

  /* UPDATE ORDER */
  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    try {
      setUpdateLoading(true);

      const data = await fetchUpdateOrder(orderId, { status: formData.status });

      if (data?.success) {
        toast.success(
          data.message || "Order updated successfully!"
        );

        navigate("/admin/orders", {
          state: {
            updateMessage:
              data.message || "Order updated successfully!",
          },
        });
      } else {
        toast.error(
          data?.errors ||
          data?.message ||
          "Failed to update order"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order");
    } finally {
      setUpdateLoading(false);
    }
  };

  const allowedStatusMap = {
    Pending: ["Pending", "Processing", "Cancelled"],
    Processing: ["Processing", "Succeeded", "Failed"],
    Succeeded: ["Succeeded", "Refunded"],
    Failed: ["Failed"],
    Cancelled: ["Cancelled"],
    Refunded: ["Refunded"],
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>

        {pageLoading ? (
          <FormSkeleton />
        ) : (
          <div className="right-content">
            <h2 className="order-heading">
              Update Existing Order
            </h2>

            <div className="order-course-container">
              <form
                onSubmit={handleUpdateOrder}
                className="order-course-form"
              >
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  disabled
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: "not-allowed",
                  }}
                />

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: "not-allowed",
                  }}
                />

                <label>Course</label>
                <input
                  type="text"
                  name="courseTitle"
                  value={formData.courseTitle}
                  disabled
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: "not-allowed",
                  }}
                />

                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  disabled
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: "not-allowed",
                  }}
                />

                <label>Payment ID</label>
                <input
                  type="text"
                  name="paymentId"
                  value={formData.paymentId}
                  disabled
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: "not-allowed",
                  }}
                />

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  {allowedStatusMap[originalData.status]?.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={
                    !isChanged || updateLoading
                  }
                  style={{
                    opacity:
                      !isChanged || updateLoading
                        ? 0.6
                        : 1,
                    cursor:
                      !isChanged || updateLoading
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {updateLoading
                    ? "Order is updating..."
                    : "Update Order"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateOrder;