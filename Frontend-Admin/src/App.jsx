import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminSignup from './Pages/AdminSignup.jsx'

import { CourseProvider } from './Context/CourseContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import AdminLoginPage from './Pages/AdminLogin.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import CreateCourse from './Pages/CreateCourse.jsx'
import UpdateCourse from './Pages/UpdateCourse.jsx'
import OurCourses from './Pages/OurCourses.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { PurchaseProvider } from './Context/PurchaseContext.jsx'
import { TeamProvider } from './Context/TeamContext.jsx'
import { OrderProvider } from './Context/OrderContext.jsx'
import ManageOrders from './Pages/ManageOrders.jsx'
import UpdateOrder from './Pages/UpdateOrder.jsx'
import ManageUsers from './Pages/ManageUsers.jsx'
import UpdateUser from './Pages/UpdateUser.jsx'
import ManageCurriculum from './Pages/ManageCurriculum.jsx'
import { CurriculumProvider } from './Context/CurriculumContext.jsx'
import CreateCurriculum from './Pages/CreateCurriculum.jsx'
import UpdateCurriculum from './Pages/UpdateCurriculum.jsx'
import FormSkeleton from './components/Skeleton/FormSkeleton.jsx'
function App() {
  return (
    <Router>
      <CurriculumProvider>
        <OrderProvider>
          <TeamProvider>
            <PurchaseProvider>
              <UserProvider>
                <AuthProvider>
                  <CourseProvider>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/admin/signup" element={<AdminSignup />} />
                      <Route path="/admin/login" element={<AdminLoginPage />} />

                      {/* Courses */}
                      <Route path="/admin/create-course" element={<CreateCourse />} />
                      <Route path="/admin/update-course/:courseId" element={<UpdateCourse />} />
                      <Route path="/admin/our-courses" element={<OurCourses />} />

                      {/* Orders */}
                      <Route path="/admin/orders" element={<ManageOrders />} />
                      <Route path="/admin/update-order/:orderId" element={<UpdateOrder />} />

                      {/* Users */}
                      <Route path="/admin/users" element={<ManageUsers />} />
                      <Route path="/admin/update/:userId" element={<UpdateUser />} />
                      <Route path="/e" element={<FormSkeleton />} />

                      {/* Curriculum */}
                      <Route path="/admin/manage-curriculum" element={<ManageCurriculum />} />
                      <Route path="/admin/create-curriculum" element={<CreateCurriculum />} />
                      <Route path="/admin/update-curriculum/:curriculumId" element={<UpdateCurriculum/>} />

                    </Routes>
                  </CourseProvider>
                </AuthProvider>
              </UserProvider>
            </PurchaseProvider>
          </TeamProvider>
        </OrderProvider>
      </CurriculumProvider>
    </Router>
  )
}

export default App
