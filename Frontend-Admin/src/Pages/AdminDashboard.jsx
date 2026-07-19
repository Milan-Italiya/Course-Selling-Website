import React, { useContext, useEffect, useState } from "react";
import "../css/AdminDashboard.css";
import Sidebar from "../components/Sidebar";
import SidebarSkeleton from "../components/Skeleton/SidebarSkeleton";
import DashboardSkeleton from "../components/Skeleton/DashboardSkeleton";

import { CourseContext } from "../Context/CourseContext";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";

import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const AdminOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebarSkeleton, setShowSidebarSkeleton] = useState(false);
  const [collapsed, setCollapsed] = useState(false)


  const { coursesByCount, fetchCoursesByCount, topCourses, fetchTopCourses } =
    useContext(CourseContext);

  const {
    ordersByCount,
    fetchOrdersByCount,
    revenueChart,
    fetchRevenueChartData,
    fetchRevenue,
    revenue,
    recentOrders,
    fetchRecentOrders
  } = useContext(OrderContext);

  const { userByCount, fetchUsersByCount } = useContext(UserContext);

  const [loading, setLoading] = useState(true);


  // AUTH + LOGIN MESSAGE

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/admin/login", {
        replace: true,
        state: { loginerrMessage: "Please login first to admin dashboard" },
      });
      return;
    }

    const loginMessage = location.state?.loginMessage;

    if (loginMessage) {
      toast.success(loginMessage, {
        toastId: "admin-login-success",
      });

      // Clears loginMessage after toast is triggered
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.pathname, location.state, navigate]);

  // SIDEBAR SKELETON (FIRST LOAD + REFRESH)
  // useEffect(() => {
  //   const sidebarLoaded = sessionStorage.getItem("admin_sidebar_loaded");

  //   if (!sidebarLoaded) {
  //     setShowSidebarSkeleton(true);

  //     const timer = setTimeout(() => {
  //       setShowSidebarSkeleton(false);
  //       sessionStorage.setItem("admin_sidebar_loaded", "true");
  //     }, 1200);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // FETCH DASHBOARD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchCoursesByCount(),
          fetchOrdersByCount(),
          fetchUsersByCount(),
          fetchRevenue(),
          fetchTopCourses(),
          fetchRecentOrders(),
          fetchRevenueChartData()
        ]);

        setTimeout(() => setLoading(false), 1500);
      } catch (error) {
        console.error("Dashboard load error:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div id="divider" className={collapsed ? "sidebar-collapsed" : ""}>
        <div className="left-sidebar">
          {showSidebarSkeleton ? <SidebarSkeleton /> : <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
          {/* {loading ? <SidebarSkeleton /> : <Sidebar />} */}
        </div>

        <div className="right-content">
          {loading ? (
            <DashboardSkeleton />
          ) : (
            <div className="admin-dashboard">
              <h1 className="dashboard-heading">Admin Dashboard</h1>

              {/* STATS */}
              <div className="admin-stats-grid">
                <div className="stat-card">
                  <h3>Total Courses</h3>
                  <p>{coursesByCount}</p>
                </div>

                <div className="stat-card">
                  <h3>Registered Users</h3>
                  <p>{userByCount}</p>
                </div>

                <div className="stat-card">
                  <h3>Total Orders</h3>
                  <p>{ordersByCount}</p>
                </div>

                <div className="stat-card">
                  <h3>Total Revenue</h3>
                  <p>₹ {revenue}</p>
                </div>
              </div>

              {/* REVENUE CHART */}
              <div className="chart-container">
                <h2>Revenue Chart</h2>

                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={revenueChart}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="title"
                      angle={-20}
                      textAnchor="end"
                      interval={0}
                      fontSize={13}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="totalRevenue"
                      fill="#00e6e6"
                      radius={[10, 10, 5, 5]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* TOP COURSES */}
              <div className="top-courses">
                <h2>Top Courses</h2>

                {topCourses?.length ? (
                  <table className="top-courses-table">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Course Title</th>
                        <th>Price</th>
                        <th>Language</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCourses.slice(0, 5).map((course, index) => (
                        <tr key={course._id}>
                          <td>{index + 1}</td>
                          <td>{course.title}</td>
                          <td>₹ {course.price}</td>
                          <td>{course.language}</td>
                          <td>{course.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-top-courses">No top courses.</p>
                )}
              </div>

              {/* RECENT ORDERS */}
              <div className="recent-orders">
                <h2>Recent Orders</h2>

                {recentOrders?.length ? (
                  <table className="recent-orders-table">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>User Email</th>
                        <th>Course Name</th>
                        <th>Payment Id</th>
                        <th>Amount Paid</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order.email}</td>
                          <td>{order.courseTitle}</td>
                          <td>{order.paymentId}</td>
                          <td>₹ {order.amount}</td>
                          <td>{order.createdAt.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-recent-orders">No recent orders.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
