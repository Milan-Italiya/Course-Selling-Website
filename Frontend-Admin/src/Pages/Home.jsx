import React, { useEffect } from 'react'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import Slider from '../components/Scroller.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom'


const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // const storagetoken = sessionStorage.getItem('token')
    const sessiontoken = sessionStorage.getItem('token')
    // if (!storagetoken && !sessiontoken) {
    //   navigate('/login', { state: { loginerrMessage: 'please login first to access our website' } });
    // }

    if (!sessiontoken) {
      navigate('/admin/login', { state: { loginerrMessage: 'please login first to access admin dashboard' } });
    }
    if (location.state && location.state.loginMessage) {
      toast.success(location.state.loginMessage)
    }
  }, [])

  return (
    <>
      <div className='home'>
        {/* Navbar */}

        <ToastContainer position='top-right' autoClose={1000} />
        {/* Main Section */}
        <section className='hero'>
          <Hero />
        </section>
        <section className='slider'>
          <Slider />
        </section>
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home