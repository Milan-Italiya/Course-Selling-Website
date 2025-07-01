import React, { useContext, useEffect } from 'react';
import '../css/AdminDashboard.css';
import Sidebar from '../components/Sidebar';
import { CourseContext } from '../Context/CourseContext';
import { OrderContext } from '../Context/OrderContext';
import { UserContext } from '../Context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Legend, Cell, FunnelChart, Funnel, LabelList } from 'recharts';

const AdminOverview = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { coursesByCount, fetchCoursesByCount, topCourses, fetchTopCourses } = useContext(CourseContext)
  const { ordersByCount, fetchOrdersByCount, revenueChart, fetchRevenueChartData, fetchRevenue, revenue, recentOrders, fetchRecentOrders } = useContext(OrderContext)
  const { userByCount, fetchUsersByCount } = useContext(UserContext)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      navigate('/admin/login', { state: { loginerrMessage: 'please login first to admin dashboard' } });
    }

    if (location.state && location.state.loginMessage) {
      toast.success(location.state.loginMessage)
    }
  }, [])

  useEffect(() => {
    try {
      fetchCoursesByCount()
      fetchOrdersByCount()
      fetchUsersByCount()
      fetchRevenue()
      fetchTopCourses()
      fetchRecentOrders()
      fetchRevenueChartData()
    } catch (error) {
      console.log("Error in fetch data: ", error.message)
    }
  }, []);

  const COLORS = ['#00e6e6', '#00cccc', '#009999', '#006666', '#003333'];


  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>
        <div className="right-content">
          <div className="admin-dashboard">
            <h1 className='dashboard-heading'>Admin Dashboard</h1>

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

            <div className="chart-container">
              <h2>Revenue Chart</h2>

              {/* Bar Chart */}
              {/* <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={revenueChart}
                    dataKey="totalRevenue"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    labelLine={true}
                    fill="#00e6e6"
                    label={({ title }) => title}
                  >
                    {revenueChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer> */}

              {/* Funnel Chart */}
              <ResponsiveContainer width="100%" height={400}>
                <FunnelChart>
                  <defs>
                    <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00e6e6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#006666" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>

                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #00e6e6', color: '#ddd' }}
                    cursor={{ fill: 'rgba(0, 230, 230, 0.1)' }}
                  />

                  <Funnel
                    dataKey="totalRevenue"
                    data={revenueChart}
                    isAnimationActive
                    stroke="#00e6e6"
                    fill="url(#funnelGradient)"
                  >
                    <LabelList
                      position="right"
                      fill="#ddd"
                      stroke="none"
                      dataKey="title"
                      style={{ fontSize: '14px' }}
                    />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>

            <div className="top-courses">
              <h2>Top Courses</h2>
              {topCourses && topCourses.length > 0 ? (
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
                    {topCourses.map((topCourse, index) => (
                      <tr key={topCourse._id}>
                        <td>{index + 1}</td>
                        <td>{topCourse.title}</td>
                        <td>₹ {topCourse.price}</td>
                        <td>{topCourse.language}</td>
                        <td>{topCourse.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className='no-top-courses'>No top courses.</p>
              )}
            </div>

            <div className="recent-orders">
              <h2>Recent Orders</h2>
              {recentOrders && recentOrders.length > 0 ? (
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
                    {recentOrders.map((recentOrder, index) => (
                      <tr key={recentOrder._id}>
                        <td>{index + 1}</td>
                        <td>{recentOrder.email}</td>
                        <td>{recentOrder.courseTitle}</td>
                        <td>{recentOrder.paymentId}</td>
                        <td>₹ {recentOrder.amount}</td>
                        <td>{recentOrder.createdAt.slice(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className='no-recent-orders'>No recent orders.</p>
              )}
            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
