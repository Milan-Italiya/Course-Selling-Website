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
function App() {
  return (
    <Router>
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
                    <Route path="/admin/create-course" element={<CreateCourse />} />
                    <Route path="/admin/update-course/:courseId" element={<UpdateCourse />} />
                    <Route path="/admin/our-courses" element={<OurCourses />} />
                  </Routes>
                </CourseProvider>
              </AuthProvider>
            </UserProvider>
          </PurchaseProvider>
        </TeamProvider>
      </OrderProvider>
    </Router>
  )
}

export default App
