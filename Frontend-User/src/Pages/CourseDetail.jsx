import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/CourseDetails.css'; // Milan-themed styling
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CourseContext } from '../Context/CourseContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const { fetchCourseDetails, courseDetails } = useContext(CourseContext);
  console.log("Course details through state: ", courseDetails);

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      navigate('/login', { state: { loginerrMessage: 'please login first to access our website' } });
    }
    fetchCourseDetails(courseId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      <Navbar />
      <h2 className='course-detail-heading'>Course Details</h2>
      <div className="course-detail-container">
        <div className="course-detail-card">
          <img src={courseDetails.image?.url} alt={courseDetails?.title} className="course-detail-image" />
          <div className="course-detail-info">
            <h2 className="course-detail-title">{courseDetails?.title}</h2>
            <p className="course-detail-description">{courseDetails?.description}</p>
            <p className="course-detail-description">₹ {courseDetails?.price}</p>
            <p className="course-detail-description">{courseDetails?.category}</p>
            <p className="course-detail-description">{courseDetails?.language}</p>
            <button className="enroll-btn" onClick={() => { navigate(`/buy/${courseDetails._id}`) }}>Enroll Now</button>
            <button className="back-btn" onClick={() => { navigate(-1) }}>Back</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
