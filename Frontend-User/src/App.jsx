import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import Course from './Pages/Course.jsx'
import CourseDetail from './Pages/CourseDetail.jsx'
import { CourseProvider } from './Context/CourseContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import Purchase from './Pages/Purchase.jsx'
import Buy from './Pages/Buy.jsx'
import PaymentSuccess from './components/PaymentSuccess.jsx'
import PaymentFailure from './components/PaymentFailure.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import About from './Pages/About.jsx'
import { TeamProvider } from './Context/TeamContext.jsx'
import Contact from './Pages/Contact.jsx'
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx'
import TermsCondition from './Pages/TermsCondition.jsx'
function App() {
  return (
    <Router>
      <TeamProvider>
        <UserProvider>
          <AuthProvider>
            <CourseProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses" element={<Course />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/purchases" element={<Purchase />} />
                <Route path="/buy/:courseId" element={<Buy />} />
                <Route path="paymentSuccess" element={<PaymentSuccess />} />
                <Route path="paymentFailed" element={<PaymentFailure />} />

                {/* footer section links */}
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/privacy' element={<PrivacyPolicy />} />
                <Route path='/terms' element={<TermsCondition />} />
              </Routes>
            </CourseProvider>
          </AuthProvider>
        </UserProvider>
      </TeamProvider>
    </Router>
  )
}

export default App
