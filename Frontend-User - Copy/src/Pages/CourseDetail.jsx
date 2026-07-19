import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/CourseDetails.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CourseContext } from '../Context/CourseContext';
import {
  FaStar,
  FaClock,
  FaUserGraduate,
  FaLanguage,
  FaCertificate,
  FaPlayCircle
} from 'react-icons/fa';
import CourseDetailHero from '../components/CourseDetails/CourseDetailHero';
import CourseOverview from '../components/CourseDetails/CourseOverview';
import Curriculum from '../components/CourseDetails/Curriculam';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {
    fetchCourseDetails,
    courseDetails
  } = useContext(CourseContext);
  console.log(
    "Course details through state: ",
    courseDetails
  );
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login', {
        state: {
          loginerrMessage:
            'please login first to access our website'
        }
      });
    }
    fetchCourseDetails(courseId);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="course-detail-page page-animation">
        {/* HERO SECTION */}
        <section className="course-hero-section">
          <CourseDetailHero courseDetails={courseDetails}/>
        </section>


        {/* COURSE INFO */}
        <CourseOverview/>
        <Curriculum courseDetails={courseDetails}/>
        <section className="course-info-section">
          <h2>Course Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <FaLanguage />
              <h3>Language</h3>
              <p>
                {courseDetails?.language}
              </p>
            </div>
            <div className="info-card">
              <FaPlayCircle />
              <h3>Category</h3>
              <p>
                {courseDetails?.category}
              </p>
            </div>
            <div className="info-card">
              <FaCertificate />
              <h3>Certificate</h3>
              <p>
                Included
              </p>
            </div>
            <div className="info-card">
              <FaClock />
              <h3>Duration</h3>
              <p>
                3 Months
              </p>
            </div>
          </div>
        </section>
        <section className="learn-section">

          <h2>
            What You'll Learn
          </h2>

          <div className="learn-grid">

            <div className="learn-card">

              <span>01</span>

              <h3>Real World Projects</h3>

              <p>
                Build practical projects used in real industries.
              </p>

            </div>

            <div className="learn-card">

              <span>02</span>

              <h3>Hands-on Learning</h3>

              <p>
                Practice concepts with implementation-based learning.
              </p>

            </div>

            <div className="learn-card">

              <span>03</span>

              <h3>Industry Skills</h3>

              <p>
                Learn modern technologies and professional workflows.
              </p>

            </div>

            <div className="learn-card">

              <span>04</span>

              <h3>Career Ready</h3>

              <p>
                Gain skills required for jobs and freelancing.
              </p>

            </div>

          </div>

        </section>
        <section className="requirements-section">

          <h2>
            Requirements
          </h2>

          <div className="requirements-grid">

            <div className="requirement-card">

              <h3>Laptop / PC</h3>

              <p>
                A computer system for coding and practice.
              </p>

            </div>

            <div className="requirement-card">

              <h3>Internet Connection</h3>

              <p>
                Stable internet connection for course access.
              </p>

            </div>

            <div className="requirement-card">

              <h3>Basic Knowledge</h3>

              <p>
                Basic understanding of computer operations.
              </p>

            </div>

            <div className="requirement-card">

              <h3>Passion to Learn</h3>

              <p>
                Motivation and consistency to grow skills.
              </p>

            </div>

          </div>

        </section>
        {/* INSTRUCTOR */}
        <section className="instructor-section">
          <h2>
            Instructor
          </h2>
          <div className="instructor-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Instructor"
            />
            <div>
              <h3>
                Expert Mentor
              </h3>
              <p>
                Learn from experienced industry
                professionals with practical project
                knowledge and real-world experience.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default CourseDetail;